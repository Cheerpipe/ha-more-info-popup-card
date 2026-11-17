import { describe, expect, it } from "vitest";
import { stateCardLoads } from "../src/controls/state-controls";
import type { HassEntity } from "../src/ha/types";

const entity = (entity_id: string, state = "off") =>
  ({ entity_id, state, attributes: {} }) as unknown as HassEntity;

describe("stateCardLoads", () => {
  it("loads the control and the state header of a switch", () => {
    expect(
      stateCardLoads(
        { entity: "switch.a", control: "toggle" },
        entity("switch.a"),
      ),
    ).toEqual([
      ["switch", ["ha-state-control-toggle"]],
      ["switch", ["ha-more-info-state-header"]],
    ]);
  });

  it("adds the parts the domain's more-info draws around the control", () => {
    const loads = stateCardLoads(
      { entity: "cover.a", control: "toggle" },
      entity("cover.a"),
    );
    expect(loads.map(([domain]) => domain)).toEqual([
      "switch",
      "cover",
      "switch",
    ]);
  });

  it("skips the header when the state or last changed is hidden", () => {
    expect(
      stateCardLoads(
        { entity: "switch.a", control: "toggle", show_last_changed: false },
        entity("switch.a"),
      ),
    ).toEqual([["switch", ["ha-state-control-toggle"]]]);
    expect(
      stateCardLoads({ entity: "climate.a", control: "none" }, undefined),
    ).toEqual([]);
  });
});
