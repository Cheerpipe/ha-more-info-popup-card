/**
 * Native `ha-form` schemas of the control card editors (`editors.ts`). The
 * controls list uses HA's `object` selector with `multiple`, which gives the
 * native reorderable list with an edit form per item.
 */
import { localize, type TranslationKey } from "../localize/localize";
import { ATTRIBUTE_SELECTS } from "./attributes";
import { computeStateName } from "../ha/entity";
import type { HomeAssistant } from "../ha/types";
import { remoteChoices } from "./remote-profiles";
import { STATE_CONTROLS } from "./state-controls";

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

export const stateCardForm = () => ({
  schema: (hass: HomeAssistant | undefined) => [
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
    APPEARANCE,
  ],
  computeLabel,
  computeHelper: (schema: { name: string }) =>
    localize(lang(), `controls.${schema.name}_helper` as TranslationKey) ||
    undefined,
});

const field = (key: string, selector: unknown, required = false) => ({
  label: label(key),
  description:
    localize(lang(), `controls.${key}_helper` as TranslationKey) || undefined,
  required,
  selector,
});

export const controlsCardForm = () => ({
  schema: [
    {
      name: "controls",
      selector: {
        object: {
          multiple: true,
          label_field: "entity",
          description_field: "attribute",
          fields: {
            type: field(
              "type",
              select(
                ["select", "toggle", "number", "action", "button"],
                "controls.type",
              ),
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
          },
        },
      },
    },
    {
      name: "",
      type: "grid",
      schema: [APPEARANCE, { name: "wrap", selector: { boolean: {} } }],
    },
  ],
  computeLabel,
  computeHelper: (schema: { name: string }) =>
    localize(lang(), `controls.${schema.name}_helper` as TranslationKey) ||
    undefined,
  /** Renamed options ({value, name, icon}) are YAML only. */
  assertConfig: (config: { controls?: { options?: unknown[] }[] }) => {
    if (
      config.controls?.some((item) =>
        item.options?.some((option) => typeof option !== "string"),
      )
    ) {
      throw new Error("Options with names or icons can only be edited in YAML");
    }
  },
});
