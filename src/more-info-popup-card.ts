/**
 * `custom:more-info-popup-card`
 *
 * Invisible on the dashboard, a tile-like placeholder in edit mode and an
 * inline popup surface in the card editor preview. Opening it shows
 * `<more-info-popup-dialog>` through HA's dialog manager.
 */
import { mdiClose, mdiDockWindow, mdiEyeOff } from "@mdi/js";
import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import {
  CARD_TAG,
  CARD_TYPE,
  DIALOG_TAG,
  EDITOR_TAG,
  resolveConfig,
  slugify,
  validateConfig,
  type PopupCardConfig,
  type ResolvedPopupConfig,
} from "./config";
import { computeStateName } from "./ha/entity";
import { fireEvent } from "./ha/fire-event";
import {
  ensureDialogElements,
  isSupportedHaVersion,
  MIN_HA_VERSION,
} from "./ha/internals";
import { allCards, renderBody, zoneStyles, ZoneSections } from "./zones";
import { contentStyles, headerStyles } from "./ha/styles";
import type {
  HomeAssistant,
  LovelaceCard,
  LovelaceGridOptions,
} from "./ha/types";
import { localize } from "./localize/localize";
import "./popup-dialog";
import type { PopupDialogParams } from "./popup-dialog";
import { computeHeaderInfo, renderTitle } from "./popup-header";
import { getRegistry, type OpenOptions, type PopupHost } from "./registry";
import { bindEntity, matchingEntities } from "./match";
import { preloadPopup, preloadPopupWithin } from "./preload";
import "./editor/popup-card-editor";
import { CONTROLS_CARD_TYPE } from "./controls/controls-card";
import { STATE_CARD_TYPE } from "./controls/state-card";

declare const __VERSION__: string;

/** Longest wait for the popup's cards to load before it opens anyway (ms). */
const OPEN_PRELOAD_TIMEOUT = 1000;

type Surface = "hidden" | "placeholder" | "preview";

export class MoreInfoPopupCard
  extends LitElement
  implements LovelaceCard, PopupHost
{
  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement(EDITOR_TAG);
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
  ): Omit<PopupCardConfig, "type"> & { type: string } {
    const entity =
      entities.find((id) => id.startsWith("light.")) ?? entities[0];
    const stateObj = entity ? hass.states[entity] : undefined;
    const base = stateObj ? slugify(computeStateName(stateObj)) : "";
    const suffix = Math.random().toString(36).slice(2, 6);
    return {
      type: `custom:${CARD_TYPE}`,
      popup_id: base ? `${base}_${suffix}` : `popup_${suffix}`,
      cards: [],
    };
  }

  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  @property({ attribute: false }) accessor layout: string | undefined;

  @state() accessor _config: ResolvedPopupConfig | undefined;

  @state() accessor _surface: Surface = "hidden";

  /** Keep connected while hidden so triggers stay registered (like `conditional`). */
  public connectedWhileHidden = true;

  private _preview = false;

  private _previewZones?: ZoneSections;

  public get preview(): boolean {
    return this._preview;
  }

  public set preview(value: boolean) {
    this._preview = Boolean(value);
    this._syncSurface();
  }

  public get popupConfig(): ResolvedPopupConfig | undefined {
    return this._config;
  }

  public setConfig(config: PopupCardConfig): void {
    this._config = resolveConfig(validateConfig(config));
    // Attributes cannot be set in the constructor; this runs before hui-card
    // connects the element and checks its visibility.
    this._syncSurface();
  }

  public getCardSize(): number {
    return this._surface === "hidden" ? 0 : this._surface === "preview" ? 6 : 1;
  }

  public getGridOptions(): LovelaceGridOptions {
    if (this._computeSurface() === "preview") {
      return { columns: "full", rows: "auto" };
    }
    return { columns: 6, rows: 1, min_columns: 3, max_rows: 1 };
  }

  public openPopup(options?: OpenOptions): void {
    if (!this._config) return;
    const config = bindEntity(this._config, options?.entity);
    ensureDialogElements().then(async (missing) => {
      if (
        missing.includes("ha-adaptive-dialog") ||
        missing.includes("hui-section")
      ) {
        fireEvent(this, "hass-notification", {
          message: localize(this.hass, "card.missing_elements"),
        });
        return;
      }
      // Cards whose chunks are still loading draw empty: the popup would open
      // short and then grow. Usually already preloaded (`_schedulePreload`).
      await preloadPopupWithin(config, this.hass, OPEN_PRELOAD_TIMEOUT);
      fireEvent(this, "show-dialog", {
        dialogTag: DIALOG_TAG,
        dialogImport: () => Promise.resolve(),
        dialogParams: {
          config,
          view: options?.view,
        } satisfies PopupDialogParams,
        addHistory: true,
      });
    });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    getRegistry().register(this);
    this._syncSurface();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    getRegistry().unregister(this);
  }

  /**
   * - Dashboard in use: hidden (no gap in the grid).
   * - Dashboard edit mode (inside `hui-card-edit-mode` / `hui-card-options`): placeholder.
   * - Card editor preview: inline popup surface.
   */
  private _computeSurface(): Surface {
    if (!this._preview) return "hidden";
    return this.closest("hui-card-edit-mode, hui-card-options")
      ? "placeholder"
      : "preview";
  }

  private _syncSurface() {
    const surface = this._computeSurface();
    if (surface !== this._surface) this._surface = surface;
    const hidden = surface === "hidden";
    if (this.hasAttribute("hidden") !== hidden) {
      this.toggleAttribute("hidden", hidden);
      // hui-card only re-checks visibility on this event.
      if (this.isConnected) {
        fireEvent(this, "card-visibility-changed", { value: !hidden });
      }
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("hass") && this._previewZones) {
      this._previewZones.hass = this.hass;
    }
    if (changed.has("hass") || changed.has("_config")) this._schedulePreload();
  }

  private _preloaded?: ResolvedPopupConfig;

  /**
   * Loads the chunks of the popup's cards while the dashboard is idle, so
   * the first open does not wait for them.
   */
  private _schedulePreload() {
    const template = this._config;
    if (!template || !this.hass || this._preloaded === template) return;
    this._preloaded = template;
    const run = () => {
      const hass = this.hass;
      if (!hass || this._config !== template) return;
      // A template popup preloads with its first matching entity.
      const config = bindEntity(
        template,
        template.entity ?? matchingEntities(template, hass)[0],
      );
      preloadPopup(config, hass);
    };
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 5000 });
    } else {
      setTimeout(run, 1000);
    }
  }

  protected override render() {
    if (!this._config || !this.hass || this._surface === "hidden")
      return nothing;
    if (!isSupportedHaVersion(this.hass.config.version)) {
      return html`<ha-alert alert-type="warning">
        ${localize(this.hass, "card.unsupported_version", {
          version: MIN_HA_VERSION.join("."),
        })}
      </ha-alert>`;
    }
    return this._surface === "placeholder"
      ? this._renderPlaceholder(this._config)
      : this._renderPreview(this._config);
  }

  private _renderPlaceholder(config: ResolvedPopupConfig) {
    const hass = this.hass!;
    const stateObj = config.entity ? hass.states[config.entity] : undefined;
    const name =
      config.name ?? (stateObj ? computeStateName(stateObj) : config.popup_id);
    const count = allCards(config).length;
    const cards =
      count === 1
        ? localize(hass, "card.cards_count_one")
        : localize(hass, "card.cards_count", { count });
    return html`
      <ha-card class="placeholder">
        <ha-tile-container>
          <ha-tile-icon
            slot="icon"
            .icon=${config.icon}
            .iconPath=${config.icon ? undefined : mdiDockWindow}
          >
            ${
              config.icon || !stateObj
                ? nothing
                : html`<ha-state-icon
                    slot="icon"
                    .stateObj=${stateObj}
                    .hass=${hass}
                  ></ha-state-icon>`
            }
          </ha-tile-icon>
          <ha-tile-info slot="info">
            <span slot="primary">${name}</span>
            <span
              slot="secondary"
              class="secondary"
              title=${localize(hass, "card.hidden_hint", { id: config.popup_id })}
            >
              <ha-svg-icon .path=${mdiEyeOff}></ha-svg-icon>
              #${config.popup_id} · ${cards}
            </span>
          </ha-tile-info>
        </ha-tile-container>
      </ha-card>
    `;
  }

  private _renderPreview(template: ResolvedPopupConfig) {
    const hass = this.hass!;
    // A template popup previews with its first matching entity.
    const config = bindEntity(
      template,
      template.entity ?? matchingEntities(template, hass)[0],
    );
    this._previewZones ??= new ZoneSections();
    const sections = this._previewZones.update(config, hass);
    const info = computeHeaderInfo(hass, config, {
      entityId: config.entity,
      view: "root",
      children: [],
    });
    return html`
      <div class="surface" inert>
        <ha-dialog-header>
          <ha-icon-button
            slot="navigationIcon"
            .label=${hass.localize("ui.common.close")}
            .path=${mdiClose}
          ></ha-icon-button>
          ${renderTitle(hass, info, "title")}
        </ha-dialog-header>
        ${renderBody(config, sections)}
      </div>
    `;
  }

  static override styles = [
    headerStyles,
    contentStyles,
    zoneStyles,
    css`
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      ha-card.placeholder {
        height: 100%;
        border-style: dashed;
        --tile-color: var(--primary-color);
        position: relative;
      }
      ha-tile-icon {
        --tile-icon-color: var(--tile-color);
      }
      .secondary {
        display: inline-flex;
        align-items: center;
        gap: var(--ha-space-1);
      }
      .secondary ha-svg-icon {
        --mdc-icon-size: 14px;
        flex: none;
      }
      .surface {
        display: flex;
        flex-direction: column;
        background: var(
          --ha-dialog-surface-background,
          var(--card-background-color, var(--ha-color-surface-default))
        );
        border-radius: var(
          --ha-dialog-border-radius,
          var(--ha-border-radius-3xl)
        );
        box-shadow: var(--dialog-box-shadow, var(--wa-shadow-l));
        overflow: hidden;
      }
    `,
  ];
}

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, MoreInfoPopupCard);
  window.customCards = window.customCards ?? [];
  window.customCards.push({
    type: CARD_TYPE,
    name: localize(undefined, "card.name"),
    description: localize(undefined, "card.description"),
    preview: false,
    documentationURL: "https://github.com/Cheerpipe/ha-more-info-popup-card",
  });
  window.customCards.push(
    {
      type: STATE_CARD_TYPE,
      name: localize(undefined, "state_card.name"),
      description: localize(undefined, "state_card.description"),
      preview: true,
      documentationURL: "https://github.com/Cheerpipe/ha-more-info-popup-card",
    },
    {
      type: CONTROLS_CARD_TYPE,
      name: localize(undefined, "controls_card.name"),
      description: localize(undefined, "controls_card.description"),
      preview: true,
      documentationURL: "https://github.com/Cheerpipe/ha-more-info-popup-card",
    },
  );
  console.info(
    `%c MORE-INFO-POPUP-CARD %c ${__VERSION__} `,
    "color: white; background: #03a9f4; font-weight: 700;",
    "color: #03a9f4; background: white; font-weight: 700;",
  );
}

declare global {
  interface HTMLElementTagNameMap {
    [CARD_TAG]: MoreInfoPopupCard;
  }
}
