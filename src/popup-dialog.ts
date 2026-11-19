/**
 * `<more-info-popup-dialog>`: the singleton dialog opened through HA's
 * dialog manager (`show-dialog`). It reuses the native building blocks of the
 * more-info dialog (`ha-adaptive-dialog`, header slots, `ha-dropdown`, the
 * `ha-more-info-*` views) and renders the popup body as a native
 * `hui-section`, exactly like `more-info-content` does for group members.
 */
import {
  mdiChartBoxOutline,
  mdiClose,
  mdiCodeBraces,
  mdiCogOutline,
  mdiDevices,
  mdiDotsVertical,
  mdiInformationOutline,
  mdiLinkVariant,
  mdiPencilOutline,
  mdiPlusBoxMultipleOutline,
  mdiTransitConnectionVariant,
  mdiTuneVariant,
} from "@mdi/js";
import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { keyed } from "lit/directives/keyed.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  DIALOG_TAG,
  dialogWidth,
  sizeStyles,
  type ResolvedPopupConfig,
} from "./config";
import { haNavigate } from "./ha/actions";
import {
  computeDomain,
  computeEditPath,
  getDeviceId,
  getDeviceType,
  isAdmin,
  shouldShowAddTo,
  shouldShowEdit,
  shouldShowHistory,
} from "./ha/entity";
import { fireEvent } from "./ha/fire-event";
import { isDefined, VIEW_ELEMENTS } from "./ha/internals";
import {
  bottomSheetStyles,
  contentStyles,
  dialogStyles,
  fadeStyles,
  headerStyles,
  scrollbarStyles,
} from "./ha/styles";
import type {
  ChildView,
  ExtEntityRegistryEntry,
  HomeAssistant,
  MoreInfoEventDetail,
  MoreInfoView,
} from "./ha/types";
import { localize } from "./localize/localize";
import { computeHeaderInfo, renderTitle, type Frame } from "./popup-header";
import { setActivePopup } from "./state";
import { POPUP_FILL_EVENT } from "./controls/state-card";
import {
  renderBody,
  zoneStyles,
  ZoneSections,
  type SectionElement,
  type ZoneId,
} from "./zones";
import { applyUix, uixConfigOf } from "./ha/uix";
import {
  prepareTopSheet,
  shieldSheetTouches,
  startTopSheetSwipe,
} from "./top-sheet";

export interface PopupDialogParams {
  config: ResolvedPopupConfig;
  view?: MoreInfoView;
}

const SCROLL_FADE_THRESHOLD = 24;
const SCROLL_FADE_SAFE_AREA = 4;
const AUTO_CLOSE_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"];

/** Native `withViewTransition` (`common/util/view-transition.ts`). */
const withViewTransition = (update: () => void) => {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => unknown;
  };
  if (
    doc.startViewTransition &&
    !matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    doc.startViewTransition(update);
  } else {
    update();
  }
};

export class MoreInfoPopupDialog extends LitElement {
  @property({ attribute: false }) accessor hass!: HomeAssistant;

  @property({ type: Boolean, reflect: true, attribute: "fixed-top" })
  accessor fixedTop = true;

  @state() accessor _params: PopupDialogParams | undefined;

  @state() accessor _open = false;

  @state() accessor _stack: Frame[] = [];

  @state() accessor _entries: Record<string, ExtEntityRegistryEntry | null> =
    {};

  @state() accessor _fill = false;

  @state() accessor _escapeEnabled = true;

  @state() accessor _detailsYaml = false;

  @state() accessor _contentScrolled = false;

  @state() accessor _contentScrollable = false;

  /** Popup body (one section per zone); cached when `keep_alive` is set. */
  private _zones?: ZoneSections;

  private _sections = new Map<ZoneId, SectionElement>();

  private readonly _keepAlive = new Map<string, ZoneSections>();

  private readonly _childViews = new WeakMap<ChildView, HTMLElement>();

  private readonly _childHeaders = new WeakMap<ChildView, HTMLElement>();

  private _autoCloseTimer?: ReturnType<typeof setTimeout>;

  private _resizeObserver?: ResizeObserver;

  /** State cards in the popup body, in attach order (`POPUP_FILL_EVENT`). */
  private readonly _fillCards = new Set<HTMLElement & { popupFill: number }>();

  private get _config(): ResolvedPopupConfig | undefined {
    return this._params?.config;
  }

  private get _frame(): Frame | undefined {
    return this._stack[this._stack.length - 1];
  }

  // ---------------------------------------------------------------------------
  // Dialog manager contract (`src/dialogs/make-dialog-manager.ts`)
  // ---------------------------------------------------------------------------

  public showDialog(params: PopupDialogParams): void {
    const { config, view } = params;
    this._params = params;
    this._stack = [{ entityId: config.entity, view: "root", children: [] }];
    if (view && config.entity && this._canShowView(view)) {
      this._stack = [
        ...this._stack,
        { entityId: config.entity, view, children: [] },
      ];
    }
    this._fill = false;
    this._detailsYaml = false;
    this._escapeEnabled = true;
    this._syncZones(config);
    this._open = true;
    if (config.entity) this._loadEntry(config.entity);
    setActivePopup({
      popupId: config.popup_id,
      close: () => this.closeDialog(),
    });
    this._armAutoClose();
  }

  public closeDialog(): boolean {
    this._open = false;
    return true;
  }

  private _dialogClosed(ev: Event) {
    if (ev.target !== ev.currentTarget) return;
    const config = this._config;
    if (config && !config.keep_alive) {
      this._zones = undefined;
      this._sections = new Map();
    }
    this._params = undefined;
    this._stack = [];
    this._entries = {};
    this._fill = false;
    this._detailsYaml = false;
    this._contentScrolled = false;
    this._contentScrollable = false;
    this._clearAutoClose();
    this._uixKey = undefined;
    this._uixSurface = undefined;
    window.removeEventListener("dialog-closed", this._enableEscape);
    window.removeEventListener("show-dialog", this._disableEscape);
    setActivePopup(undefined);
    fireEvent(this, "dialog-closed", { dialog: this.localName });
  }

  private _dialogOpened(ev: Event) {
    if (ev.target !== ev.currentTarget) return;
    window.addEventListener("dialog-closed", this._enableEscape);
    window.addEventListener("show-dialog", this._disableEscape);
  }

  // Same as the native dialog: while a dialog is stacked on top, Esc and the
  // scrim must only close that one.
  private _enableEscape = () => {
    this._escapeEnabled = true;
  };

  private _disableEscape = () => {
    this._escapeEnabled = false;
  };

  // ---------------------------------------------------------------------------
  // Lifecycle
  // ---------------------------------------------------------------------------

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("close-dialog", this._closeFromEvent);
    this.addEventListener("close-child-view", this._goBackFromEvent);
    this.addEventListener(POPUP_FILL_EVENT, this._registerFillCard);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("close-dialog", this._closeFromEvent);
    this.removeEventListener("close-child-view", this._goBackFromEvent);
    this.removeEventListener(POPUP_FILL_EVENT, this._registerFillCard);
    this._resizeObserver?.disconnect();
    this._clearAutoClose();
  }

  private _closeFromEvent = (ev: Event) => {
    ev.stopPropagation();
    this.closeDialog();
  };

  private _goBackFromEvent = () => this._goBack();

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("hass") && this._zones) {
      this._zones.hass = this.hass;
    }
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    // With zones, only the main zone scrolls.
    const content =
      this.renderRoot.querySelector<HTMLElement>(".body.zones .zone-main") ??
      this.renderRoot.querySelector<HTMLElement>(".content");
    if (content && content !== this._observedContent) {
      this._observedContent = content;
      this._resizeObserver ??= new ResizeObserver(() => {
        this._updateFill();
        this._updateScrollState();
      });
      this._resizeObserver.disconnect();
      this._resizeObserver.observe(content);
      if (content.firstElementChild) {
        this._resizeObserver.observe(content.firstElementChild);
      }
      this._updateFill();
      this._updateScrollState();
    }
    this._applyUix();
    this._prepareTopSheet();
  }

  private _observedContent?: HTMLElement;

  // ---------------------------------------------------------------------------
  // Top sheet (`top-sheet.ts`)
  // ---------------------------------------------------------------------------

  /** The drawer is placed at the top before the sheet first opens. */
  @state() accessor _topSheetReady = false;

  private _topSheet?: Element;

  private async _prepareTopSheet() {
    if (this._config?.mode !== "top_sheet") return;
    const sheet = this.renderRoot.querySelector("ha-bottom-sheet");
    if (!sheet || sheet === this._topSheet) return;
    this._topSheet = sheet;
    this._topSheetReady = false;
    // Its own drag gesture (swipe down to close) must not start on our nodes.
    sheet.querySelectorAll(":scope > *").forEach((node) => {
      node.addEventListener("touchstart", shieldSheetTouches as EventListener);
    });
    this._topSheetReady = await prepareTopSheet(
      sheet as unknown as Parameters<typeof prepareTopSheet>[0],
    );
  }

  private _topSwipe = (ev: TouchEvent) => {
    const sheet = this.renderRoot.querySelector("ha-bottom-sheet");
    if (!sheet) return;
    startTopSheetSwipe(
      ev,
      sheet as unknown as Parameters<typeof startTopSheetSwipe>[1],
      () => this.closeDialog(),
    );
  };

  private _uixKey?: string;

  /**
   * UIX: inherit the user's more-info theme (`uix-more-info`) and apply the
   * popup's own `uix:` config plus the `uix-more-info-popup` theme key. A
   * separate type from UIX's generic `dialog` patch so neither overrides
   * the other; this also covers a forced `ha-bottom-sheet`.
   */
  private _applyUix() {
    const config = this._config;
    const surface = this.renderRoot.querySelector(
      "ha-adaptive-dialog, ha-dialog, ha-bottom-sheet",
    );
    if (!config || !surface) return;
    const uix = uixConfigOf(config);
    const key = `${surface.localName}:${config.popup_id}:${JSON.stringify(uix ?? null)}`;
    if (key === this._uixKey && surface === this._uixSurface) return;
    this._uixKey = key;
    this._uixSurface = surface;
    const variables = { config, params: { popup_id: config.popup_id } };
    applyUix(
      surface,
      "more-info",
      undefined,
      variables,
      "type-more-info-popup",
    );
    applyUix(
      surface,
      "more-info-popup",
      uix,
      variables,
      "type-more-info-popup",
    );
  }

  private _uixSurface?: Element;

  // ---------------------------------------------------------------------------
  // Body
  // ---------------------------------------------------------------------------

  private _syncZones(config: ResolvedPopupConfig) {
    // A template popup keeps one body per entity it was opened for.
    const cacheKey = `${config.popup_id}:${config.entity ?? ""}`;
    let zones = config.keep_alive ? this._keepAlive.get(cacheKey) : undefined;
    if (!zones) {
      zones = new ZoneSections();
      if (config.keep_alive) this._keepAlive.set(cacheKey, zones);
    }
    this._zones = zones;
    this._sections = zones.update(config, this.hass);
  }

  private async _loadEntry(entityId: string) {
    if (entityId in this._entries) return;
    let entry: ExtEntityRegistryEntry | null;
    try {
      entry = await this.hass.callWS<ExtEntityRegistryEntry>({
        type: "config/entity_registry/get",
        entity_id: entityId,
      });
    } catch {
      entry = null;
    }
    this._entries = { ...this._entries, [entityId]: entry };
  }

  // ---------------------------------------------------------------------------
  // Navigation between views (same semantics as the native dialog)
  // ---------------------------------------------------------------------------

  private _canShowView(view: MoreInfoView): boolean {
    return isDefined(VIEW_ELEMENTS[view]);
  }

  private _pushFrame(frame: Frame) {
    if (frame.view !== "root" && !this._canShowView(frame.view)) {
      // Fallback for a future frontend without the view element: hand over
      // to the native more-info, stacked on top.
      fireEvent(this, "hass-more-info", {
        entityId: frame.entityId ?? null,
        view: frame.view,
      });
      return;
    }
    if (frame.entityId) this._loadEntry(frame.entityId);
    this._detailsYaml = false;
    this._stack = [...this._stack, frame];
  }

  private _setView(view: MoreInfoView) {
    const frame = this._frame;
    if (!frame) return;
    this._pushFrame({ entityId: frame.entityId, view, children: [] });
  }

  private _goBack = () => {
    const frame = this._frame;
    if (!frame) return;
    if (frame.children.length) {
      this._replaceTop({ ...frame, children: frame.children.slice(0, -1) });
      this._detailsYaml = false;
      return;
    }
    if (this._stack.length > 1) {
      this._detailsYaml = false;
      this._stack = this._stack.slice(0, -1);
    }
  };

  private _replaceTop(frame: Frame) {
    this._stack = [...this._stack.slice(0, -1), frame];
  }

  private _showChildView(ev: CustomEvent<ChildView>) {
    ev.stopPropagation();
    const frame = this._frame;
    if (!frame) return;
    const child = ev.detail;
    child.viewImport?.();
    child.viewHeaderImport?.();
    this._replaceTop({ ...frame, children: [...frame.children, child] });
  }

  private _handleMoreInfo(ev: CustomEvent<MoreInfoEventDetail>) {
    if (this._config?.nested_more_info === "dialog") return;
    ev.stopPropagation();
    const { entityId } = ev.detail;
    if (!entityId) return;
    const view = ev.detail.view ?? ev.detail.tab ?? "info";
    const frame = this._frame;
    if (frame && frame.entityId === entityId && frame.view !== "root") {
      if (frame.view !== view) this._setView(view);
      return;
    }
    this._pushFrame({
      entityId,
      view: view === "details" ? view : "info",
      children: [],
    });
  }

  private _entryUpdated(ev: CustomEvent<ExtEntityRegistryEntry>) {
    const entry = ev.detail;
    if (entry?.entity_id) {
      this._entries = { ...this._entries, [entry.entity_id]: entry };
    }
  }

  private _enlarge = () => {
    withViewTransition(() => {
      this._fill = !this._fill;
    });
  };

  private _breadcrumbClick = (ev: Event) => {
    ev.stopPropagation();
    this._setView("related");
  };

  private _handleMenu(ev: CustomEvent<{ item?: { value?: string } }>) {
    const frame = this._frame;
    const entityId = frame?.entityId;
    if (!entityId) return;
    const action = ev.detail?.item?.value;
    switch (action) {
      case "info":
      case "related":
      case "details":
      case "add_to":
        this._setView(action);
        break;
      case "device": {
        const deviceId = getDeviceId(this.hass, entityId);
        if (deviceId) haNavigate(this, `/config/devices/device/${deviceId}`);
        break;
      }
      case "edit": {
        const stateObj = this.hass.states[entityId];
        const path =
          stateObj &&
          computeEditPath(stateObj, this._entries[entityId]?.unique_id);
        if (path) haNavigate(this, path);
        break;
      }
      default:
        break;
    }
  }

  // ---------------------------------------------------------------------------
  // Auto close
  // ---------------------------------------------------------------------------

  private _armAutoClose = () => {
    this._clearAutoClose(false);
    const seconds = this._config?.auto_close ?? 0;
    if (seconds <= 0) return;
    for (const type of AUTO_CLOSE_EVENTS) {
      this.addEventListener(type, this._armAutoClose, { passive: true });
    }
    this._autoCloseTimer = setTimeout(() => this.closeDialog(), seconds * 1000);
  };

  private _clearAutoClose(removeListeners = true) {
    clearTimeout(this._autoCloseTimer);
    this._autoCloseTimer = undefined;
    if (removeListeners) {
      for (const type of AUTO_CLOSE_EVENTS) {
        this.removeEventListener(type, this._armAutoClose);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Full-height layout (`.controls { flex: 1 }` in the native more-info)
  // ---------------------------------------------------------------------------

  private _registerFillCard = (ev: Event) => {
    ev.stopPropagation();
    this._fillCards.add(
      ev.composedPath()[0] as HTMLElement & { popupFill: number },
    );
    this._updateFill();
  };

  /**
   * On a full-height sheet the native more-info centers the main control in
   * the free space. Grid cards size to their content, so give that space to
   * the first state card instead. Measured with the fill removed so a
   * content-sized dialog never keeps a stale fill.
   */
  private _updateFill() {
    for (const card of this._fillCards) {
      if (!card.isConnected) this._fillCards.delete(card);
    }
    const [target, ...rest] = this._fillCards;
    for (const card of rest) card.popupFill = 0;
    if (!target) return;
    // With zones the main zone takes the free height itself.
    if (this._config?.layout === "zones") {
      target.popupFill = 0;
      return;
    }
    target.popupFill = 0;
    const content = this._observedContent;
    const body = content?.firstElementChild as HTMLElement | null | undefined;
    if (!content || !body || this._frame?.view !== "root") return;
    target.popupFill = Math.floor(content.clientHeight - body.offsetHeight);
  }

  // ---------------------------------------------------------------------------
  // Scroll fades (`ScrollableFadeMixin`)
  // ---------------------------------------------------------------------------

  private _updateScrollState = () => {
    const el = this._observedContent;
    if (!el) return;
    this._contentScrolled = el.scrollTop > SCROLL_FADE_THRESHOLD;
    this._contentScrollable =
      el.scrollHeight - el.scrollTop - el.clientHeight > SCROLL_FADE_SAFE_AREA;
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  protected override render() {
    const config = this._config;
    const frame = this._frame;
    if (!config || !frame || !this.hass) return nothing;

    const preventScrimClose =
      !config.dismissable || frame.view === "settings" || !this._escapeEnabled;
    const style = styleMap(sizeStyles(config));
    const content = this._renderContent(frame);

    if (config.mode === "bottom_sheet" || config.mode === "top_sheet") {
      const top = config.mode === "top_sheet";
      // One sheet per mode: a reused one would keep its drawer at the top.
      return keyed(
        config.mode,
        html`
          <ha-bottom-sheet
            class=${classMap({ top })}
            style=${style}
            .open=${this._open && (!top || this._topSheetReady)}
            .preventScrimClose=${preventScrimClose}
            flexcontent
            @opened=${this._dialogOpened}
            @closed=${this._dialogClosed}
            @show-child-view=${this._showChildView}
          >
            <ha-dialog-header
              slot="header"
              @touchstart=${top ? this._topSwipe : nothing}
            >
              ${this._renderNavigation(frame, "navigationIcon")}
              ${this._renderTitle(config, frame, "title")}
              ${this._renderActions(config, frame, "actionItems")}
            </ha-dialog-header>
            ${content}
            ${
              top
                ? html`<div
                    slot="footer"
                    class="top-sheet-handle"
                    aria-hidden="true"
                    @touchstart=${this._topSwipe}
                  ></div>`
                : nothing
            }
          </ha-bottom-sheet>
        `,
      );
    }

    const tag = config.mode === "dialog" ? "ha-dialog" : "ha-adaptive-dialog";
    const width = this._fill ? "full" : dialogWidth(config);
    const slots = html`
      ${this._renderNavigation(frame, "headerNavigationIcon")}
      ${this._renderTitle(config, frame, "headerTitle")}
      ${this._renderActions(config, frame, "headerActionItems")} ${content}
    `;
    return tag === "ha-dialog"
      ? html`
          <ha-dialog
            style=${style}
            .open=${this._open}
            .width=${width}
            .preventScrimClose=${preventScrimClose}
            flexcontent
            @opened=${this._dialogOpened}
            @closed=${this._dialogClosed}
            @show-child-view=${this._showChildView}
          >
            ${slots}
          </ha-dialog>
        `
      : html`
          <ha-adaptive-dialog
            style=${style}
            .open=${this._open}
            .width=${width}
            .preventScrimClose=${preventScrimClose}
            flexcontent
            @opened=${this._dialogOpened}
            @closed=${this._dialogClosed}
            @show-child-view=${this._showChildView}
          >
            ${slots}
          </ha-adaptive-dialog>
        `;
  }

  private _isDefaultView(frame: Frame) {
    return (
      (frame.view === "root" || frame.view === "info") && !frame.children.length
    );
  }

  private _renderNavigation(frame: Frame, slot: string) {
    const showClose = this._stack.length === 1 && !frame.children.length;
    return showClose
      ? html`
          <ha-icon-button
            slot=${slot}
            .label=${this.hass.localize("ui.common.close")}
            .path=${mdiClose}
            @click=${this.closeDialog}
          ></ha-icon-button>
        `
      : html`
          <ha-icon-button-prev
            slot=${slot}
            .label=${this.hass.localize("ui.dialogs.more_info_control.back_to_info")}
            @click=${this._goBack}
          ></ha-icon-button-prev>
        `;
  }

  private _renderTitle(
    config: ResolvedPopupConfig,
    frame: Frame,
    slot: string,
  ) {
    const info = computeHeaderInfo(this.hass, config, frame);
    return renderTitle(
      this.hass,
      info,
      slot,
      config.mode === "bottom_sheet" || config.mode === "top_sheet"
        ? undefined
        : this._enlarge,
      this._breadcrumbClick,
    );
  }

  private _renderActions(
    config: ResolvedPopupConfig,
    frame: Frame,
    slot: string,
  ) {
    const entityId = frame.entityId;
    const isRoot = frame.view === "root";
    if (!entityId) return nothing;

    if (!this._isDefaultView(frame)) {
      if (frame.view === "details" && !frame.children.length) {
        return html`
          <ha-icon-button
            slot=${slot}
            .label=${this.hass.localize("ui.dialogs.more_info_control.toggle_yaml_mode")}
            .path=${mdiCodeBraces}
            @click=${() => {
              this._detailsYaml = !this._detailsYaml;
            }}
          ></ha-icon-button>
        `;
      }
      const child = frame.children[frame.children.length - 1];
      if (child?.viewHeaderTag) {
        const el = this._childElement(child, child.viewHeaderTag, "header");
        el.slot = slot;
        Object.assign(el, { hass: this.hass, params: child.viewParams });
        return el;
      }
      return nothing;
    }
    if (isRoot && !config.show_header_actions) return nothing;

    const hass = this.hass;
    const admin = isAdmin(hass);
    const history = shouldShowHistory(hass, entityId, !isRoot)
      ? html`
          <ha-icon-button
            slot=${slot}
            .label=${hass.localize("ui.dialogs.more_info_control.history")}
            .path=${mdiChartBoxOutline}
            @click=${() => this._setView("history")}
          ></ha-icon-button>
        `
      : nothing;

    if (!admin) {
      return html`
        ${history}
        ${
          shouldShowAddTo(hass)
            ? html`
                <ha-icon-button
                  slot=${slot}
                  .label=${hass.localize("ui.dialogs.more_info_control.add_to.item")}
                  .path=${mdiPlusBoxMultipleOutline}
                  @click=${() => this._setView("add_to")}
                ></ha-icon-button>
              `
            : nothing
        }
      `;
    }

    const stateObj = hass.states[entityId];
    const deviceId = getDeviceId(hass, entityId);
    const deviceType = getDeviceType(hass, deviceId);
    const domain = computeDomain(entityId);

    return html`
      ${history}
      <ha-icon-button
        slot=${slot}
        .label=${hass.localize("ui.dialogs.more_info_control.settings")}
        .path=${mdiCogOutline}
        @click=${() => this._setView("settings")}
      ></ha-icon-button>
      <ha-dropdown
        slot=${slot}
        placement="bottom-end"
        @closed=${(ev: Event) => ev.stopPropagation()}
        @opened=${(ev: Event) => ev.stopPropagation()}
        @wa-select=${this._handleMenu}
      >
        <ha-icon-button
          slot="trigger"
          .label=${hass.localize("ui.common.menu")}
          .path=${mdiDotsVertical}
        ></ha-icon-button>
        ${
          isRoot
            ? html`
                <ha-dropdown-item value="info">
                  <ha-svg-icon
                    slot="icon"
                    .path=${mdiTuneVariant}
                  ></ha-svg-icon>
                  ${localize(hass, "dialog.entity_controls")}
                </ha-dropdown-item>
                <wa-divider></wa-divider>
              `
            : nothing
        }
        ${
          shouldShowAddTo(hass)
            ? html`
                <ha-dropdown-item value="add_to">
                  <ha-svg-icon
                    slot="icon"
                    .path=${mdiPlusBoxMultipleOutline}
                  ></ha-svg-icon>
                  ${hass.localize("ui.dialogs.more_info_control.add_to.item")}
                </ha-dropdown-item>
                <wa-divider></wa-divider>
              `
            : nothing
        }
        ${
          deviceId
            ? html`
                <ha-dropdown-item value="device">
                  <ha-svg-icon
                    slot="icon"
                    .path=${deviceType === "service" ? mdiTransitConnectionVariant : mdiDevices}
                  ></ha-svg-icon>
                  ${hass.localize(
                    `ui.dialogs.more_info_control.${deviceType}_info`,
                  ) ||
                  hass.localize(
                    "ui.dialogs.more_info_control.device_or_service_info",
                    {
                      type: hass.localize(
                        `ui.dialogs.more_info_control.device_type.${deviceType}`,
                      ),
                    },
                  )}
                </ha-dropdown-item>
              `
            : nothing
        }
        ${
          shouldShowEdit(stateObj)
            ? html`
                <ha-dropdown-item value="edit">
                  <ha-svg-icon
                    slot="icon"
                    .path=${mdiPencilOutline}
                  ></ha-svg-icon>
                  ${
                    hass.localize(
                      `ui.dialogs.more_info_control.edit_domain.${domain}`,
                    ) || hass.localize("ui.dialogs.more_info_control.edit")
                  }
                </ha-dropdown-item>
              `
            : nothing
        }
        <ha-dropdown-item value="related">
          <ha-svg-icon slot="icon" .path=${mdiLinkVariant}></ha-svg-icon>
          ${hass.localize("ui.dialogs.more_info_control.related")}
        </ha-dropdown-item>
        <ha-dropdown-item value="details">
          <ha-svg-icon slot="icon" .path=${mdiInformationOutline}></ha-svg-icon>
          ${hass.localize("ui.dialogs.more_info_control.details")}
        </ha-dropdown-item>
      </ha-dropdown>
    `;
  }

  private _childElement(
    child: ChildView,
    tag: string,
    kind: "view" | "header",
  ): HTMLElement {
    const cache = kind === "view" ? this._childViews : this._childHeaders;
    let el = cache.get(child);
    if (!el) {
      el = document.createElement(tag);
      cache.set(child, el);
    }
    return el;
  }

  private _renderContent(frame: Frame) {
    const key = `${this._stack.length}:${frame.entityId ?? ""}:${frame.view}`;
    // The zones body draws its own fades around the main zone.
    const ownFades =
      frame.view === "root" &&
      !frame.children.length &&
      this._config?.layout === "zones";
    return html`
      <div
        class=${classMap({
          "content-wrapper": true,
          "settings-view": frame.view === "settings",
        })}
      >
        ${keyed(
          key,
          html`
            <div
              class="content ha-scrollbar"
              tabindex="-1"
              @scroll=${this._updateScrollState}
              @hass-more-info=${this._handleMoreInfo}
              @entity-entry-updated=${this._entryUpdated}
            >
              ${this._renderFrame(frame)}
            </div>
          `,
        )}
        <div
          class=${classMap({
            "fade-top": true,
            visible: this._contentScrolled && !ownFades,
          })}
        ></div>
        <div
          class=${classMap({
            "fade-bottom": true,
            visible: this._contentScrollable && !ownFades,
          })}
        ></div>
      </div>
    `;
  }

  private _renderChild(frame: Frame) {
    const child = frame.children[frame.children.length - 1];
    if (!child) return nothing;
    const el = this._childElement(child, child.viewTag, "view");
    Object.assign(el, {
      hass: this.hass,
      entry: frame.entityId ? this._entries[frame.entityId] : undefined,
      params: child.viewParams,
    });
    return html`<div class="child-view">${el}</div>`;
  }

  private _renderFrame(frame: Frame) {
    const hass = this.hass;
    const entityId = frame.entityId;
    const entry = entityId ? this._entries[entityId] : undefined;

    // Child views opened by the cards (vacuum clean areas) cover the grid,
    // which stays rendered so it keeps its state.
    if (frame.view === "root") {
      return html`
        ${renderBody(this._config!, this._sections, {
          hidden: frame.children.length > 0,
          onScroll: this._updateScrollState,
          fadeTop: this._contentScrolled,
          fadeBottom: this._contentScrollable,
        })}
        ${this._renderChild(frame)}
      `;
    }
    if (!entityId) return nothing;

    if (frame.view === "settings") {
      return html`
        <div ?hidden=${frame.children.length > 0}>
          <ha-more-info-settings
            .hass=${hass}
            .entityId=${entityId}
            .entry=${entry}
          ></ha-more-info-settings>
        </div>
        ${this._renderChild(frame)}
      `;
    }
    if (frame.children.length) return this._renderChild(frame);

    switch (frame.view) {
      case "info":
        return html`
          <ha-more-info-info
            .hass=${hass}
            .entityId=${entityId}
            .entry=${entry}
            .editMode=${false}
          ></ha-more-info-info>
        `;
      case "history":
        return html`
          <ha-more-info-history-and-logbook
            .hass=${hass}
            .entityId=${entityId}
          ></ha-more-info-history-and-logbook>
        `;
      case "related":
        return html`
          <ha-more-info-related
            .hass=${hass}
            .entry=${entry}
            .params=${{ entityId }}
          ></ha-more-info-related>
        `;
      case "add_to":
        return html`
          <ha-more-info-add-to
            .entityId=${entityId}
            @add-to-action-selected=${this._goBack}
          ></ha-more-info-add-to>
        `;
      case "details":
        return html`
          <ha-more-info-details
            .hass=${hass}
            .entry=${entry}
            .params=${{ entityId }}
            .yamlMode=${this._detailsYaml}
          ></ha-more-info-details>
        `;
      default:
        return nothing;
    }
  }

  static override styles = [
    dialogStyles,
    bottomSheetStyles,
    scrollbarStyles,
    fadeStyles,
    headerStyles,
    contentStyles,
    zoneStyles,
    css`
      [hidden] {
        display: none !important;
      }
      /* vertical_align: the body fills the free space of a taller popup. */
      .content:has(> .body:is(.align-center, .align-bottom):not([hidden])) {
        display: flex;
        flex-direction: column;
      }
      .body.align-center,
      .body.align-bottom {
        flex: 1 0 auto;
      }
      .body.align-center {
        justify-content: center;
      }
      .body.align-bottom {
        justify-content: flex-end;
      }
      /* layout: zones. The main zone takes the free height; the header and
         footer stay pinned while it scrolls between them. */
      .content:has(> .body.zones:not([hidden])) {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .body.zones {
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      /* top-sheet.ts: the safe area moves to the top edge. */
      ha-bottom-sheet.top {
        --ha-bottom-sheet-padding: var(--safe-area-inset-top)
          var(--safe-area-inset-right) 0 var(--safe-area-inset-left);
        --ha-bottom-sheet-content-padding: 0;
      }
      /* The drag handle of ha-bottom-sheet, at the bottom edge. */
      .top-sheet-handle {
        display: flex;
        justify-content: center;
        padding: var(--ha-space-2) 0 var(--ha-space-3);
        cursor: grab;
        touch-action: none;
      }
      .top-sheet-handle::after {
        content: "";
        width: 40px;
        height: 4px;
        border-radius: var(--ha-border-radius-md);
        background: var(--ha-bottom-sheet-handle-color, var(--divider-color));
      }
    `,
  ];
}

if (!customElements.get(DIALOG_TAG)) {
  customElements.define(DIALOG_TAG, MoreInfoPopupDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    [DIALOG_TAG]: MoreInfoPopupDialog;
  }
}
