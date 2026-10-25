import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { reuseEqualConditions, VisibilityWatcher } from "../src/ha/visibility";
import type { HomeAssistant } from "../src/ha/types";

/**
 * Stand-in for HA's `hui-conditional-card`: visible while `light.a` is on,
 * like a `state` condition, and fires `card-visibility-changed` on flips.
 */
class FakeConditionalCard extends HTMLElement {
  public config?: { conditions: unknown[]; card: { type: string } };

  public updateComplete = Promise.resolve(true);

  public set hass(hass: HomeAssistant) {
    const visible = hass.states["light.a"]?.state === "on";
    if (this.hidden === !visible) return;
    this.hidden = !visible;
    this.dispatchEvent(
      new CustomEvent("card-visibility-changed", {
        detail: { value: visible },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

const hass = (state: string) =>
  ({
    states: { "light.a": { entity_id: "light.a", state, attributes: {} } },
  }) as unknown as HomeAssistant;

const flush = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("VisibilityWatcher", () => {
  const created: FakeConditionalCard[] = [];

  beforeAll(() => {
    customElements.define("hui-conditional-card", FakeConditionalCard);
  });

  afterEach(() => {
    created.length = 0;
    delete window.loadCardHelpers;
  });

  const withHelpers = () => {
    window.loadCardHelpers = async () => ({
      createCardElement: (config) => {
        const card = document.createElement(
          "hui-conditional-card",
        ) as FakeConditionalCard;
        card.config = config as unknown as FakeConditionalCard["config"];
        created.push(card);
        return card;
      },
    });
  };

  it("follows the conditional card evaluated by Home Assistant", async () => {
    withHelpers();
    const container = document.createElement("div");
    document.body.appendChild(container);
    const onChange = vi.fn();
    const conditions = [{ condition: "state", entity: "light.a", state: "on" }];
    const watcher = new VisibilityWatcher(conditions, container, onChange);
    watcher.hass = hass("off");
    await flush();
    expect(created[0]!.config).toMatchObject({
      type: "conditional",
      conditions,
      card: { type: "custom:more-info-popup-visibility-probe" },
    });
    expect(container.contains(created[0]!)).toBe(true);
    expect(watcher.visible).toBe(false);
    watcher.hass = hass("on");
    expect(watcher.visible).toBe(true);
    expect(onChange.mock.calls.map(([visible]) => visible)).toEqual([
      false,
      true,
    ]);
    watcher.stop();
    expect(container.contains(created[0]!)).toBe(false);
  });

  it("keeps the event from reaching the card that holds the item", async () => {
    withHelpers();
    const container = document.createElement("div");
    const outer = vi.fn();
    container.addEventListener("card-visibility-changed", outer);
    document.body.appendChild(container);
    const watcher = new VisibilityWatcher([{}], container, () => undefined);
    watcher.hass = hass("on");
    await flush();
    watcher.hass = hass("off");
    expect(outer).not.toHaveBeenCalled();
    watcher.stop();
  });

  it("stays visible when the conditional card is not available", async () => {
    const onChange = vi.fn();
    const watcher = new VisibilityWatcher(
      [{ condition: "state" }],
      document.createElement("div"),
      onChange,
    );
    watcher.hass = hass("off");
    await flush();
    expect(watcher.visible).toBe(true);
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe("reuseEqualConditions", () => {
  const a = { condition: "state", entity: "light.a", state: "on" };
  const b = { condition: "screen", media_query: "(min-width: 768px)" };

  it("gives back the previous objects for an equal, cloned list", () => {
    const previous = [a, b];
    expect(reuseEqualConditions(structuredClone(previous), previous)).toBe(
      previous,
    );
  });

  it("keeps the unchanged conditions when one changes", () => {
    const changed = { ...a, state: "off" };
    const result = reuseEqualConditions([changed, structuredClone(b)], [a, b])!;
    expect(result[0]).toBe(changed);
    expect(result[1]).toBe(b);
  });

  it("follows reordering and new conditions", () => {
    const added = { condition: "user", users: ["x"] };
    const result = reuseEqualConditions(
      [structuredClone(b), added, structuredClone(a)],
      [a, b],
    )!;
    expect(result).toEqual([b, added, a]);
    expect(result[0]).toBe(b);
    expect(result[2]).toBe(a);
  });

  it("passes through without a previous list", () => {
    const next = [a];
    expect(reuseEqualConditions(next, undefined)).toBe(next);
    expect(reuseEqualConditions(undefined, [a])).toBeUndefined();
  });
});
