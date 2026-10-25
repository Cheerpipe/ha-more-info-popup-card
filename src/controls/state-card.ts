/**
 * `custom:more-info-state-card`: the top of a native more-info dialog — the
 * state header ("Off · 3 hours ago") and the big control (toggle, brightness
 * slider, cover position, thermostat…) — as a composable card.
 */
import {
  mdiBrightness6,
  mdiCheck,
  mdiFan,
  mdiFanOff,
  mdiFileWordBox,
  mdiGestureTapButton,
  mdiHomeImportOutline,
  mdiLightbulbOff,
  mdiLightbulbOn,
  mdiMapMarker,
  mdiMenu,
  mdiPause,
  mdiPlay,
  mdiPlayCircleOutline,
  mdiPlayPause,
  mdiPower,
  mdiRemoteTv,
  mdiStop,
  mdiSwapVertical,
  mdiTargetVariant,
  mdiTextureBox,
  mdiVolumeHigh,
  mdiVolumeOff,
} from "@mdi/js";
import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { computeDomain, computeObjectId, computeStateName } from "../ha/entity";
import type {
  ExtEntityRegistryEntry,
  HassEntity,
  HomeAssistant,
  LovelaceCardConfig,
  LovelaceGridOptions,
} from "../ha/types";
import { fireEvent } from "../ha/fire-event";
import { runNativeMethod } from "../ha/internals";
import { ensureMoreInfoElements } from "./loader";
import type { PushLayout } from "./trigger-control";
import { stateColorVars } from "../ha/color";
import { resolveIconPath } from "../ha/icons";
import "./trigger-control";
import "./remote-control";
import { localize } from "../localize/localize";
import { companionMediaPlayer, resolveRemote } from "./remote-profiles";
import {
  ALARM_DISARM_STATES,
  blankBeforePercent,
  callProtectedLockService,
  coverControls,
  deviceBattery,
  disarmAlarm,
  LawnMowerFeature,
  LOCK_OPEN,
  lockCanOpen,
  mowerCanDock,
  mowerCanStop,
  positionStateDisplay,
  showFavoritePositions,
  SirenFeature,
  stateColorCss,
  vacuumCanReturnHome,
  vacuumCanStop,
  vacuumCleaning,
  VacuumFeature,
  valveControls,
} from "./native-helpers";
import {
  autoStateControl,
  DOMAIN_TAGS,
  LIGHT_TAGS,
  showsStateRow,
  defaultShowState,
  resolveStateControl,
  lightSupportsBrightness,
  lightSupportsColor,
  lightSupportsColorTemp,
  lightSupportsWhite,
  remountsStateCard,
  STATE_CONTROLS,
  supports,
  type StateControlName,
} from "./state-controls";
import { STATE_CARD_EDITOR_TAG } from "./editors";
import { cardAppearanceStyles, type CardAppearance } from "./styles";

export const STATE_CARD_TYPE = "more-info-state-card";

/**
 * Fired when the card is attached so a containing popup can hand it the free
 * height of a full-height sheet (see `popupFill`).
 */
export const POPUP_FILL_EVENT = "more-info-popup-fill";

export interface StateCardConfig extends LovelaceCardConfig {
  entity: string;
  /** "auto" (as more-info), "none", or a specific native control. */
  control?: "auto" | "none" | StateControlName;
  /** Defaults to the native behavior of the entity's domain. */
  show_state?: boolean;
  show_last_changed?: boolean;
  /** Replaces the state text of the header. */
  state_override?: string;
  appearance?: CardAppearance;
  /** Shape of `control: push`. */
  button_layout?: PushLayout;
  /** Cancel button under a script's trigger / push control (default true). */
  show_cancel?: boolean;
  /**
   * Replaces the entity icon of the control (toggle, trigger, push); for the
   * toggle it is the "on" icon and `icon_off` the "off" one.
   */
  icon?: string;
  icon_off?: string;
  /** Active / inactive color of the native control (`ui_color` or CSS). */
  color?: string;
  color_off?: string;
  /**
   * Remote of a media player: `auto` (default) finds the remote on the
   * device of supported integrations (Apple TV), `none` hides it, or a
   * `remote.*` entity. It adds a Now playing / Remote switch to the media
   * player control and is the remote of `control: remote`.
   */
  remote?: string;
  /** View the media player opens on when it has a remote. */
  remote_view?: RemoteView;
  /** Haptic feedback of the remote (default true). */
  haptics?: boolean;
}

type RemoteView = "now_playing" | "remote";

const CONTROL_ATTRIBUTES: Partial<Record<StateControlName, string[]>> = {
  temperature: ["show-secondary", "prevent-interaction-on-scroll"],
  climate_humidity: ["show-current", "prevent-interaction-on-scroll"],
  humidity: ["show-secondary", "prevent-interaction-on-scroll"],
  water_heater: ["show-current", "prevent-interaction-on-scroll"],
};

/** `FanEntityFeature` (`src/data/fan.ts`). */
const FAN_TURN_OFF = 16;
const FAN_TURN_ON = 32;
/** `FAN_SPEED_COUNT_MAX_FOR_BUTTONS`: more speeds use a slider. */
const FAN_SPEED_COUNT_MAX_FOR_BUTTONS = 6;

const fanSpeedCount = (stateObj: HassEntity): number =>
  Math.round(100 / (stateObj.attributes.percentage_step ?? 1)) + 1;

type LightMainControl = "brightness" | "color" | "color_temp";

/** Mode of the cover / valve more-info (`_mode`). */
type PositionMode = "position" | "button";

/** Controls drawn by the cover / valve more-info as a whole. */
const POSITION_CONTROLS: readonly StateControlName[] = [
  "position",
  "tilt",
  "cover_toggle",
  "cover_buttons",
  "valve_position",
  "valve_toggle",
  "valve_buttons",
];

/** Lock open button (`more-info-lock.ts`). */
type OpenButtonState = "normal" | "confirm" | "done";
const OPEN_CONFIRM_SECONDS = 5;
const OPEN_DONE_SECONDS = 2;

const ignore = () => undefined;

const SCRIPT_MAX_MODES = ["queued", "parallel"];

/** `canRun` (`src/data/script.ts`). */
const scriptCanRun = (stateObj: HassEntity): boolean =>
  stateObj.state === "off" ||
  (stateObj.state === "on" &&
    SCRIPT_MAX_MODES.includes(stateObj.attributes.mode) &&
    stateObj.attributes.current < stateObj.attributes.max);

/** Header text the native controls show instead of the plain state. */
const autoStateOverride = (
  hass: HomeAssistant,
  stateObj: HassEntity,
): string | undefined => {
  const domain = computeDomain(stateObj.entity_id);
  const attrs = stateObj.attributes;
  if (
    domain === "light" &&
    stateObj.state === "on" &&
    attrs.brightness != null
  ) {
    return hass.formatEntityAttributeValue(stateObj, "brightness");
  }
  if (domain === "fan" && stateObj.state === "on" && attrs.percentage) {
    return hass.formatEntityAttributeValue(stateObj, "percentage");
  }
  if (domain === "script") {
    const current = attrs.current || 0;
    if (!current) return hass.localize("ui.card.script.idle");
    return attrs.mode === "parallel" && current > 1
      ? hass.localize("ui.card.script.running_parallel", { active: current })
      : hass.localize("ui.card.script.running_single");
  }
  // The state is the time of the last press: the header already says it.
  if (
    (domain === "button" || domain === "input_button") &&
    stateObj.state !== "unavailable"
  ) {
    return hass.localize("ui.card.button.press");
  }
  if (domain === "cover" || domain === "valve") {
    const position = positionStateDisplay(hass, stateObj);
    return position
      ? `${hass.formatEntityState(stateObj)} · ${position}`
      : undefined;
  }
  if (
    domain === "vacuum" &&
    supports(stateObj, VacuumFeature.STATUS) &&
    attrs.status
  ) {
    return hass.formatEntityAttributeValue(stateObj, "status");
  }
  return undefined;
};

export class MoreInfoStateCard extends LitElement {
  /** `ha-form` editor that shows the values used for unset options. */
  public static getConfigElement() {
    return document.createElement(STATE_CARD_EDITOR_TAG);
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
  ): StateCardConfig {
    const entity =
      entities.find((id) => id.startsWith("light.")) ??
      entities.find((id) => autoStateControl(hass.states[id]!)) ??
      entities[0];
    return { type: `custom:${STATE_CARD_TYPE}`, entity };
  }

  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  /** Kept as given so UIX can read `uix:` / `card_mod:` from it. */
  @state() accessor _config: StateCardConfig | undefined;

  @state() accessor _ready = false;

  /** Value of the script fields form (`{ action, data }`). */
  @state() accessor _scriptData: {
    action?: string;
    data?: Record<string, unknown>;
  } = {};

  /** Control shown by the light button bar (`more-info-light`). */
  @state() accessor _lightControl: LightMainControl = "brightness";

  /** Registry entry: favorites, default codes. */
  @state() accessor _entry: ExtEntityRegistryEntry | null | undefined;

  /** Position or button mode of the cover / valve more-info. */
  @state() accessor _positionMode: PositionMode | undefined;

  @state() accessor _openState: OpenButtonState = "normal";

  /** Now playing or remote, for a media player with a remote. */
  @state() accessor _remoteView: RemoteView = "now_playing";

  private _openTimeout?: ReturnType<typeof setTimeout>;

  private _controlElement?: HTMLElement & {
    stateObj?: HassEntity;
    hass?: HomeAssistant;
  };

  private _controlTag?: string;

  public setConfig(config: StateCardConfig): void {
    if (!config?.entity) throw new Error('"entity" is required');
    if (
      config.control &&
      config.control !== "auto" &&
      config.control !== "none" &&
      !(config.control in STATE_CONTROLS)
    ) {
      throw new Error(`Unknown control "${config.control}"`);
    }
    const prev = this._config;
    this._config = config;
    if (prev?.icon !== config.icon || prev?.icon_off !== config.icon_off) {
      this._loadIconPaths(config);
    }
    if (!remountsStateCard(prev, config)) return;
    this._ready = false;
    this._loadingKey = undefined;
    this._scriptData = { action: config.entity };
    this._lightControl = "brightness";
    this._positionMode = undefined;
    this._setOpenState("normal");
    this._entry = undefined;
    this._entryLoaded = undefined;
    this._remoteView = config.remote_view ?? "now_playing";
  }

  /** Paths of `icon` / `icon_off` for the toggle (it only takes paths). */
  @state() accessor _iconPaths: { on?: string; off?: string } = {};

  private _loadIconPaths(config: StateCardConfig) {
    const { icon, icon_off: iconOff } = config;
    this._iconPaths = {};
    if (!icon && !iconOff) return;
    Promise.all([
      icon ? resolveIconPath(icon) : undefined,
      iconOff ? resolveIconPath(iconOff) : undefined,
    ]).then(([on, off]) => {
      if (this._config?.icon !== icon || this._config?.icon_off !== iconOff) {
        return;
      }
      this._iconPaths = { on, off };
    });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    fireEvent(this, POPUP_FILL_EVENT);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._setOpenState("normal");
  }

  /**
   * Extra height the popup gives the control, so it sits centered in the free
   * space like in the native full-height more-info. Set synchronously because
   * the popup measures the layout right after.
   */
  public set popupFill(px: number) {
    this.style.removeProperty("--popup-min-height");
    if (px <= 0) return;
    const ownHeight = this.getBoundingClientRect().height;
    this.style.setProperty("--popup-min-height", `${ownHeight + px}px`);
  }

  public getCardSize(): number {
    return 7;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto", min_columns: 6 };
  }

  private get _stateObj(): HassEntity | undefined {
    return this._config && this.hass?.states[this._config.entity];
  }

  private get _controlName(): StateControlName | undefined {
    return resolveStateControl(this._config?.control, this._stateObj);
  }

  private _loadingKey?: string;

  protected override willUpdate(): void {
    if (this._ready || !this._config || !this._stateObj) return;
    const control = this._controlName;
    const spec = control ? STATE_CONTROLS[control] : undefined;
    const needsHeader =
      this._showState && this._config.show_last_changed !== false;
    const key = `${this._config.entity}:${control}:${needsHeader}`;
    if (key === this._loadingKey) return;
    this._loadingKey = key;
    const loads: Promise<boolean>[] = [];
    if (spec) {
      const extra: readonly string[] =
        "extraTags" in spec ? spec.extraTags : [];
      const domain = spec.load || computeDomain(this._config.entity);
      loads.push(ensureMoreInfoElements(domain, [spec.tag, ...extra]));
    }
    // The light button bar and pickers only come with the light more-info,
    // also for on/off lights shown with the generic toggle. Same for the
    // other parts each domain's more-info draws around its control.
    const domain = computeDomain(this._config.entity);
    const domainTags = domain === "light" ? LIGHT_TAGS : DOMAIN_TAGS[domain];
    if (spec && domainTags) {
      loads.push(ensureMoreInfoElements(domain, [...domainTags]));
    }
    // Climate, humidifier and water heater controls don't import the header:
    // load it from a domain whose more-info has one.
    if (needsHeader) {
      loads.push(
        ensureMoreInfoElements("switch", ["ha-more-info-state-header"]),
      );
    }
    Promise.all(loads).then(() => {
      if (this._loadingKey === key) this._ready = true;
    });
  }

  private get _showState(): boolean {
    return (
      this._config!.show_state ??
      defaultShowState(this._config!.entity, this._controlName)
    );
  }

  private _control(stateObj: HassEntity) {
    const name = this._controlName;
    if (!name) return nothing;
    if (name === "script") return this._script(stateObj);
    if (name === "press") return this._press(stateObj);
    if (name === "trigger" || name === "push") {
      return html`<more-info-popup-trigger-control
        .hass=${this.hass}
        .stateObj=${stateObj}
        .variant=${name === "push" ? "button" : "switch"}
        .icon=${this._config!.icon}
        .label=${this._config!.state_override}
        .layout=${this._config!.button_layout ?? "vertical"}
        .showCancel=${this._config!.show_cancel !== false}
      ></more-info-popup-trigger-control>`;
    }
    if (name === "more_info") return this._moreInfo(stateObj);
    if (name === "remote") return this._remote(stateObj);
    const domain = computeDomain(stateObj.entity_id);
    if (this._positionComposite(stateObj)) {
      return this._positionControls(stateObj);
    }
    const { tag } = STATE_CONTROLS[name];
    if (this._controlTag !== tag) {
      this._controlTag = tag;
      this._controlElement = document.createElement(tag);
      for (const attr of CONTROL_ATTRIBUTES[name] ?? []) {
        this._controlElement.setAttribute(attr, "");
      }
      if (name === "lock") {
        this._controlElement.addEventListener("lock-service-called", () =>
          this._setOpenState("normal"),
        );
      }
    }
    const element = this._controlElement! as HTMLElement & {
      stateObj?: HassEntity;
      hass?: HomeAssistant;
      iconPathOn?: string;
      iconPathOff?: string;
    };
    element.stateObj = stateObj;
    element.hass = this.hass;
    if (name === "media_player") return this._mediaPlayer(stateObj, element);
    const isFan = domain === "fan";
    if (name === "toggle" && (this._iconPaths.on || this._iconPaths.off)) {
      element.iconPathOn = this._iconPaths.on ?? this._iconPaths.off;
      element.iconPathOff = this._iconPaths.off ?? this._iconPaths.on;
    } else if (name === "toggle") {
      element.iconPathOn = isFan
        ? mdiFan
        : domain === "light"
          ? mdiLightbulbOn
          : domain === "siren"
            ? mdiVolumeHigh
            : undefined;
      element.iconPathOff = isFan
        ? mdiFanOff
        : domain === "light"
          ? mdiLightbulbOff
          : domain === "siren"
            ? mdiVolumeOff
            : undefined;
    }
    if (domain === "light" && (name === "toggle" || name === "brightness")) {
      return this._light(stateObj, element);
    }
    if (domain === "siren" && name === "toggle") {
      return this._siren(stateObj, element);
    }
    if (domain === "lock" && name === "lock")
      return this._lock(stateObj, element);
    if (domain === "alarm_control_panel" && name === "alarm_modes") {
      return ALARM_DISARM_STATES.includes(stateObj.state)
        ? this._statusIcon(stateObj, "alarm")
        : element;
    }
    if (domain === "vacuum" && name === "vacuum_status") {
      return html`${element}${this._vacuumCommands(stateObj)}`;
    }
    if (domain === "lawn_mower" && name === "lawn_mower_status") {
      return html`${element}${this._mowerCommands(stateObj)}`;
    }
    if (
      name === "fan_speed" &&
      isFan &&
      fanSpeedCount(stateObj) > FAN_SPEED_COUNT_MAX_FOR_BUTTONS &&
      supports(stateObj, FAN_TURN_ON | FAN_TURN_OFF)
    ) {
      return html`${element}${this._fanPowerButton(stateObj)}`;
    }
    return element;
  }

  /**
   * Same content as `more-info-light.ts`: the main control (brightness, color
   * or color temperature), its button bar and the favorite colors. Effects
   * are left to the controls card.
   */
  private _light(stateObj: HassEntity, element: HTMLElement) {
    const hass = this.hass!;
    const supportsBrightness = lightSupportsBrightness(stateObj);
    const supportsColor = lightSupportsColor(stateObj);
    const supportsColorTemp = lightSupportsColorTemp(stateObj);
    const supportsWhite = lightSupportsWhite(stateObj);
    if (!supportsBrightness && !supportsColor && !supportsColorTemp) {
      return element;
    }
    const unavailable = stateObj.state === "unavailable";
    const main = this._lightControl;
    const setMain = (control: LightMainControl) => (ev: Event) => {
      ev.stopPropagation();
      this._lightControl = control;
    };
    const call = (service: string, data: Record<string, unknown> = {}) =>
      hass.callService("light", service, {
        entity_id: stateObj.entity_id,
        ...data,
      });
    if (supportsColor || supportsColorTemp) this._loadEntry();
    const entry = this._entry;
    const favorites = entry?.options?.light?.favorite_colors as
      unknown[] | null | undefined;
    const showFavorites = Boolean(
      entry && (favorites == null || favorites.length > 0),
    );
    return html`
      ${supportsBrightness ? nothing : element}
      ${
        supportsBrightness && main === "brightness"
          ? element
          : supportsColor && main === "color"
            ? html`<light-color-rgb-picker
                .hass=${hass}
                .stateObj=${stateObj}
              ></light-color-rgb-picker>`
            : supportsColorTemp && main === "color_temp"
              ? html`<light-color-temp-picker
                  .hass=${hass}
                  .stateObj=${stateObj}
                ></light-color-temp-picker>`
              : nothing
      }
      <ha-icon-button-group>
        ${
          supportsBrightness
            ? html`<ha-icon-button
                .disabled=${unavailable}
                .label=${hass.localize(
                  "ui.dialogs.more_info_control.light.toggle",
                )}
                @click=${(ev: Event) => {
                  ev.stopPropagation();
                  call(stateObj.state === "on" ? "turn_off" : "turn_on");
                }}
              >
                <ha-svg-icon .path=${mdiPower}></ha-svg-icon>
              </ha-icon-button>`
            : nothing
        }
        ${
          supportsColor || supportsColorTemp
            ? html`<div class="separator"></div>
                <ha-icon-button-toggle
                  .selected=${main === "brightness"}
                  .disabled=${unavailable}
                  .label=${hass.formatEntityAttributeName(
                    stateObj,
                    "brightness",
                  )}
                  @click=${setMain("brightness")}
                >
                  <ha-svg-icon .path=${mdiBrightness6}></ha-svg-icon>
                </ha-icon-button-toggle>`
            : nothing
        }
        ${
          supportsColor
            ? html`<ha-icon-button-toggle
                border-only
                .selected=${main === "color"}
                .disabled=${unavailable}
                .label=${hass.localize(
                  "ui.dialogs.more_info_control.light.color",
                )}
                @click=${setMain("color")}
              >
                <span class="wheel color"></span>
              </ha-icon-button-toggle>`
            : nothing
        }
        ${
          supportsColorTemp
            ? html`<ha-icon-button-toggle
                border-only
                .selected=${main === "color_temp"}
                .disabled=${unavailable}
                .label=${hass.localize(
                  "ui.dialogs.more_info_control.light.color_temp",
                )}
                @click=${setMain("color_temp")}
              >
                <span class="wheel color-temp"></span>
              </ha-icon-button-toggle>`
            : nothing
        }
        ${
          supportsWhite
            ? html`<div class="separator"></div>
                <ha-icon-button
                  .disabled=${unavailable}
                  .label=${hass.localize(
                    "ui.dialogs.more_info_control.light.set_white",
                  )}
                  @click=${(ev: Event) => {
                    ev.stopPropagation();
                    call("turn_on", { white: true });
                  }}
                >
                  <ha-svg-icon .path=${mdiFileWordBox}></ha-svg-icon>
                </ha-icon-button>`
            : nothing
        }
      </ha-icon-button-group>
      ${
        showFavorites
          ? html`<ha-more-info-light-favorite-colors
              .hass=${hass}
              .stateObj=${stateObj}
              .entry=${entry}
            ></ha-more-info-light-favorite-colors>`
          : nothing
      }
    `;
  }

  /**
   * `more-info-cover` / `more-info-valve` draw all their controls (position
   * and tilt side by side, or the buttons) with a switch between both, when
   * the control is picked automatically. A forced control stays alone.
   */
  private _positionComposite(stateObj: HassEntity): boolean {
    const domain = computeDomain(stateObj.entity_id);
    return (
      (domain === "cover" || domain === "valve") &&
      (this._config!.control ?? "auto") === "auto" &&
      POSITION_CONTROLS.includes(this._controlName!)
    );
  }

  private _positionControls(stateObj: HassEntity) {
    const hass = this.hass!;
    const domain = computeDomain(stateObj.entity_id) as "cover" | "valve";
    const controls =
      domain === "cover" ? coverControls(stateObj) : valveControls(stateObj);
    const mode =
      this._positionMode ??
      (controls.position || controls.tilt ? "position" : "button");
    const setMode = (value: PositionMode) => (ev: Event) => {
      ev.stopPropagation();
      this._positionMode = value;
    };
    const cover = domain === "cover";
    let main: unknown = nothing;
    if (mode === "position") {
      main = html`
        ${
          controls.position
            ? cover
              ? html`<ha-state-control-cover-position
                  .hass=${hass}
                  .stateObj=${stateObj}
                ></ha-state-control-cover-position>`
              : html`<ha-state-control-valve-position
                  .hass=${hass}
                  .stateObj=${stateObj}
                ></ha-state-control-valve-position>`
            : nothing
        }
        ${
          controls.tilt
            ? html`<ha-state-control-cover-tilt-position
                .hass=${hass}
                .stateObj=${stateObj}
              ></ha-state-control-cover-tilt-position>`
            : nothing
        }
      `;
    } else if (controls.buttons === "toggle") {
      main = cover
        ? html`<ha-state-control-cover-toggle
            .hass=${hass}
            .stateObj=${stateObj}
          ></ha-state-control-cover-toggle>`
        : html`<ha-state-control-valve-toggle
            .hass=${hass}
            .stateObj=${stateObj}
          ></ha-state-control-valve-toggle>`;
    } else if (controls.buttons === "buttons") {
      main = cover
        ? html`<ha-state-control-cover-buttons
            .hass=${hass}
            .stateObj=${stateObj}
          ></ha-state-control-cover-buttons>`
        : html`<ha-state-control-valve-buttons
            .hass=${hass}
            .stateObj=${stateObj}
          ></ha-state-control-valve-buttons>`;
    }
    return html`
      <div class="main-control">${main}</div>
      ${
        controls.switchMode
          ? html`<ha-icon-button-group>
              <ha-icon-button-toggle
                .label=${hass.localize(
                  `ui.dialogs.more_info_control.${domain}.switch_mode.position`,
                )}
                .selected=${mode === "position"}
                .path=${mdiMenu}
                @click=${setMode("position")}
              ></ha-icon-button-toggle>
              <ha-icon-button-toggle
                .label=${hass.localize(
                  `ui.dialogs.more_info_control.${domain}.switch_mode.button`,
                )}
                .selected=${mode === "button"}
                .path=${mdiSwapVertical}
                @click=${setMode("button")}
              ></ha-icon-button-toggle>
            </ha-icon-button-group>`
          : nothing
      }
    `;
  }

  /** Favorite positions under the cover / valve controls. */
  private _favoritePositions(stateObj: HassEntity) {
    this._loadEntry();
    if (!showFavoritePositions(stateObj, this._entry)) return nothing;
    return computeDomain(stateObj.entity_id) === "cover"
      ? html`<ha-more-info-cover-favorite-positions
          .hass=${this.hass}
          .stateObj=${stateObj}
          .entry=${this._entry}
          .editMode=${false}
        ></ha-more-info-cover-favorite-positions>`
      : html`<ha-more-info-valve-favorite-positions
          .hass=${this.hass}
          .stateObj=${stateObj}
          .entry=${this._entry}
          .editMode=${false}
        ></ha-more-info-valve-favorite-positions>`;
  }

  /** Pulsing state icon of a jammed lock or a triggered / arming alarm. */
  private _statusIcon(stateObj: HassEntity, kind: "lock" | "alarm") {
    return html`
      <div
        class="status ${kind}"
        style=${styleMap({ "--state-color": stateColorCss(stateObj) })}
      >
        <div class="icon">
          <ha-state-icon
            .hass=${this.hass}
            .stateObj=${stateObj}
          ></ha-state-icon>
        </div>
      </div>
    `;
  }

  private _setOpenState(value: OpenButtonState, seconds?: number) {
    clearTimeout(this._openTimeout);
    this._openState = value;
    if (seconds) {
      this._openTimeout = setTimeout(() => {
        this._openState = "normal";
      }, seconds * 1000);
    }
  }

  /** `more-info-lock.ts`: toggle (or jammed status) and the open button. */
  private _lock(stateObj: HassEntity, element: HTMLElement) {
    const hass = this.hass!;
    this._loadEntry();
    const open = (ev: Event) => {
      ev.stopPropagation();
      if (this._openState !== "confirm") {
        this._setOpenState("confirm", OPEN_CONFIRM_SECONDS);
        return;
      }
      callProtectedLockService(this, hass, stateObj, this._entry, "open").catch(
        ignore,
      );
      this._setOpenState("done", OPEN_DONE_SECONDS);
    };
    return html`
      ${stateObj.state === "jammed" ? this._statusIcon(stateObj, "lock") : element}
      ${
        supports(stateObj, LOCK_OPEN)
          ? html`<div class="buttons">
              ${
                this._openState === "done"
                  ? html`<p class="open-done">
                      <ha-svg-icon .path=${mdiCheck}></ha-svg-icon>
                      ${hass.localize("ui.card.lock.open_door_done")}
                    </p>`
                  : html`<ha-control-button
                      .disabled=${!lockCanOpen(stateObj)}
                      class="open-button ${this._openState}"
                      style=${styleMap({
                        "--state-color": stateColorCss(stateObj),
                      })}
                      @click=${open}
                    >
                      ${
                        this._openState === "confirm"
                          ? hass.localize("ui.card.lock.open_door_confirm")
                          : hass.localize("ui.card.lock.open_door")
                      }
                    </ha-control-button>`
              }
            </div>`
          : nothing
      }
    `;
  }

  /** `more-info-siren.ts`: the toggle and "More controls" (tones, volume…). */
  private _siren(stateObj: HassEntity, element: HTMLElement) {
    const advanced =
      (supports(stateObj, SirenFeature.TONES) &&
        stateObj.attributes.available_tones) ||
      supports(stateObj, SirenFeature.VOLUME_SET | SirenFeature.DURATION);
    const more = (ev: Event) => {
      ev.stopPropagation();
      runNativeMethod(
        this.shadowRoot!,
        "more-info-siren",
        "_showAdvancedControlsDialog",
        { stateObj },
      );
    };
    return html`
      ${element}
      ${
        advanced
          ? html`<ha-button appearance="plain" size="s" @click=${more}>
              ${this.hass!.localize("ui.components.siren.more_controls")}
            </ha-button>`
          : nothing
      }
    `;
  }

  private _commandButton(
    label: string,
    path: string,
    disabled: boolean,
    action: () => void,
  ) {
    return html`<ha-control-button
      .label=${label}
      .disabled=${disabled}
      @click=${(ev: Event) => {
        ev.stopPropagation();
        action();
      }}
    >
      <ha-svg-icon .path=${path}></ha-svg-icon>
    </ha-control-button>`;
  }

  private _commands(buttons: unknown[]) {
    return buttons.length
      ? html`<div class="buttons">
          <ha-control-button-group class="commands">
            ${buttons}
          </ha-control-button-group>
        </div>`
      : nothing;
  }

  /** Start / pause, stop, return home, locate and clean spot (`more-info-vacuum`). */
  private _vacuumCommands(stateObj: HassEntity) {
    const hass = this.hass!;
    const unavailable = stateObj.state === "unavailable";
    const has = (feature: number) => supports(stateObj, feature);
    const call = (service: string) => () =>
      hass.callService("vacuum", service, { entity_id: stateObj.entity_id });
    const label = (key: string) =>
      hass.localize(`ui.dialogs.more_info_control.vacuum.${key}`);
    const cleaning = vacuumCleaning(stateObj);
    // Old vacuums without the STATE / START features toggle with start_pause.
    const legacy = !has(VacuumFeature.STATE) && !has(VacuumFeature.START);
    const pause = cleaning && has(VacuumFeature.PAUSE);
    const buttons: unknown[] = [];
    if (has(VacuumFeature.START) || has(VacuumFeature.PAUSE)) {
      buttons.push(
        this._commandButton(
          legacy
            ? label("start_pause")
            : pause
              ? label("pause")
              : label("start"),
          legacy ? mdiPlayPause : pause ? mdiPause : mdiPlay,
          // Pause is always available while cleaning, start whenever not.
          unavailable,
          legacy && has(VacuumFeature.PAUSE)
            ? call("start_pause")
            : call(cleaning ? "pause" : "start"),
        ),
      );
    }
    if (has(VacuumFeature.STOP)) {
      buttons.push(
        this._commandButton(
          label("stop"),
          mdiStop,
          unavailable || !vacuumCanStop(stateObj),
          call("stop"),
        ),
      );
    }
    if (has(VacuumFeature.RETURN_HOME)) {
      buttons.push(
        this._commandButton(
          label("return_home"),
          mdiHomeImportOutline,
          unavailable || !vacuumCanReturnHome(stateObj),
          call("return_to_base"),
        ),
      );
    }
    if (has(VacuumFeature.LOCATE)) {
      buttons.push(
        this._commandButton(
          label("locate"),
          mdiMapMarker,
          unavailable,
          call("locate"),
        ),
      );
    }
    if (has(VacuumFeature.CLEAN_SPOT)) {
      buttons.push(
        this._commandButton(
          label("clean_spot"),
          mdiTargetVariant,
          unavailable,
          call("clean_spot"),
        ),
      );
    }
    return this._commands(buttons);
  }

  /** Start / pause, stop and dock (`more-info-lawn_mower`). */
  private _mowerCommands(stateObj: HassEntity) {
    const hass = this.hass!;
    const unavailable = stateObj.state === "unavailable";
    const has = (feature: number) => supports(stateObj, feature);
    const call = (service: string) => () =>
      hass.callService("lawn_mower", service, {
        entity_id: stateObj.entity_id,
      });
    const label = (key: string) =>
      hass.localize(`ui.dialogs.more_info_control.lawn_mower.${key}`);
    const pause = stateObj.state === "mowing" && has(LawnMowerFeature.PAUSE);
    const buttons: unknown[] = [];
    if (has(LawnMowerFeature.START_MOWING) || has(LawnMowerFeature.PAUSE)) {
      buttons.push(
        this._commandButton(
          pause ? label("pause") : label("start_mowing"),
          pause ? mdiPause : mdiPlay,
          unavailable ||
            (!pause &&
              (!has(LawnMowerFeature.START_MOWING) ||
                stateObj.state === "mowing")),
          call(pause ? "pause" : "start_mowing"),
        ),
      );
    }
    if (has(LawnMowerFeature.STOP)) {
      buttons.push(
        this._commandButton(
          label("stop"),
          mdiStop,
          unavailable || !mowerCanStop(stateObj),
          call("stop"),
        ),
      );
    }
    if (has(LawnMowerFeature.DOCK)) {
      buttons.push(
        this._commandButton(
          label("dock"),
          mdiHomeImportOutline,
          unavailable || !mowerCanDock(stateObj),
          call("dock"),
        ),
      );
    }
    return this._commands(buttons);
  }

  /**
   * "Cleaning: by area" button. The view only exists inside a more-info
   * (`show-child-view`, handled by the popup); elsewhere the native more-info
   * opens instead.
   */
  private _cleanAreas(stateObj: HassEntity) {
    const hass = this.hass!;
    const open = (ev: Event) => {
      ev.stopPropagation();
      let unhandled = false;
      const mark = () => {
        unhandled = true;
      };
      window.addEventListener("show-child-view", mark);
      const ran = runNativeMethod(
        this.shadowRoot!,
        "more-info-vacuum",
        "_handleCleanAreas",
        { stateObj, _i18n: { localize: hass.localize } },
      );
      window.removeEventListener("show-child-view", mark);
      if (unhandled || !ran) {
        fireEvent(this, "hass-more-info", { entityId: stateObj.entity_id });
      }
    };
    return html`
      <ha-more-info-control-select-container>
        <button
          class="clean-areas-button"
          ?disabled=${stateObj.state === "unavailable"}
          @click=${open}
        >
          <div class="icon">
            <ha-svg-icon .path=${mdiTextureBox}></ha-svg-icon>
          </div>
          <div class="content">
            <p class="label">
              ${hass.localize("ui.dialogs.more_info_control.vacuum.cleaning")}
            </p>
            <p class="value">
              ${hass.localize("ui.dialogs.more_info_control.vacuum.by_area")}
            </p>
          </div>
          <div class="icon"><ha-icon-next></ha-icon-next></div>
        </button>
      </ha-more-info-control-select-container>
    `;
  }

  /**
   * What the native more-info draws after its controls block: favorite
   * positions, the jammed lock buttons, the alarm disarm button and the
   * vacuum clean areas.
   */
  private _afterControls(stateObj: HassEntity) {
    const name = this._controlName;
    if (!name) return nothing;
    const hass = this.hass!;
    const domain = computeDomain(stateObj.entity_id);
    if (this._positionComposite(stateObj)) {
      return this._favoritePositions(stateObj);
    }
    if (domain === "lock" && name === "lock" && stateObj.state === "jammed") {
      const call = (service: "lock" | "unlock") => (ev: Event) => {
        ev.stopPropagation();
        callProtectedLockService(
          this,
          hass,
          stateObj,
          this._entry,
          service,
        ).catch(ignore);
      };
      return html`
        <ha-control-button-group class="jammed">
          <ha-control-button @click=${call("unlock")}>
            ${hass.localize("ui.card.lock.unlock")}
          </ha-control-button>
          <ha-control-button @click=${call("lock")}>
            ${hass.localize("ui.card.lock.lock")}
          </ha-control-button>
        </ha-control-button-group>
      `;
    }
    if (
      domain === "alarm_control_panel" &&
      name === "alarm_modes" &&
      ALARM_DISARM_STATES.includes(stateObj.state)
    ) {
      this._loadEntry();
      const disarm = (ev: Event) => {
        ev.stopPropagation();
        disarmAlarm(this, hass, stateObj, this._entry).catch(ignore);
      };
      return html`
        <ha-control-button class="disarm" @click=${disarm}>
          ${hass.localize("ui.card.alarm_control_panel.disarm")}
        </ha-control-button>
      `;
    }
    if (
      domain === "vacuum" &&
      name === "vacuum_status" &&
      supports(stateObj, VacuumFeature.CLEAN_AREA)
    ) {
      return this._cleanAreas(stateObj);
    }
    return nothing;
  }

  /** Device battery after the time in the header (vacuum, lawn mower). */
  private _battery(stateObj: HassEntity) {
    const domain = computeDomain(stateObj.entity_id);
    if (domain !== "vacuum" && domain !== "lawn_mower") return nothing;
    const hass = this.hass!;
    const found = deviceBattery(hass, stateObj.entity_id);
    if (!found) return nothing;
    const { battery, charging } = found;
    return html`
      <span class="battery" slot="after-time">
        ${
          computeDomain(battery.entity_id) === "binary_sensor"
            ? nothing
            : html`<span
                >${Number(battery.state).toFixed()}${blankBeforePercent(hass)}%</span
              >`
        }
        <ha-battery-icon
          .hass=${hass}
          .batteryStateObj=${battery}
          .batteryChargingStateObj=${charging}
        ></ha-battery-icon>
      </span>
    `;
  }

  /** Same content as `ha-more-info-info`: state row, then `more-info-content`. */
  private _moreInfo(stateObj: HassEntity) {
    this._loadEntry();
    const row = showsStateRow(stateObj);
    return html`
      ${
        row
          ? html`<state-card-content
              in-dialog
              .hass=${this.hass}
              .stateObj=${stateObj}
            ></state-card-content>`
          : nothing
      }
      <more-info-content
        ?full-height=${!row}
        .hass=${this.hass}
        .stateObj=${stateObj}
        .entry=${this._entry}
        .editMode=${false}
      ></more-info-content>
    `;
  }

  private _entryLoaded?: string;

  /** Same request as the more-info dialog; null when not allowed. */
  private _loadEntry() {
    const entityId = this._config!.entity;
    if (this._entryLoaded === entityId) return;
    this._entryLoaded = entityId;
    this.hass!.callWS<ExtEntityRegistryEntry>({
      type: "config/entity_registry/get",
      entity_id: entityId,
    }).then(
      (entry) => {
        if (this._entryLoaded === entityId) this._entry = entry;
      },
      () => {
        if (this._entryLoaded === entityId) this._entry = null;
      },
    );
  }

  /** Remote entity and media player of `control: remote`. */
  private _remoteEntities(stateObj: HassEntity) {
    const hass = this.hass!;
    const entityId = stateObj.entity_id;
    if (computeDomain(entityId) === "remote") {
      return {
        remote: entityId,
        mediaPlayer: companionMediaPlayer(hass, entityId),
      };
    }
    const option = this._config!.remote;
    return {
      remote: resolveRemote(
        hass,
        entityId,
        option === "none" ? "auto" : option,
      ),
      mediaPlayer: entityId,
    };
  }

  private _remoteControl(remote: string, mediaPlayer: string | undefined) {
    return html`<more-info-popup-remote-control
      .hass=${this.hass}
      .remote=${remote}
      .mediaPlayer=${mediaPlayer}
      .haptics=${this._config!.haptics !== false}
    ></more-info-popup-remote-control>`;
  }

  private _remote(stateObj: HassEntity) {
    const { remote, mediaPlayer } = this._remoteEntities(stateObj);
    if (!remote || !this.hass!.states[remote]) {
      return html`<ha-alert alert-type="info">
        ${localize(this.hass, "remote.not_found")}
      </ha-alert>`;
    }
    return this._remoteControl(remote, mediaPlayer);
  }

  /**
   * The native media player content, and the remote of its device behind a
   * Now playing / Remote switch.
   */
  private _mediaPlayer(stateObj: HassEntity, element: HTMLElement) {
    const hass = this.hass!;
    const remote = resolveRemote(
      hass,
      stateObj.entity_id,
      this._config!.remote,
    );
    if (!remote || !hass.states[remote]) return element;
    const current = this._remoteView;
    const select = (view: RemoteView) => {
      if (view === current) return;
      if (this._config!.haptics !== false) {
        fireEvent(window, "haptic", "selection");
      }
      this._remoteView = view;
    };
    return html`
      <div class="remote-views" role="tablist">
        ${(["now_playing", "remote"] as const).map(
          (view) => html`
            <button
              role="tab"
              class=${classMap({ selected: view === current })}
              aria-selected=${view === current}
              @click=${() => select(view)}
            >
              <ha-svg-icon
                .path=${view === "remote" ? mdiRemoteTv : mdiPlayCircleOutline}
              ></ha-svg-icon>
              ${localize(hass, `remote.view.${view}`)}
            </button>
          `,
        )}
      </div>
      ${current === "remote" ? this._remoteControl(remote, stateObj.entity_id) : element}
    `;
  }

  /** On/off button under the fan speed slider (`more-info-fan.ts`). */
  private _fanPowerButton(stateObj: HassEntity) {
    const toggle = () =>
      this.hass!.callService(
        "fan",
        stateObj.state === "on" ? "turn_off" : "turn_on",
        { entity_id: stateObj.entity_id },
      );
    return html`
      <div class="buttons">
        <ha-outlined-icon-button
          .disabled=${stateObj.state === "unavailable"}
          @click=${toggle}
        >
          <ha-svg-icon .path=${mdiPower}></ha-svg-icon>
        </ha-outlined-icon-button>
      </div>
    `;
  }

  /** Same content as `more-info-script.ts`, below the state header. */
  private _script(stateObj: HassEntity) {
    const hass = this.hass!;
    const objectId = computeObjectId(stateObj.entity_id);
    const script = hass.services?.script?.[objectId];
    const fields = script?.fields ?? {};
    const hasFields = Object.keys(fields).length > 0;
    const current: number = stateObj.attributes.current || 0;
    const mode = stateObj.attributes.mode;
    const isQueued = mode === "queued";
    const isParallel = mode === "parallel";
    const hasQueue = isQueued && current > 1;
    const data = this._scriptData.data;
    const requiredFilled = Object.entries(fields).every(
      ([key, field]) => !field.required || data?.[key] !== undefined,
    );
    const hasRequired = Object.values(fields).some((field) => field.required);
    const canRun =
      !hasRequired ||
      (requiredFilled && scriptCanRun(stateObj)) ||
      mode === "restart";

    const run = (ev: Event) => {
      ev.stopPropagation();
      hass.callService("script", objectId, this._scriptData.data);
    };
    const cancel = (ev: Event) => {
      ev.stopPropagation();
      hass.callService("script", "turn_off", {
        entity_id: stateObj.entity_id,
      });
    };
    const fieldsChanged = (ev: CustomEvent<{ value: object }>) => {
      this._scriptData = { ...this._scriptData, ...ev.detail.value };
    };

    return html`
      <div class="script">
        ${
          script?.description
            ? html`<ha-markdown
                breaks
                .content=${script.description}
              ></ha-markdown>`
            : nothing
        }
        <div class="queue ${hasQueue ? "has-queue" : ""}">
          ${
            hasQueue
              ? hass.localize("ui.card.script.running_queued", {
                  queued: current - 1,
                })
              : ""
          }
        </div>
        ${
          hasFields
            ? html`
                <div class="fields">
                  <div class="title">
                    ${hass.localize("ui.card.script.run_script")}
                  </div>
                  <ha-service-control
                    hide-picker
                    hide-description
                    .hass=${hass}
                    .value=${this._scriptData}
                    .narrow=${window.matchMedia("(max-width: 870px)").matches}
                    @value-changed=${fieldsChanged}
                  ></ha-service-control>
                </div>
              `
            : nothing
        }
        <ha-control-button-group>
          <ha-control-button
            class="cancel-button"
            .disabled=${!current}
            @click=${cancel}
          >
            <ha-svg-icon .path=${mdiStop}></ha-svg-icon>
            ${
              (isQueued || isParallel) && current > 1
                ? hass.localize("ui.card.script.cancel_all")
                : hass.localize("ui.card.script.cancel")
            }
          </ha-control-button>
          <ha-control-button
            class="run-button"
            .disabled=${stateObj.state === "unavailable" || !canRun}
            @click=${run}
          >
            <ha-svg-icon .path=${mdiPlay}></ha-svg-icon>
            ${this._config!.state_override || hass.localize("ui.card.script.run")}
          </ha-control-button>
        </ha-control-button-group>
      </div>
    `;
  }

  /** `button.press` / `input_button.press`, styled like the script buttons. */
  private _press(stateObj: HassEntity) {
    const domain = computeDomain(stateObj.entity_id);
    const press = (ev: Event) => {
      ev.stopPropagation();
      this.hass!.callService(
        domain === "input_button" ? domain : "button",
        "press",
        {
          entity_id: stateObj.entity_id,
        },
      );
    };
    return html`
      <ha-control-button-group class="press">
        <ha-control-button
          .disabled=${stateObj.state === "unavailable"}
          @click=${press}
        >
          <ha-svg-icon .path=${mdiGestureTapButton}></ha-svg-icon>
          ${
            this._config!.state_override ||
            this.hass!.localize("ui.card.button.press")
          }
        </ha-control-button>
      </ha-control-button-group>
    `;
  }

  private _header(stateObj: HassEntity) {
    const config = this._config!;
    if (!this._showState) return nothing;
    const override =
      config.state_override || autoStateOverride(this.hass!, stateObj);
    if (config.show_last_changed === false) {
      return html`<p class="state">
        ${override ?? this.hass!.formatEntityState(stateObj)}
      </p>`;
    }
    return html`
      <ha-more-info-state-header
        .hass=${this.hass}
        .stateObj=${stateObj}
        .stateOverride=${override}
        .changedOverride=${
          ["script", "automation"].includes(computeDomain(stateObj.entity_id))
            ? stateObj.attributes.last_triggered || 0
            : undefined
        }
      >
        ${this._battery(stateObj)}
      </ha-more-info-state-header>
    `;
  }

  protected override render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this._stateObj;
    const appearance = this._config.appearance ?? "plain";
    if (!stateObj) {
      return html`<ha-card class=${appearance}>
        <ha-alert alert-type="warning">
          ${this.hass.localize("ui.panel.lovelace.warning.entity_not_found", {
            entity: this._config.entity,
          })}
        </ha-alert>
      </ha-card>`;
    }
    return html`
      <ha-card
        class=${appearance}
        .label=${computeStateName(stateObj)}
        style=${styleMap(
          stateColorVars(stateObj, this._config.color, this._config.color_off),
        )}
      >
        ${
          this._ready
            ? html`
                ${this._header(stateObj)}
                <div
                  class="controls ${this._controlName === "more_info" ? "more-info" : ""}"
                >
                  ${this._control(stateObj)}
                </div>
                ${this._afterControls(stateObj)}
              `
            : nothing
        }
      </ha-card>
    `;
  }

  static override styles = [
    cardAppearanceStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: var(--popup-min-height, auto);
      }
      ha-card {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      /* Spacing between the main control and the next block in more-info. */
      ha-card.plain {
        padding-bottom: var(--ha-space-4);
      }
      ha-card.card {
        padding: var(--ha-space-6) var(--ha-space-4);
      }
      /* more-info-control-style.ts */
      .controls {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
      }
      /* The native content lays itself out (more-info-content). */
      .controls.more-info {
        align-items: stretch;
        justify-content: flex-start;
      }
      more-info-content {
        position: relative;
        display: flex;
        flex-direction: column;
      }
      more-info-content[full-height] {
        flex: 1;
      }
      /* ha-more-info-info.ts */
      .controls.more-info > state-card-content {
        display: block;
        margin-bottom: var(--ha-space-4);
      }
      .controls > *:not(:last-child) {
        margin-bottom: var(--ha-space-6);
      }
      .controls:not(:last-child) {
        margin-bottom: var(--ha-space-6);
      }
      /* more-info-cover.ts / more-info-valve.ts */
      .main-control {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .main-control > * {
        margin: 0 var(--ha-space-2);
      }
      /* more-info-lock.ts */
      .open-button,
      ha-control-button-group.jammed ha-control-button {
        font-size: var(--ha-font-size-m);
        height: 60px;
        --control-button-border-radius: var(--ha-border-radius-3xl);
      }
      .open-button {
        width: 130px;
        --control-button-background-color: var(--state-color);
      }
      .open-button.confirm {
        --control-button-background-color: var(--warning-color);
      }
      .open-done {
        line-height: 60px;
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: var(--ha-space-2);
        font-weight: var(--ha-font-weight-medium);
        color: var(--success-color);
        margin: 0;
      }
      ha-control-button-group.jammed {
        --control-button-group-thickness: 60px;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
      }
      /* Jammed lock / triggered alarm (more-info-lock, -alarm_control_panel) */
      @keyframes pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      .status {
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      .status.lock {
        justify-content: center;
        height: 45vh;
        max-height: 320px;
        min-height: 200px;
      }
      .status .icon {
        position: relative;
        --mdc-icon-size: 80px;
        animation: pulse 1s infinite;
        color: var(--state-color);
        border-radius: var(--ha-border-radius-circle);
        width: 144px;
        height: 144px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .status .icon::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: var(--ha-border-radius-circle);
        background-color: var(--state-color);
        transition: background-color 180ms ease-in-out;
        opacity: 0.2;
      }
      ha-control-button.disarm {
        height: 60px;
        min-width: 130px;
        max-width: 200px;
        margin: 0 auto;
        --control-button-border-radius: var(--ha-border-radius-3xl);
      }
      /* more-info-vacuum.ts / more-info-lawn_mower.ts */
      .battery {
        display: inline-flex;
        align-items: center;
        gap: var(--ha-space-1);
        font-size: var(--ha-font-size-m);
        color: var(--secondary-text-color);
        --mdc-icon-size: 18px;
      }
      .battery span {
        height: var(--mdc-icon-size);
        line-height: var(--mdc-icon-size);
      }
      ha-control-button-group.commands {
        --control-button-group-thickness: 48px;
        justify-content: center;
      }
      ha-control-button-group.commands ha-control-button {
        flex: 0 0 auto;
        width: var(--control-button-group-thickness);
        --control-button-border-radius: var(--ha-border-radius-lg);
      }
      .commands ha-control-button ha-svg-icon {
        z-index: auto;
        margin-right: 0;
      }
      .clean-areas-button {
        --mdc-icon-size: 20px;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        width: auto;
        max-width: 100%;
        height: 48px;
        padding: 6px 10px;
        border: none;
        border-radius: var(--ha-border-radius-lg);
        background: none;
        color: var(--primary-text-color);
        font-family: inherit;
        font-size: var(--ha-font-size-m);
        font-weight: var(--ha-font-weight-normal);
        line-height: 1.4;
        letter-spacing: 0.25px;
        text-align: left;
        cursor: pointer;
        overflow: hidden;
        box-sizing: border-box;
        -webkit-tap-highlight-color: transparent;
        z-index: 0;
        transition: box-shadow 180ms ease-in-out;
      }
      .clean-areas-button::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--disabled-color);
        opacity: 0.2;
        transition:
          background-color 180ms ease-in-out,
          opacity 180ms ease-in-out;
      }
      .clean-areas-button:hover::before {
        background-color: var(--ha-color-on-neutral-quiet);
      }
      .clean-areas-button:focus-visible {
        outline: none;
        box-shadow: 0 0 0 2px var(--secondary-text-color);
      }
      .clean-areas-button[disabled] {
        cursor: not-allowed;
        color: var(--disabled-color);
      }
      .clean-areas-button .icon {
        display: flex;
        --mdc-icon-size: 20px;
      }
      .clean-areas-button .content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        flex: 1;
        min-width: 0;
        overflow: hidden;
      }
      .clean-areas-button .content p {
        margin: 0;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .clean-areas-button .label {
        font-size: var(--ha-font-size-s);
        letter-spacing: 0.4px;
      }
      .clean-areas-button .value {
        font-size: var(--ha-font-size-m);
      }
      /* ha-more-info-state-header .state */
      /* more-info-control-style.ts .buttons (fan power button) */
      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--ha-space-3);
      }
      .buttons > * {
        margin: var(--ha-space-2);
      }
      /* more-info-light.ts */
      .wheel {
        width: 28px;
        height: 28px;
        flex: none;
        border-radius: var(--ha-border-radius-circle);
      }
      .wheel.color {
        background-image: url("/static/images/color_wheel.png");
        background-size: cover;
      }
      .wheel.color-temp {
        background: linear-gradient(
          0,
          rgb(166, 209, 255) 0%,
          white 50%,
          rgb(255, 160, 0) 100%
        );
      }
      *[disabled] .wheel {
        filter: grayscale(1) opacity(0.5);
      }
      /* The media player draws its own full-width layout. */
      more-info-media_player {
        align-self: stretch;
      }
      /* Now playing / Remote switch of a media player with a remote. */
      .controls > .remote-views {
        align-self: stretch;
        display: flex;
        gap: 2px;
        padding: 3px;
        margin-bottom: var(--ha-space-4);
        border-radius: var(--ha-border-radius-pill, 9999px);
        position: relative;
        isolation: isolate;
      }
      .remote-views::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;
        background: var(--disabled-color);
        opacity: 0.2;
      }
      .remote-views button {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--ha-space-2);
        height: 36px;
        padding: 0 var(--ha-space-3);
        border: none;
        border-radius: inherit;
        background: none;
        color: var(--secondary-text-color);
        font: inherit;
        font-size: var(--ha-font-size-m, 14px);
        font-weight: var(--ha-font-weight-medium, 500);
        cursor: pointer;
        outline: none;
        --mdc-icon-size: 18px;
        transition:
          background-color 180ms ease-in-out,
          color 180ms ease-in-out;
      }
      .remote-views button.selected {
        background: var(
          --card-background-color,
          var(--ha-color-surface-default)
        );
        color: var(--primary-text-color);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
      }
      .remote-views button:focus-visible {
        box-shadow: 0 0 0 2px var(--primary-color);
      }
      /* more-info-script.ts */
      .script {
        align-self: stretch;
        display: flex;
        flex-direction: column;
      }
      .script .queue {
        visibility: hidden;
        color: var(--secondary-text-color);
        text-align: center;
        margin-bottom: var(--ha-space-4);
        height: 21px;
      }
      .script .queue.has-queue {
        visibility: visible;
      }
      .script .fields {
        padding: var(--ha-space-4);
        border: 1px solid var(--divider-color);
        border-radius: var(--ha-border-radius-md);
        margin-bottom: var(--ha-space-4);
      }
      .script .fields .title {
        font-weight: var(--ha-font-weight-bold);
      }
      ha-control-button ha-svg-icon {
        z-index: -1;
        margin-right: var(--ha-space-1);
      }
      ha-control-button-group.press {
        align-self: stretch;
      }
      ha-service-control {
        --service-control-padding: 0;
        --service-control-items-border-top: none;
      }
      .script ha-markdown {
        text-align: center;
        padding: 0 var(--ha-space-4);
      }
      p.state {
        text-align: center;
        margin: 0 0 var(--ha-space-5);
        font-weight: var(--ha-font-weight-normal);
        font-size: 36px;
        line-height: var(--ha-line-height-condensed);
      }
    `,
  ];
}

if (!customElements.get(STATE_CARD_TYPE)) {
  customElements.define(STATE_CARD_TYPE, MoreInfoStateCard);
}
