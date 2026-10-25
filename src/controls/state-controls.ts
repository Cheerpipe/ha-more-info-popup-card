/**
 * The big native controls of the more-info dialog (`src/state-control/*`)
 * and the rules more-info uses to pick one per entity.
 */
import { computeDomain } from "../ha/entity";
import type { HassEntity } from "../ha/types";
import type { StateCardConfig } from "./state-card";

export interface StateControlSpec {
  tag: string;
  /** Domain whose more-info control imports the element. */
  load: string;
  /** Other elements the control renders, also imported by `load`. */
  extraTags?: readonly string[];
  /**
   * Rendered by the card itself (the native more-info draws it inline, with
   * no reusable element); `tag` is then only waited for.
   */
  inline?: true;
}

/** Button bar and pickers drawn around the light control (`more-info-light`). */
export const LIGHT_TAGS = [
  "ha-icon-button-group",
  "ha-icon-button-toggle",
  "light-color-rgb-picker",
  "light-color-temp-picker",
  "ha-more-info-light-favorite-colors",
] as const;

/**
 * Elements `more-info-<domain>` draws around its state control (mode
 * switch, favorites, extra buttons…), all imported by that control. The
 * `more-info-*` tags themselves are needed for `runNativeMethod`.
 */
export const DOMAIN_TAGS: Partial<Record<string, readonly string[]>> = {
  cover: [
    "ha-icon-button-group",
    "ha-icon-button-toggle",
    "ha-state-control-cover-position",
    "ha-state-control-cover-tilt-position",
    "ha-state-control-cover-toggle",
    "ha-state-control-cover-buttons",
    "ha-more-info-cover-favorite-positions",
  ],
  valve: [
    "ha-icon-button-group",
    "ha-icon-button-toggle",
    "ha-state-control-valve-position",
    "ha-state-control-valve-toggle",
    "ha-state-control-valve-buttons",
    "ha-more-info-valve-favorite-positions",
  ],
  lock: ["ha-control-button", "ha-control-button-group", "ha-state-icon"],
  alarm_control_panel: ["ha-control-button", "ha-state-icon"],
  siren: ["ha-button", "more-info-siren"],
  vacuum: [
    "ha-control-button",
    "ha-control-button-group",
    "ha-battery-icon",
    "ha-icon-next",
    "ha-more-info-control-select-container",
    "more-info-vacuum",
  ],
  lawn_mower: [
    "ha-control-button",
    "ha-control-button-group",
    "ha-battery-icon",
  ],
};

export const STATE_CONTROLS = {
  toggle: { tag: "ha-state-control-toggle", load: "switch" },
  brightness: {
    tag: "ha-state-control-light-brightness",
    load: "light",
    extraTags: LIGHT_TAGS,
  },
  fan_speed: {
    tag: "ha-state-control-fan-speed",
    load: "fan",
    extraTags: ["ha-outlined-icon-button"],
  },
  position: { tag: "ha-state-control-cover-position", load: "cover" },
  tilt: { tag: "ha-state-control-cover-tilt-position", load: "cover" },
  cover_toggle: { tag: "ha-state-control-cover-toggle", load: "cover" },
  cover_buttons: { tag: "ha-state-control-cover-buttons", load: "cover" },
  valve_position: { tag: "ha-state-control-valve-position", load: "valve" },
  valve_toggle: { tag: "ha-state-control-valve-toggle", load: "valve" },
  valve_buttons: { tag: "ha-state-control-valve-buttons", load: "valve" },
  lock: { tag: "ha-state-control-lock-toggle", load: "lock" },
  alarm_modes: {
    tag: "ha-state-control-alarm_control_panel-modes",
    load: "alarm_control_panel",
  },
  temperature: { tag: "ha-state-control-climate-temperature", load: "climate" },
  climate_humidity: {
    tag: "ha-state-control-climate-humidity",
    load: "climate",
  },
  humidity: { tag: "ha-state-control-humidifier-humidity", load: "humidifier" },
  water_heater: {
    tag: "ha-state-control-water_heater-temperature",
    load: "water_heater",
  },
  vacuum_status: { tag: "ha-state-control-vacuum-status", load: "vacuum" },
  lawn_mower_status: {
    tag: "ha-state-control-lawn_mower-status",
    load: "lawn_mower",
  },
  /** The whole native media player content (cover, transport, volume…). */
  media_player: { tag: "more-info-media_player", load: "media_player" },
  /**
   * Clickpad and buttons of the device remote (`remote-control.ts`), for a
   * `remote.*` entity or a media player with one on its device.
   */
  remote: {
    tag: "more-info-popup-remote-control",
    load: "media_player",
    extraTags: ["ha-state-icon"],
    inline: true,
  },
  /** Run / cancel buttons, queue, description and fields (`more-info-script`). */
  script: {
    tag: "ha-control-button-group",
    load: "script",
    extraTags: ["ha-control-button", "ha-markdown", "ha-service-control"],
    inline: true,
  },
  /**
   * The native more-info content of the entity (`more-info-content`, which
   * picks `more-info-<domain>`), under the old-style state row where
   * more-info shows one. `load` is the entity's domain.
   */
  more_info: {
    tag: "more-info-content",
    load: "",
    extraTags: ["state-card-content"],
  },
  /** Big "Press" button (buttons have no native more-info control). */
  press: {
    tag: "ha-control-button-group",
    load: "script",
    extraTags: ["ha-control-button"],
    inline: true,
  },
  /**
   * Momentary switch for one-shot entities (scripts, buttons, automations),
   * drawn by the card in the look of the toggle (`trigger-control.ts`).
   */
  trigger: {
    tag: "ha-control-button-group",
    load: "script",
    extraTags: ["ha-control-button", "ha-markdown", "ha-service-control"],
    inline: true,
  },
  /** Same, as one big stateless push button (`variant: "button"`). */
  push: {
    tag: "ha-control-button-group",
    load: "script",
    extraTags: ["ha-control-button", "ha-markdown", "ha-service-control"],
    inline: true,
  },
} as const satisfies Record<string, StateControlSpec>;

export type StateControlName = keyof typeof STATE_CONTROLS;

/** `DOMAINS_WITH_NEW_MORE_INFO` (`src/dialogs/more-info/const.ts`). */
const DOMAINS_WITH_NEW_MORE_INFO = [
  "alarm_control_panel",
  "cover",
  "climate",
  "conversation",
  "fan",
  "humidifier",
  "input_boolean",
  "lawn_mower",
  "light",
  "lock",
  "siren",
  "script",
  "switch",
  "timer",
  "vacuum",
  "valve",
  "water_heater",
  "weather",
  "media_player",
];

/** `DOMAINS_NO_INFO`: no state row above the content. */
const DOMAINS_NO_INFO = ["camera", "configurator"];

/**
 * Domains whose more-info is a view of its own (or only the state row) and
 * no reusable control: shown with `more_info`.
 */
const NATIVE_MORE_INFO_DOMAINS = [
  "camera",
  "conversation",
  "counter",
  "date",
  "datetime",
  "group",
  "image",
  "input_datetime",
  "input_number",
  "input_select",
  "input_text",
  "number",
  "person",
  "remote",
  "scene",
  "select",
  "sun",
  "text",
  "time",
  "timer",
  "update",
  "weather",
];

/** `computeShowNewMoreInfo` (`src/dialogs/more-info/const.ts`). */
const showsNewMoreInfo = (stateObj: HassEntity): boolean => {
  const domain = computeDomain(stateObj.entity_id);
  if (domain === "group") {
    const domains = new Set(
      ((stateObj.attributes.entity_id as string[] | undefined) ?? []).map(
        computeDomain,
      ),
    );
    const [groupDomain] = domains;
    return (
      domains.size === 1 &&
      groupDomain !== "group" &&
      DOMAINS_WITH_NEW_MORE_INFO.includes(groupDomain!)
    );
  }
  return DOMAINS_WITH_NEW_MORE_INFO.includes(domain);
};

/** more-info shows `state-card-content` above the content (`ha-more-info-info`). */
export const showsStateRow = (stateObj: HassEntity): boolean =>
  !showsNewMoreInfo(stateObj) &&
  !DOMAINS_NO_INFO.includes(computeDomain(stateObj.entity_id));

/** `src/data/light.ts`. */
const COLOR_MODES = ["hs", "xy", "rgb", "rgbw", "rgbww"];
const BRIGHTNESS_MODES = [...COLOR_MODES, "color_temp", "brightness", "white"];

const lightSupportsMode = (stateObj: HassEntity, modes: string[]) =>
  (stateObj.attributes.supported_color_modes as string[] | undefined)?.some(
    (mode) => modes.includes(mode),
  ) ?? false;

export const lightSupportsBrightness = (stateObj: HassEntity) =>
  lightSupportsMode(stateObj, BRIGHTNESS_MODES);
export const lightSupportsColor = (stateObj: HassEntity) =>
  lightSupportsMode(stateObj, COLOR_MODES);
export const lightSupportsColorTemp = (stateObj: HassEntity) =>
  lightSupportsMode(stateObj, ["color_temp"]);
export const lightSupportsWhite = (stateObj: HassEntity) =>
  lightSupportsMode(stateObj, ["white"]);

export const supports = (stateObj: HassEntity, feature: number) =>
  ((stateObj.attributes.supported_features ?? 0) & feature) !== 0;

const openCloseOnly = (stateObj: HassEntity, others: number) =>
  ((stateObj.attributes.supported_features ?? 0) & 3) === 3 &&
  !supports(stateObj, others);

/** Same choice as the native more-info controls (`more-info-<domain>.ts`). */
export const autoStateControl = (
  stateObj: HassEntity,
): StateControlName | undefined => {
  const domain = computeDomain(stateObj.entity_id);
  switch (domain) {
    case "light":
      return lightSupportsBrightness(stateObj) ? "brightness" : "toggle";
    case "switch":
    case "input_boolean":
    case "siren":
      return "toggle";
    case "fan":
      return supports(stateObj, 1) ? "fan_speed" : "toggle";
    // Button mode of more-info: open + close without stop (nor tilt) is a
    // toggle, anything else the buttons.
    case "cover":
      if (supports(stateObj, 4)) return "position";
      if (supports(stateObj, 128)) return "tilt";
      return openCloseOnly(stateObj, 8 | 16 | 32 | 64)
        ? "cover_toggle"
        : "cover_buttons";
    case "valve":
      if (supports(stateObj, 4)) return "valve_position";
      return openCloseOnly(stateObj, 8) ? "valve_toggle" : "valve_buttons";
    case "lock":
      return "lock";
    case "alarm_control_panel":
      return "alarm_modes";
    case "climate":
      return "temperature";
    case "humidifier":
      return "humidity";
    case "water_heater":
      return "water_heater";
    case "vacuum":
      return "vacuum_status";
    case "lawn_mower":
      return "lawn_mower_status";
    case "media_player":
      return "media_player";
    case "script":
    case "button":
    case "input_button":
    case "automation":
      return "trigger";
    default:
      return NATIVE_MORE_INFO_DOMAINS.includes(domain)
        ? "more_info"
        : undefined;
  }
};

/** Domains whose native more-info has no state header (they show their own). */
export const DOMAINS_WITHOUT_STATE_HEADER = [
  "climate",
  "humidifier",
  "water_heater",
  "media_player",
];

/** Control a state card shows for its `control` option (`auto` included). */
export const resolveStateControl = (
  control: string | undefined,
  stateObj: HassEntity | undefined,
): StateControlName | undefined => {
  const name = control ?? "auto";
  if (name === "none") return undefined;
  if (name !== "auto") return name as StateControlName;
  return stateObj ? autoStateControl(stateObj) : undefined;
};

/** `show_state` when unset: the state header where more-info has one. */
export const defaultShowState = (
  entityId: string,
  control: StateControlName | undefined,
): boolean =>
  !DOMAINS_WITHOUT_STATE_HEADER.includes(computeDomain(entityId)) &&
  control !== "more_info" &&
  control !== "remote";

/** State card options that change what it loads and mounts. */
const STATE_CARD_MOUNT_KEYS = [
  "entity",
  "control",
  "remote",
  "remote_view",
  "show_state",
  "show_last_changed",
] as const;

/**
 * Whether a new config needs the state card to reload and remount its control.
 * Other options (state text, colors, layout) redraw in place, so templated
 * configs that resend them on every state change keep the mounted control.
 */
export const remountsStateCard = (
  prev:
    Pick<StateCardConfig, (typeof STATE_CARD_MOUNT_KEYS)[number]> | undefined,
  next: Pick<StateCardConfig, (typeof STATE_CARD_MOUNT_KEYS)[number]>,
): boolean =>
  !prev || STATE_CARD_MOUNT_KEYS.some((key) => prev[key] !== next[key]);
