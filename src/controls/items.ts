/**
 * Config model of `more-info-controls-card` items (pure logic, no DOM).
 */
import { computeDomain } from "../ha/entity";
import type { ActionConfig, LovelaceCardConfig } from "../ha/types";
import { NUMBER_DOMAINS, SELECT_DOMAINS, TOGGLE_DOMAINS } from "./attributes";
import type { CardAppearance } from "./styles";
import type { VisibilityCondition } from "../ha/visibility";

export type ControlType = "select" | "toggle" | "number" | "action" | "button";

export interface ControlOption {
  value: string;
  name?: string;
  icon?: string;
}

export interface ControlItemConfig {
  type?: ControlType;
  entity?: string;
  /** For `select`: attribute with options (effect, preset_mode, …). */
  attribute?: string;
  name?: string;
  icon?: string;
  /** Icon color (`ui_color` or CSS); for a toggle, only while it is on. */
  color?: string;
  /** For `select`: filter / order / rename / re-icon options. */
  options?: (string | ControlOption)[];
  /** Override the service of a `select` or `number`: "domain.service". */
  perform_action?: string;
  /** Data key that receives the chosen value (with `perform_action`). */
  data_key?: string;
  data?: Record<string, unknown>;
  /** For `number`. */
  min?: number;
  max?: number;
  step?: number;
  /** For `action`: secondary text (defaults to the entity state). */
  value?: string;
  tap_action?: ActionConfig;
  /** For `action`: show the chevron (default: for navigate / more-info). */
  show_arrow?: boolean;
  /**
   * Shown only when these conditions are met: the same list as a card's
   * `visibility` (evaluated by Home Assistant, see `ha/visibility.ts`).
   */
  visibility?: VisibilityCondition[];
}

/**
 * `show_arrow` when unset: the chevron of the navigation actions. Without
 * `tap_action`, an item with an existing entity opens its more-info.
 */
export const defaultShowArrow = (
  item: ControlItemConfig,
  hasState: boolean,
): boolean =>
  ["navigate", "more-info"].includes(
    (item.tap_action ?? { action: hasState ? "more-info" : "none" }).action,
  );

/** Default action of an icon `button` without `tap_action` / `perform_action`. */
export const BUTTON_DEFAULTS: Record<string, string> = {
  button: "button.press",
  input_button: "input_button.press",
  scene: "scene.turn_on",
  script: "script.turn_on",
};

export interface ControlsCardConfig extends LovelaceCardConfig {
  controls: ControlItemConfig[];
  appearance?: CardAppearance;
  /**
   * Wrap chips into rows on phones too. Default (false) is the native
   * behavior: a single row that scrolls horizontally on phones.
   */
  wrap?: boolean;
}

export const INACTIVE_STATES = [
  "off",
  "closed",
  "locked",
  "unavailable",
  "unknown",
  "idle",
  "standby",
  "paused",
  "docked",
];

export const NUMBER_DEBOUNCE = 600;

export const inferControlType = (item: ControlItemConfig): ControlType => {
  if (item.type) return item.type;
  if (item.attribute) return "select";
  const domain = item.entity ? computeDomain(item.entity) : "";
  if (SELECT_DOMAINS.includes(domain)) return "select";
  if (NUMBER_DOMAINS.includes(domain)) return "number";
  if (TOGGLE_DOMAINS.includes(domain)) return "toggle";
  return "action";
};

export const normalizeOptions = (
  options: (string | ControlOption)[] | undefined,
): ControlOption[] | undefined =>
  options?.map((option) =>
    typeof option === "string"
      ? { value: option }
      : { ...option, value: String(option.value) },
  );

export const splitAction = (action: string): [string, string] => {
  const [domain, service] = action.split(".", 2);
  return [domain, service];
};
