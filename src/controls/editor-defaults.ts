/**
 * Values the control cards use for unset options, as their visual editors
 * show them (`form-editor.ts`): filled in on display, left out on save.
 */
import type { HomeAssistant } from "../ha/types";
import { defaultShowArrow, type ControlsCardConfig } from "./items";
import type { StateCardConfig } from "./state-card";
import { defaultShowState, resolveStateControl } from "./state-controls";

export interface EditorDefaults<C> {
  /** Config as shown: options left unset get the value the card uses. */
  fill: (config: C, hass: HomeAssistant | undefined) => C;
  /** Config as saved: options equal to that value are removed. */
  strip: (config: C, hass: HomeAssistant | undefined) => C;
}

/** `config` without the options whose value equals the one in `values`. */
export const stripDefaults = <T extends object>(
  config: T,
  values: Partial<T>,
): T => {
  const result = { ...config };
  for (const [key, value] of Object.entries(values)) {
    if (result[key as keyof T] === value) delete result[key as keyof T];
  }
  return result;
};

const stateCardValues = (
  config: StateCardConfig,
  hass: HomeAssistant | undefined,
): Partial<StateCardConfig> => ({
  ...(config.entity
    ? {
        show_state: defaultShowState(
          config.entity,
          resolveStateControl(config.control, hass?.states[config.entity]),
        ),
      }
    : {}),
  show_last_changed: true,
  show_cancel: true,
  remote: "auto",
  remote_view: "now_playing",
  haptics: true,
  seek_color: "theme",
});

export const STATE_CARD_DEFAULTS: EditorDefaults<StateCardConfig> = {
  fill: (config, hass) => ({ ...stateCardValues(config, hass), ...config }),
  strip: (config, hass) => stripDefaults(config, stateCardValues(config, hass)),
};

type ControlItem = ControlsCardConfig["controls"][number];

const mapItems = (
  config: ControlsCardConfig,
  hass: HomeAssistant | undefined,
  apply: (item: ControlItem, values: Partial<ControlItem>) => ControlItem,
): ControlsCardConfig => ({
  ...config,
  controls: (config.controls ?? []).map((item) =>
    apply(item, {
      show_arrow: defaultShowArrow(
        item,
        Boolean(item.entity && hass?.states[item.entity]),
      ),
    }),
  ),
});

export const CONTROLS_CARD_DEFAULTS: EditorDefaults<ControlsCardConfig> = {
  fill: (config, hass) =>
    mapItems(config, hass, (item, values) => ({ ...values, ...item })),
  strip: (config, hass) => mapItems(config, hass, stripDefaults),
};
