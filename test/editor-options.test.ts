import { describe, expect, it } from "vitest";
import {
  controlItemFields,
  filterSchema,
  stateCardOptions,
} from "../src/controls/forms";
import type { HomeAssistant } from "../src/ha/types";

const hass = (
  states: Record<string, [string, Record<string, unknown>?]>,
  entities: Record<string, { device_id?: string; platform?: string }> = {},
) =>
  ({
    states: Object.fromEntries(
      Object.entries(states).map(([id, [state, attributes]]) => [
        id,
        { entity_id: id, state, attributes: attributes ?? {} },
      ]),
    ),
    entities: Object.fromEntries(
      Object.entries(entities).map(([id, entry]) => [
        id,
        { entity_id: id, ...entry },
      ]),
    ),
  }) as unknown as HomeAssistant;

const h = hass(
  {
    "switch.a": ["on"],
    "light.dim": ["on", { supported_color_modes: ["brightness"] }],
    "climate.a": ["heat"],
    "script.a": ["off"],
    "button.a": ["unknown"],
    "media_player.tv": ["playing"],
    "media_player.atv": ["playing"],
    "remote.atv": ["on"],
  },
  {
    "media_player.atv": { device_id: "d", platform: "apple_tv" },
    "remote.atv": { device_id: "d", platform: "apple_tv" },
  },
);

const options = (config: Record<string, unknown>) =>
  [...(stateCardOptions(config, h) ?? [])].sort();

describe("stateCardOptions", () => {
  it("a switch: toggle icons and colors, no remote or push options", () => {
    expect(options({ entity: "switch.a" })).toEqual(
      [
        "appearance",
        "color",
        "color_off",
        "control",
        "entity",
        "icon",
        "icon_off",
        "show_last_changed",
        "show_state",
        "state_override",
      ].sort(),
    );
  });

  it("a thermostat: no icon, header hidden by default", () => {
    const shown = options({ entity: "climate.a" });
    expect(shown).not.toContain("icon");
    expect(shown).not.toContain("show_last_changed");
    expect(shown).toContain("color");
    expect(options({ entity: "climate.a", show_state: true })).toContain(
      "show_last_changed",
    );
  });

  it("a script: Cancel for trigger and push, shape only for push", () => {
    expect(options({ entity: "script.a" })).toContain("show_cancel");
    expect(options({ entity: "script.a" })).not.toContain("button_layout");
    expect(options({ entity: "script.a", control: "push" })).toContain(
      "button_layout",
    );
    expect(options({ entity: "button.a" })).not.toContain("show_cancel");
  });

  it("a media player without remote: only the remote picker", () => {
    const shown = options({ entity: "media_player.tv" });
    expect(shown).toContain("remote");
    expect(shown).not.toContain("remote_view");
    expect(shown).not.toContain("seek_color");
    expect(shown).not.toContain("icon");
    expect(shown).not.toContain("color");
  });

  it("an Apple TV, or a media player pointed at one: every remote option", () => {
    for (const config of [
      { entity: "media_player.atv" },
      { entity: "media_player.tv", remote: "media_player.atv" },
    ]) {
      expect(options(config)).toEqual(
        expect.arrayContaining([
          "remote",
          "remote_view",
          "audio_entity",
          "haptics",
          "seek_color",
        ]),
      );
    }
    expect(
      options({ entity: "media_player.atv", remote: "none" }),
    ).not.toContain("seek_color");
  });

  it("control: remote on the remote entity: remote options, no picker", () => {
    const shown = options({ entity: "remote.atv", control: "remote" });
    expect(shown).toContain("haptics");
    expect(shown).not.toContain("remote");
    expect(shown).not.toContain("remote_view");
  });

  it("shows everything while the entity is unknown", () => {
    expect(stateCardOptions({ entity: "sensor.missing" }, h)).toBeUndefined();
    expect(stateCardOptions({}, h)).toBeUndefined();
  });
});

describe("filterSchema", () => {
  it("drops hidden fields and empty grids", () => {
    const schema = [
      { name: "a" },
      { name: "", type: "grid", schema: [{ name: "b" }, { name: "c" }] },
      { name: "", type: "grid", schema: [{ name: "d" }] },
    ];
    expect(filterSchema(schema, new Set(["a", "c"]))).toEqual([
      { name: "a" },
      { name: "", type: "grid", schema: [{ name: "c" }] },
    ]);
    expect(filterSchema(schema, undefined)).toBe(schema);
  });
});

describe("controlItemFields", () => {
  const common = ["type", "entity", "name", "icon", "color", "visibility"];

  it.each([
    [{ entity: "select.a" }, ["attribute", "options", "perform_action"]],
    [{ entity: "switch.a" }, ["perform_action"]],
    [
      { entity: "number.a" },
      ["attribute", "min", "max", "step", "perform_action"],
    ],
    [{ type: "action" as const }, ["value", "tap_action", "show_arrow"]],
    [{ type: "button" as const }, ["tap_action", "perform_action"]],
  ])("%o", (item, own) => {
    expect(controlItemFields(item).sort()).toEqual([...common, ...own].sort());
  });

  it("asks for the value field only with a custom action", () => {
    expect(
      controlItemFields({
        entity: "select.a",
        perform_action: "script.turn_on",
      }),
    ).toContain("data_key");
    expect(
      controlItemFields({ entity: "switch.a", perform_action: "x.y" }),
    ).not.toContain("data_key");
  });
});
