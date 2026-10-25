import { describe, expect, it } from "vitest";
import {
  CONTROLS_CARD_DEFAULTS,
  STATE_CARD_DEFAULTS,
} from "../src/controls/editor-defaults";
import type { HassEntity, HomeAssistant } from "../src/ha/types";

const hass = (states: Record<string, string>) =>
  ({
    states: Object.fromEntries(
      Object.entries(states).map(([entity_id, state]) => [
        entity_id,
        { entity_id, state, attributes: {} } as unknown as HassEntity,
      ]),
    ),
  }) as unknown as HomeAssistant;

const card = { type: "custom:more-info-state-card" };

describe("state card editor defaults", () => {
  const h = hass({ "script.a": "off", "climate.a": "heat", "sun.sun": "x" });

  it("shows the values the card uses when unset", () => {
    expect(
      STATE_CARD_DEFAULTS.fill({ ...card, entity: "script.a" }, h),
    ).toEqual({
      ...card,
      entity: "script.a",
      show_state: true,
      show_last_changed: true,
      show_cancel: true,
      remote: "auto",
      remote_view: "now_playing",
      haptics: true,
    });
  });

  it("follows the domain and the control for show_state", () => {
    const fill = (config: object) =>
      STATE_CARD_DEFAULTS.fill({ ...card, ...config } as never, h).show_state;
    expect(fill({ entity: "climate.a" })).toBe(false);
    expect(fill({ entity: "sun.sun" })).toBe(false); // more_info
    expect(fill({ entity: "sun.sun", control: "none" })).toBe(true);
  });

  it("keeps what is set", () => {
    const config = { ...card, entity: "script.a", show_cancel: false };
    expect(STATE_CARD_DEFAULTS.fill(config, h).show_cancel).toBe(false);
  });

  it("saves only the values that differ from the default", () => {
    expect(
      STATE_CARD_DEFAULTS.strip(
        {
          ...card,
          entity: "script.a",
          show_state: true,
          show_last_changed: true,
          show_cancel: false,
        },
        h,
      ),
    ).toEqual({ ...card, entity: "script.a", show_cancel: false });
  });
});

describe("controls card editor defaults", () => {
  const h = hass({ "switch.a": "on" });
  const config = {
    type: "custom:more-info-controls-card",
    controls: [
      { entity: "switch.a" },
      { type: "action" as const, tap_action: { action: "navigate" } },
      { type: "action" as const, tap_action: { action: "perform-action" } },
      { type: "action" as const, entity: "switch.a", show_arrow: false },
    ],
  };

  it("fills show_arrow per item", () => {
    expect(
      CONTROLS_CARD_DEFAULTS.fill(config, h).controls.map((i) => i.show_arrow),
    ).toEqual([true, true, false, false]);
  });

  it("round-trips without adding options", () => {
    const shown = CONTROLS_CARD_DEFAULTS.fill(config, h);
    expect(CONTROLS_CARD_DEFAULTS.strip(shown, h)).toEqual(config);
  });
});
