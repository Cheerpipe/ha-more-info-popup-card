/**
 * Native `ha-form` schemas of the control card editors (`editors.ts`). The
 * controls list uses HA's `object` selector with `multiple`, which gives the
 * native reorderable list with an edit form per item.
 */
import { localize, type TranslationKey } from "../localize/localize";
import { ATTRIBUTE_SELECTS } from "./attributes";
import {
  inferControlType,
  type ControlItemConfig,
  type ControlType,
} from "./items";
import { computeStateName } from "../ha/entity";
import type { HomeAssistant } from "../ha/types";
import { computeDomain } from "../ha/entity";
import { remoteChoices, resolveRemote } from "./remote-profiles";
import type { StateCardConfig } from "./state-card";
import {
  defaultShowState,
  resolveStateControl,
  STATE_CONTROLS,
  type StateControlName,
} from "./state-controls";

const lang = () => undefined;

const label = (key: string): string =>
  localize(lang(), `controls.${key}` as TranslationKey);

const select = (values: string[], prefix: string, custom = false) => ({
  select: {
    mode: "dropdown",
    custom_value: custom,
    options: values.map((value) => ({
      value,
      label: localize(lang(), `${prefix}.${value}` as TranslationKey) || value,
    })),
  },
});

const APPEARANCE = {
  name: "appearance",
  selector: select(["plain", "card"], "controls.appearance"),
};

const computeLabel = (schema: { name: string }) =>
  label(schema.name) || schema.name;

/**
 * `remote` option: automatic, none, or one of the remotes and Apple TV media
 * players (a media player stands for the remote of its device). Typing any
 * other entity id is allowed.
 */
const remoteSelector = (hass: HomeAssistant | undefined) => ({
  select: {
    mode: "dropdown",
    custom_value: true,
    options: [
      ...["auto", "none"].map((value) => ({
        value,
        label: localize(lang(), `controls.remote.${value}` as TranslationKey),
      })),
      ...(hass ? remoteChoices(hass) : []).map((entityId) => ({
        value: entityId,
        label: `${computeStateName(hass!.states[entityId]!)} (${entityId})`,
      })),
    ],
  },
});

/** Controls that take `icon` / `color` (the others draw their own icons). */
const ICON_CONTROLS: readonly (StateControlName | undefined)[] = [
  "toggle",
  "trigger",
  "push",
];
const NO_COLOR_CONTROLS: readonly (StateControlName | undefined)[] = [
  undefined,
  "media_player",
  "remote",
  "more_info",
];
const BUTTON_TEXT_CONTROLS: readonly (StateControlName | undefined)[] = [
  "trigger",
  "push",
  "press",
  "script",
];

/**
 * State card options that do something with this config: the editor hides
 * the others (an icon for a thermostat, the remote options for a light…).
 * Without the entity's state nothing can be told, so all of them show.
 */
export const stateCardOptions = (
  config: Partial<StateCardConfig>,
  hass: HomeAssistant | undefined,
): Set<string> | undefined => {
  const entity = config.entity;
  const stateObj = entity ? hass?.states[entity] : undefined;
  if (!entity || !stateObj) return undefined;
  const control = resolveStateControl(config.control, stateObj);
  const domain = computeDomain(entity);
  const showState = config.show_state ?? defaultShowState(entity, control);
  const mediaPlayer = domain === "media_player";
  const withRemote =
    control === "remote" ||
    (control === "media_player" &&
      Boolean(resolveRemote(hass, entity, config.remote)));
  const options: [string, boolean][] = [
    ["show_last_changed", showState],
    [
      "show_cancel",
      domain === "script" && (control === "trigger" || control === "push"),
    ],
    ["state_override", showState || BUTTON_TEXT_CONTROLS.includes(control)],
    ["icon", ICON_CONTROLS.includes(control)],
    ["icon_off", control === "toggle"],
    ["color", !NO_COLOR_CONTROLS.includes(control)],
    ["color_off", !NO_COLOR_CONTROLS.includes(control)],
    ["button_layout", control === "push"],
    // Shown on any media player: a universal one needs it to get a remote.
    [
      "remote",
      mediaPlayer && (control === "media_player" || control === "remote"),
    ],
    ["remote_view", control === "media_player" && withRemote],
    ["audio_entity", withRemote],
    ["haptics", withRemote],
    ["seek_color", withRemote],
  ];
  return new Set([
    "entity",
    "control",
    "show_state",
    "appearance",
    ...options.filter(([, shown]) => shown).map(([name]) => name),
  ]);
};

interface FormField {
  name: string;
  type?: string;
  schema?: FormField[];
  [key: string]: unknown;
}

/** `schema` without the fields not in `shown` (and grids left empty). */
export const filterSchema = <T extends FormField>(
  schema: T[],
  shown: Set<string> | undefined,
): T[] =>
  !shown
    ? schema
    : schema.flatMap((field) => {
        if (field.type === "grid" && field.schema) {
          const inner = filterSchema(field.schema, shown);
          return inner.length ? [{ ...field, schema: inner }] : [];
        }
        return shown.has(field.name) ? [field] : [];
      });

export const stateCardForm = () => ({
  schema: (
    hass: HomeAssistant | undefined,
    config: Partial<StateCardConfig> = {},
  ) => filterSchema(stateCardSchema(hass), stateCardOptions(config, hass)),
  computeLabel,
  computeHelper: (schema: { name: string }) =>
    localize(lang(), `controls.${schema.name}_helper` as TranslationKey) ||
    undefined,
});

const stateCardSchema = (hass: HomeAssistant | undefined): FormField[] => [
  { name: "entity", required: true, selector: { entity: {} } },
  {
    name: "control",
    selector: select(
      ["auto", "none", ...Object.keys(STATE_CONTROLS)],
      "controls.control",
    ),
  },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "show_state", selector: { boolean: {} } },
      { name: "show_last_changed", selector: { boolean: {} } },
      { name: "show_cancel", selector: { boolean: {} } },
    ],
  },
  { name: "state_override", selector: { text: {} } },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "icon", selector: { icon: {} } },
      { name: "icon_off", selector: { icon: {} } },
      { name: "color", selector: { ui_color: {} } },
      { name: "color_off", selector: { ui_color: {} } },
    ],
  },
  {
    name: "button_layout",
    selector: select(
      ["vertical", "horizontal", "square", "circle"],
      "controls.button_layout",
    ),
  },
  { name: "remote", selector: remoteSelector(hass) },
  { name: "audio_entity", selector: { entity: { domain: "media_player" } } },
  {
    name: "",
    type: "grid",
    schema: [
      {
        name: "remote_view",
        selector: select(["now_playing", "remote"], "controls.remote_view"),
      },
      { name: "haptics", selector: { boolean: {} } },
    ],
  },
  {
    name: "seek_color",
    selector: select(["theme", "art"], "controls.seek_color", true),
  },
  APPEARANCE,
];

const field = (key: string, selector: unknown, required = false) => ({
  label: label(key),
  description:
    localize(lang(), `controls.${key}_helper` as TranslationKey) || undefined,
  required,
  selector,
});

/** Every field of a controls card item, in form order. */
const CONTROL_ITEM_FIELDS = () => ({
  type: field(
    "type",
    select(["select", "toggle", "number", "action", "button"], "controls.type"),
  ),
  entity: field("entity", { entity: {} }),
  attribute: field(
    "attribute",
    select(
      ["state", ...Object.keys(ATTRIBUTE_SELECTS)],
      "controls.attribute",
      true,
    ),
  ),
  name: field("name", { text: {} }),
  icon: field("icon", { icon: {} }),
  color: field("color", { ui_color: {} }),
  options: field("options", {
    select: { multiple: true, custom_value: true, options: [] },
  }),
  value: field("value", { text: {} }),
  tap_action: field("tap_action", { ui_action: {} }),
  show_arrow: field("show_arrow", { boolean: {} }),
  perform_action: field("perform_action", { text: {} }),
  data_key: field("data_key", { text: {} }),
  min: field("min", { number: { mode: "box", step: "any" } }),
  max: field("max", { number: { mode: "box", step: "any" } }),
  step: field("step", { number: { mode: "box", step: "any" } }),
  visibility: field("visibility", { object: {} }),
});

/** Fields each item type reads (`controls-card.ts`), besides the common ones. */
const TYPE_FIELDS: Record<ControlType, readonly string[]> = {
  select: ["attribute", "options", "perform_action", "data_key"],
  toggle: ["perform_action"],
  number: ["attribute", "min", "max", "step", "perform_action", "data_key"],
  action: ["value", "tap_action", "show_arrow"],
  button: ["tap_action", "perform_action"],
};

/**
 * Fields of the item form for this item: its type's own ones. The value
 * field only matters with a custom action.
 */
export const controlItemFields = (item: ControlItemConfig): string[] => {
  const own = TYPE_FIELDS[inferControlType(item)].filter(
    (name) => name !== "data_key" || Boolean(item.perform_action),
  );
  return [
    ...Object.keys(CONTROL_ITEM_FIELDS()).filter(
      (name) =>
        ["type", "entity", "name", "icon", "color", "visibility"].includes(
          name,
        ) || own.includes(name),
    ),
  ];
};

/** `ha-form` schema of one item, with only the fields of its type. */
export const controlItemSchema = (item: ControlItemConfig) => {
  const fields = CONTROL_ITEM_FIELDS();
  return controlItemFields(item).map((name) => {
    const spec = fields[name as keyof typeof fields];
    return {
      name,
      required: spec.required,
      selector: spec.selector,
    };
  });
};

export const controlItemLabel = (name: string): string => label(name) || name;

/** Item helpers: the item's own text where the state card's would mislead. */
export const controlItemHelper = (name: string): string | undefined =>
  localize(lang(), `controls.item_${name}_helper` as TranslationKey) ||
  localize(lang(), `controls.${name}_helper` as TranslationKey) ||
  undefined;

/** Card options below the items list. */
export const controlsCardOptionsSchema = () => [
  {
    name: "",
    type: "grid",
    schema: [APPEARANCE, { name: "wrap", selector: { boolean: {} } }],
  },
];

/** Renamed options ({value, name, icon}) are YAML only. */
export const assertControlsCardConfig = (config: {
  controls?: { options?: unknown[] }[];
}) => {
  if (
    config.controls?.some((item) =>
      item.options?.some((option) => typeof option !== "string"),
    )
  ) {
    throw new Error("Options with names or icons can only be edited in YAML");
  }
};
