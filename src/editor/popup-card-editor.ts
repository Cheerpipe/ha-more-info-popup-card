/**
 * Visual editor of the popup card, shown inside the native
 * `hui-dialog-edit-card`.
 *
 * - Popup options: `ha-form` with expandable sections (like the tile editor).
 * - Cards: one native `hui-section` per zone in edit mode, backed by a
 *   virtual Lovelace controller, so drag & drop (also between zones),
 *   resize, copy/cut (shared dashboard clipboard), delete and "add card" are
 *   the native ones. With `layout: zones` the zones are drawn as a frame
 *   (header, main, footer) with their own alignment.
 * - Editing/adding a child card opens an inline sub-editor (← back), because
 *   a second `hui-dialog-edit-card` would replace the one already open (the
 *   dialog manager keeps one element per tag).
 */
import {
  mdiCodeBraces,
  mdiContentCopy,
  mdiContentCut,
  mdiContentDuplicate,
  mdiDelete,
  mdiListBoxOutline,
} from "@mdi/js";
import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  DEFAULTS,
  DIALOG_TAG,
  EDITOR_TAG,
  resolveConfig,
  validateConfig,
  type PopupCardConfig,
  type PopupZoneConfig,
} from "../config";
import { setSectionAlign } from "../grid-align";
import { fireEvent } from "../ha/fire-event";
import { ensureEditorElements } from "../ha/internals";
import type {
  HomeAssistant,
  Lovelace,
  LovelaceCardConfig,
  LovelaceConfig,
  LovelaceSectionConfig,
  ShowToastParams,
} from "../ha/types";
import { localize } from "../localize/localize";
import { bindEntity, cleanMatch, matchingEntities } from "../match";
import {
  popupZones,
  withZoneCards,
  zoneCards,
  zoneSectionConfig,
  type Zone,
  type ZoneId,
} from "../zones";
import { buildSchema, computeHelper, computeLabel } from "./schema";
import {
  CARD_CLIPBOARD_KEY,
  cardPathFromEvent,
  createVirtualLovelace,
  sectionPath,
  VIRTUAL_VIEW_INDEX,
} from "./virtual-lovelace";

type SubView =
  { kind: "edit"; zone: ZoneId; index: number } | { kind: "add"; zone: ZoneId };

type ZoneCards = Partial<Record<ZoneId, LovelaceCardConfig[]>>;

type SectionElement = HTMLElement & {
  hass?: HomeAssistant;
  config?: LovelaceSectionConfig;
  lovelace?: Lovelace;
  preview?: boolean;
  index?: number;
  viewIndex?: number;
  /** Home Assistant 2026.11+ (replaces `viewIndex` / `index`). */
  path?: (string | number)[];
};

/**
 * Home Assistant 2026.11 gave `hui-section` a `path` and moved the card
 * actions (delete, copy, cut, paste) from `hui-section` up to `hui-view`,
 * which the popup editor is not in: the editor then handles them itself.
 */
const sectionUsesPaths = (): boolean => {
  const ctor = customElements.get("hui-section") as
    { elementProperties?: Map<PropertyKey, unknown> } | undefined;
  return ctor?.elementProperties?.has("path") ?? false;
};

const writeCardClipboard = (card: LovelaceCardConfig) => {
  try {
    sessionStorage.setItem(CARD_CLIPBOARD_KEY, JSON.stringify(card));
  } catch {
    // Storage unavailable (private mode): copy is best effort.
  }
};

const readCardClipboard = (): LovelaceCardConfig | undefined => {
  try {
    const value = sessionStorage.getItem(CARD_CLIPBOARD_KEY);
    const card = value ? (JSON.parse(value) as LovelaceCardConfig) : undefined;
    return card?.type ? card : undefined;
  } catch {
    return undefined;
  }
};

type CardElementEditor = HTMLElement & {
  toggleMode(): void;
  GUImode: boolean;
};

const UNDO_LIMIT = 30;

const ZONE_DEFAULTS = {
  vertical_align: "top",
  horizontal_align: "left",
} as const;

/** A header/footer without defaults or empty values; undefined if empty. */
const cleanZone = (
  zone: PopupZoneConfig | undefined,
): PopupZoneConfig | undefined => {
  if (!zone) return undefined;
  const next: Record<string, unknown> = { ...zone };
  for (const [key, value] of Object.entries(next)) {
    if (
      value === "" ||
      value === undefined ||
      value === ZONE_DEFAULTS[key as keyof typeof ZONE_DEFAULTS] ||
      (Array.isArray(value) && !value.length)
    ) {
      delete next[key];
    }
  }
  return Object.keys(next).length ? (next as PopupZoneConfig) : undefined;
};

/** Keeps popup ids valid while typing without fighting the user. */
const sanitizePopupId = (value: string): string =>
  value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "_")
    .replace(/^[_-]+/, "");

export class MoreInfoPopupCardEditor extends LitElement {
  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  /** Dashboard config; injected by `hui-element-editor` because it is declared. */
  @property({ attribute: false }) accessor lovelace: LovelaceConfig | undefined;

  @state() accessor _config: PopupCardConfig | undefined;

  @state() accessor _sub: SubView | undefined;

  @state() accessor _ready = false;

  @state() accessor _guiMode = true;

  @state() accessor _guiModeAvailable = true;

  private readonly _sections = new Map<ZoneId, SectionElement>();

  private _sectionsKey?: string;

  private _undo: ZoneCards[] = [];

  @state() accessor _notice: { message: string; undo: boolean } | undefined;

  private _noticeTimer?: ReturnType<typeof setTimeout>;

  public setConfig(config: PopupCardConfig): void {
    validateConfig(config);
    // Configs coming from the edit dialog are deep-frozen.
    this._config = structuredClone(config);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    ensureEditorElements().then(() => {
      this._ready = true;
    });
  }

  private _titlesRequested = false;

  protected override willUpdate(changed: PropertyValues<this>): void {
    // Integration and domain names for the template popup selects.
    if (this.hass && !this._titlesRequested) {
      this._titlesRequested = true;
      this.hass.loadBackendTranslation?.("title");
    }
    if (
      (changed.has("_config") || changed.has("hass")) &&
      this._config &&
      this.hass
    ) {
      this._syncSections();
    }
  }

  // ---------------------------------------------------------------------------
  // Config helpers
  // ---------------------------------------------------------------------------

  private get _zones(): Zone[] {
    return this._config ? popupZones(this._config) : [];
  }

  private _cards(zone: ZoneId): LovelaceCardConfig[] {
    return this._config ? zoneCards(this._config, zone) : [];
  }

  private _zoneSectionConfig(zone: ZoneId): LovelaceSectionConfig {
    return zoneSectionConfig(this._config ?? {}, this._cards(zone));
  }

  private _emit(config: PopupCardConfig) {
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  private _snapshot(): ZoneCards {
    return Object.fromEntries(
      this._zones.map((zone) => [zone.id, structuredClone(zone.cards)]),
    );
  }

  /** Replaces the cards of some zones; one undo step. */
  private _setCards(changes: ZoneCards, undoable = true) {
    if (!this._config) return;
    let config = this._config;
    for (const [zone, cards] of Object.entries(changes) as [
      ZoneId,
      LovelaceCardConfig[],
    ][]) {
      config = withZoneCards(config, zone, cards);
    }
    if (JSON.stringify(config) === JSON.stringify(this._config)) return;
    if (undoable) {
      this._undo = [...this._undo, this._snapshot()].slice(-UNDO_LIMIT);
    }
    this._emit(config);
  }

  private _undoLast = () => {
    const previous = this._undo[this._undo.length - 1];
    this._notice = undefined;
    if (!previous) return;
    this._undo = this._undo.slice(0, -1);
    this._setCards(previous, false);
  };

  /**
   * HA toasts live outside the (modal, top-layer) edit dialog, so their
   * buttons are inert while it is open: show the notice inside the editor.
   */
  private _toast = (params: ShowToastParams) => {
    clearTimeout(this._noticeTimer);
    this._notice = {
      message: params.message,
      undo: Boolean(params.action) && this._undo.length > 0,
    };
    this._noticeTimer = setTimeout(
      () => {
        this._notice = undefined;
      },
      params.duration && params.duration > 0 ? params.duration : 6000,
    );
  };

  // ---------------------------------------------------------------------------
  // Native edit grid
  // ---------------------------------------------------------------------------

  private _syncSections() {
    const zones = this._zones;
    const sectionConfigs = zones.map((zone) =>
      this._zoneSectionConfig(zone.id),
    );
    for (const zone of zones) {
      if (!this._sections.has(zone.id)) {
        this._sections.set(
          zone.id,
          document.createElement("hui-section") as SectionElement,
        );
      }
      const section = this._sections.get(zone.id)!;
      section.hass = this.hass;
      setSectionAlign(section, zone.horizontal_align);
    }
    const key = JSON.stringify(sectionConfigs);
    if (key === this._sectionsKey) return;
    this._sectionsKey = key;
    // One controller for every zone, so cards can be dragged between them.
    const lovelace = createVirtualLovelace({
      sections: sectionConfigs,
      locale: this.hass!.locale,
      onSave: (cards) =>
        this._setCards(
          Object.fromEntries(zones.map((zone, i) => [zone.id, cards[i] ?? []])),
        ),
      onToast: this._toast,
    });
    zones.forEach((zone, i) => {
      const section = this._sections.get(zone.id)!;
      section.viewIndex = VIRTUAL_VIEW_INDEX;
      section.index = i;
      section.path = sectionPath(i);
      section.preview = true;
      section.lovelace = lovelace;
      section.config = sectionConfigs[i];
    });
  }

  /** Zone of a section index in the virtual view. */
  private _zoneAt(section: number): ZoneId | undefined {
    return this._zones[section]?.id;
  }

  /** Intercepted in the capture phase, before `hui-section` opens a dialog. */
  private _interceptEdit = {
    capture: true,
    handleEvent: (ev: CustomEvent<{ path?: unknown }>) => {
      const path = cardPathFromEvent(ev.detail?.path);
      const zone = path && this._zoneAt(path.section);
      if (!path || !zone) return;
      ev.stopPropagation();
      if (ev.type === "ll-duplicate-card") {
        this._duplicate(zone, path.card);
      } else {
        this._openEditor(zone, path.card);
      }
    },
  };

  private _interceptCreate = {
    capture: true,
    handleEvent: (ev: Event) => {
      ev.stopPropagation();
      const zone = (ev.currentTarget as HTMLElement).dataset.zone as ZoneId;
      this._sub = { kind: "add", zone: zone ?? "main" };
    },
  };

  /**
   * Card actions that `hui-section` no longer handles since 2026.11 (they
   * moved to `hui-view`). Before that, the native handlers run.
   */
  private _interceptCardAction = {
    capture: true,
    handleEvent: (ev: CustomEvent<{ path?: unknown }>) => {
      if (!sectionUsesPaths()) return;
      const path = cardPathFromEvent(ev.detail?.path);
      const zone = path && this._zoneAt(path.section);
      if (!path || !zone) return;
      ev.stopPropagation();
      const card = this._cards(zone)[path.card];
      switch (ev.type) {
        case "ll-delete-card":
          this._removeCard(zone, path.card);
          break;
        case "ll-copy-card":
          if (card) writeCardClipboard(card);
          break;
        case "ll-cut-card":
          if (card) writeCardClipboard(card);
          this._removeCard(zone, path.card, false);
          break;
        case "ll-paste-card": {
          const pasted = readCardClipboard();
          if (!pasted) break;
          const cards = [...this._cards(zone)];
          cards.splice(path.card + 1, 0, pasted);
          this._setCards({ [zone]: cards });
          break;
        }
        default:
          break;
      }
    },
  };

  /** Removes a card from the grid, with an undo notice. */
  private _removeCard(zone: ZoneId, index: number, notify = true) {
    const cards = [...this._cards(zone)];
    if (!cards[index]) return;
    cards.splice(index, 1);
    this._setCards({ [zone]: cards });
    if (!notify) return;
    this._toast({
      message: localize(this.hass, "editor.card_deleted"),
      action: {
        text: localize(this.hass, "editor.undo"),
        action: this._undoLast,
      },
    });
  }

  /** Forwards copy to the native handler so HA's clipboard cache is updated. */
  private _copyNative(zone: ZoneId, index: number) {
    if (sectionUsesPaths()) {
      const card = this._cards(zone)[index];
      if (card) writeCardClipboard(card);
      return;
    }
    const section = this._sections.get(zone);
    const target = section?.firstElementChild ?? section;
    if (!target) return;
    fireEvent(target, "ll-copy-card", {
      path: [VIRTUAL_VIEW_INDEX, section!.index ?? 0, index],
    });
  }

  // ---------------------------------------------------------------------------
  // Sub editors
  // ---------------------------------------------------------------------------

  private _openEditor(zone: ZoneId, index: number) {
    this._guiMode = true;
    this._guiModeAvailable = true;
    this._sub = { kind: "edit", zone, index };
  }

  private _back = () => {
    this._returnToCards();
  };

  /** Leaves a sub-editor and brings the cards grid back into view. */
  private _returnToCards() {
    this._sub = undefined;
    this.updateComplete.then(() =>
      this.renderRoot
        .querySelector(".cards-header")
        ?.scrollIntoView({ block: "start" }),
    );
  }

  private _duplicate(zone: ZoneId, index: number) {
    const cards = [...this._cards(zone)];
    cards.splice(index + 1, 0, structuredClone(cards[index]!));
    this._setCards({ [zone]: cards });
    this._openEditor(zone, index + 1);
  }

  private _delete(zone: ZoneId, index: number) {
    const cards = [...this._cards(zone)];
    cards.splice(index, 1);
    this._setCards({ [zone]: cards });
    this._returnToCards();
    this._toast({
      message: localize(this.hass, "editor.card_deleted"),
      action: {
        text: localize(this.hass, "editor.undo"),
        action: this._undoLast,
      },
    });
  }

  private _cut(zone: ZoneId, index: number) {
    this._copyNative(zone, index);
    const cards = [...this._cards(zone)];
    cards.splice(index, 1);
    this._setCards({ [zone]: cards });
    this._returnToCards();
  }

  private _cardPicked(ev: CustomEvent<{ config: LovelaceCardConfig }>) {
    ev.stopPropagation();
    const card = ev.detail.config;
    if (!card?.type || this._sub?.kind !== "add") return;
    const zone = this._sub.zone;
    const cards = [...this._cards(zone), card];
    this._setCards({ [zone]: cards });
    this._openEditor(zone, cards.length - 1);
  }

  private _cardChanged(
    ev: CustomEvent<{ config: LovelaceCardConfig; guiModeAvailable?: boolean }>,
  ) {
    ev.stopPropagation();
    if (this._sub?.kind !== "edit") return;
    const { zone, index } = this._sub;
    const cards = [...this._cards(zone)];
    cards[index] = ev.detail.config;
    this._guiModeAvailable = ev.detail.guiModeAvailable ?? true;
    this._setCards({ [zone]: cards });
  }

  private _guiModeChanged(
    ev: CustomEvent<{ guiMode: boolean; guiModeAvailable: boolean }>,
  ) {
    ev.stopPropagation();
    this._guiMode = ev.detail.guiMode;
    this._guiModeAvailable = ev.detail.guiModeAvailable;
  }

  private _toggleMode() {
    this.renderRoot
      .querySelector<CardElementEditor>("hui-card-element-editor")
      ?.toggleMode();
  }

  // ---------------------------------------------------------------------------
  // Popup options
  // ---------------------------------------------------------------------------

  private _valueChanged(ev: CustomEvent<{ value: Partial<PopupCardConfig> }>) {
    ev.stopPropagation();
    if (!this._config) return;
    const value = { ...ev.detail.value };
    if (typeof value.popup_id === "string") {
      value.popup_id = sanitizePopupId(value.popup_id);
    }
    const next: Record<string, unknown> = { ...this._config, ...value };
    // Keep the YAML minimal: drop defaults and empty values.
    for (const [key, defaultValue] of Object.entries(DEFAULTS)) {
      if (next[key] === defaultValue) delete next[key];
    }
    for (const key of Object.keys(next)) {
      if (next[key] === "" || next[key] === undefined) delete next[key];
    }
    if (next.width !== "custom") delete next.custom_width;
    if (next.height !== "custom") {
      delete next.min_height;
      delete next.max_height;
    }
    const match = cleanMatch(next.match);
    if (match) next.match = match;
    else delete next.match;
    if (!next.replace_more_info) delete next.match;
    if (!next.entity && !next.match) delete next.show_header_actions;
    for (const zone of ["header", "footer"] as const) {
      const cleaned = cleanZone(next[zone] as PopupZoneConfig | undefined);
      if (cleaned) next[zone] = cleaned;
      else delete next[zone];
    }
    this._emit(next as PopupCardConfig);
  }

  private _testPopup() {
    if (!this._config) return;
    let config;
    try {
      config = resolveConfig(validateConfig(this._config));
    } catch {
      return;
    }
    // A template popup is tested with its first matching entity.
    config = bindEntity(
      config,
      config.entity ?? matchingEntities(config, this.hass!)[0],
    );
    fireEvent(this, "show-dialog", {
      dialogTag: DIALOG_TAG,
      dialogImport: () => Promise.resolve(),
      dialogParams: { config },
      addHistory: true,
    });
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  protected override render() {
    if (!this.hass || !this._config) return nothing;
    if (!this._ready) return html`<ha-spinner size="small"></ha-spinner>`;
    if (this._sub?.kind === "add") return this._renderAdd();
    if (
      this._sub?.kind === "edit" &&
      this._cards(this._sub.zone)[this._sub.index]
    ) {
      return this._renderEdit(this._sub.zone, this._sub.index);
    }
    return this._renderMain();
  }

  private _renderMain() {
    const hass = this.hass!;
    const config = this._config!;
    // Zone selects show their defaults (the YAML keeps only changes).
    const data = {
      ...DEFAULTS,
      ...config,
      header: { ...ZONE_DEFAULTS, ...config.header },
      footer: { ...ZONE_DEFAULTS, ...config.footer },
    };
    return html`
      <ha-form
        .hass=${hass}
        .data=${data}
        .schema=${buildSchema(hass, data)}
        .computeLabel=${computeLabel(hass)}
        .computeHelper=${computeHelper(hass, config)}
        @value-changed=${this._valueChanged}
      ></ha-form>
      <div class="cards-header">
        <h3>${localize(hass, "editor.tab.cards")}</h3>
        <ha-button appearance="plain" size="small" @click=${this._testPopup}>
          ${localize(hass, "editor.test_popup")}
        </ha-button>
      </div>
      ${
        this._notice
          ? html`
              <ha-alert alert-type="info" class="notice">
                ${this._notice.message}
                ${
                  this._notice.undo
                    ? html`<ha-button
                        slot="action"
                        appearance="plain"
                        size="small"
                        @click=${this._undoLast}
                      >
                        ${localize(hass, "editor.undo")}
                      </ha-button>`
                    : nothing
                }
              </ha-alert>
            `
          : nothing
      }
      ${
        config.layout === "zones"
          ? html`<div class="zones">
              ${this._zones.map((zone) => this._renderZone(zone))}
            </div>`
          : html`
              ${
                this._cards("main").length
                  ? nothing
                  : html`<p class="empty">${localize(hass, "editor.empty")}</p>`
              }
              ${this._renderGrid("main")}
            `
      }
    `;
  }

  private _renderGrid(zone: ZoneId) {
    const config = this._config!;
    return html`
      <div
        class=${classMap({
          grid: true,
          borderless: config.card_borders === false,
        })}
        data-zone=${zone}
        style=${styleMap({ "--column-span": String(config.column_span ?? 1) })}
        @ll-edit-card=${this._interceptEdit}
        @ll-duplicate-card=${this._interceptEdit}
        @ll-create-card=${this._interceptCreate}
        @ll-delete-card=${this._interceptCardAction}
        @ll-copy-card=${this._interceptCardAction}
        @ll-cut-card=${this._interceptCardAction}
        @ll-paste-card=${this._interceptCardAction}
      >
        ${this._sections.get(zone)}
      </div>
    `;
  }

  /** One zone of the layout frame: its name, options and cards. */
  private _renderZone(zone: Zone) {
    const hass = this.hass!;
    return html`
      <section class="zone zone-${zone.id}">
        <div class="zone-label">
          <span class="zone-title">
            ${localize(hass, `editor.zone.${zone.id}`)}
          </span>
          <span class="zone-hint">
            ${localize(hass, `editor.zone.${zone.id}_hint`)}
          </span>
        </div>
        ${this._renderGrid(zone.id)}
      </section>
    `;
  }

  private _renderSubHeader(title: string, actions: unknown = nothing) {
    return html`
      <div class="sub-header">
        <ha-icon-button-prev
          .label=${localize(this.hass, "editor.back")}
          @click=${this._back}
        ></ha-icon-button-prev>
        <span class="sub-title">${title}</span>
        <div class="sub-actions">${actions}</div>
      </div>
    `;
  }

  private _renderAdd() {
    return html`
      ${this._renderSubHeader(localize(this.hass, "editor.add_card"))}
      <hui-card-picker
        .hass=${this.hass}
        .lovelace=${this.lovelace ?? { views: [] }}
        @config-changed=${this._cardPicked}
      ></hui-card-picker>
    `;
  }

  private _renderEdit(zone: ZoneId, index: number) {
    const hass = this.hass!;
    const card = this._cards(zone)[index];
    const label = (key: string) =>
      hass.localize(`ui.panel.lovelace.editor.edit_card.${key}`);
    const actions = html`
      <ha-icon-button
        .label=${label(this._guiMode ? "show_code_editor" : "show_visual_editor")}
        .path=${this._guiMode ? mdiCodeBraces : mdiListBoxOutline}
        .disabled=${!this._guiModeAvailable}
        @click=${this._toggleMode}
      ></ha-icon-button>
      <ha-icon-button
        .label=${label("duplicate")}
        .path=${mdiContentDuplicate}
        @click=${() => this._duplicate(zone, index)}
      ></ha-icon-button>
      <ha-icon-button
        .label=${label("copy")}
        .path=${mdiContentCopy}
        @click=${() => this._copyNative(zone, index)}
      ></ha-icon-button>
      <ha-icon-button
        .label=${label("cut")}
        .path=${mdiContentCut}
        @click=${() => this._cut(zone, index)}
      ></ha-icon-button>
      <ha-icon-button
        .label=${label("delete")}
        .path=${mdiDelete}
        @click=${() => this._delete(zone, index)}
      ></ha-icon-button>
    `;
    return html`
      ${this._renderSubHeader(localize(hass, "editor.edit_card"), actions)}
      <hui-card-element-editor
        .hass=${hass}
        .lovelace=${this.lovelace}
        .value=${card}
        .sectionConfig=${this._zoneSectionConfig(zone)}
        show-visibility-tab
        @config-changed=${this._cardChanged}
        @GUImode-changed=${this._guiModeChanged}
      ></hui-card-element-editor>
    `;
  }

  static override styles = css`
    :host {
      display: block;
    }
    .cards-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: var(--ha-space-6) 0 var(--ha-space-2);
    }
    .cards-header h3 {
      margin: 0;
      font-size: var(--ha-font-size-l);
      font-weight: var(--ha-font-weight-medium);
    }
    .notice {
      display: block;
      margin-bottom: var(--ha-space-2);
    }
    .empty {
      color: var(--secondary-text-color);
      margin: 0 0 var(--ha-space-2);
    }
    .grid {
      display: block;
      padding: var(--ha-space-2) 0;
    }
    /* card_borders: false, as in the popup */
    .grid.borderless {
      --ha-card-border-width: 0;
      --ha-card-box-shadow: none;
    }
    /* layout: zones, drawn as the popup frame */
    .zones {
      display: flex;
      flex-direction: column;
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg);
      overflow: hidden;
    }
    .zone {
      padding: var(--ha-space-2) var(--ha-space-3) 0;
    }
    .zone + .zone {
      border-top: 1px dashed var(--divider-color);
    }
    .zone-main {
      background: var(--secondary-background-color);
      padding-bottom: var(--ha-space-4);
    }
    .zone-label {
      display: flex;
      align-items: baseline;
      gap: var(--ha-space-2);
      margin-bottom: var(--ha-space-2);
    }
    .zone-title {
      font-weight: var(--ha-font-weight-medium);
    }
    .zone-hint {
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-s);
    }
    .sub-header {
      display: flex;
      align-items: center;
      gap: var(--ha-space-1);
      margin: 0 0 var(--ha-space-4);
      border-bottom: 1px solid var(--divider-color);
      padding-bottom: var(--ha-space-2);
    }
    .sub-title {
      flex: 1;
      font-size: var(--ha-font-size-l);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sub-actions {
      display: flex;
    }
  `;
}

if (!customElements.get(EDITOR_TAG)) {
  customElements.define(EDITOR_TAG, MoreInfoPopupCardEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    [EDITOR_TAG]: MoreInfoPopupCardEditor;
  }
}
