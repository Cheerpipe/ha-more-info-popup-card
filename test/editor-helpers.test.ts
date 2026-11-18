import { describe, expect, it, vi } from "vitest";
import {
  cardPathFromEvent,
  createVirtualLovelace,
  sectionPath,
} from "../src/editor/virtual-lovelace";
import { decodeHash } from "../src/history";
import { computeEntityNameList, deviceInfoLabel } from "../src/ha/entity";
import { isSupportedHaVersion, parseHaVersion } from "../src/ha/internals";
import type { HomeAssistant } from "../src/ha/types";

describe("virtual lovelace", () => {
  it("exposes the zones as sections of view 0 and saves their cards", async () => {
    const onSave = vi.fn();
    const lovelace = createVirtualLovelace({
      sections: [
        { type: "grid", cards: [{ type: "tile" }] },
        { type: "grid", cards: [] },
      ],
      locale: {},
      onSave,
      onToast: vi.fn(),
    });
    expect(lovelace.config.views[0].sections?.[0].cards).toEqual([
      { type: "tile" },
    ]);
    // A card dragged from the first zone to the second one.
    await lovelace.saveConfig({
      views: [
        {
          sections: [
            { type: "grid", cards: [] },
            { type: "grid", cards: [{ type: "tile" }] },
          ],
        },
      ],
    });
    expect(onSave).toHaveBeenCalledWith([[], [{ type: "tile" }]]);
  });

  it("reads section and card indexes from event paths", () => {
    expect(cardPathFromEvent([0, 2, 3])).toEqual({ section: 2, card: 3 });
    expect(cardPathFromEvent([0, 3])).toBeUndefined();
    expect(cardPathFromEvent("x")).toBeUndefined();
  });

  it("reads the string paths of Home Assistant 2026.11+", () => {
    expect(cardPathFromEvent(["views", 0, "sections", 2, "cards", 3])).toEqual({
      section: 2,
      card: 3,
    });
    expect(cardPathFromEvent(["views", 0, "sections", 2, "cards"])).toBe(
      undefined,
    );
    expect(sectionPath(1)).toEqual(["views", 0, "sections", 1]);
  });
});

describe("helpers", () => {
  it("decodes hashes", () => {
    expect(decodeHash("#sal%C3%B3n")).toBe("salón");
    expect(decodeHash("#")).toBeUndefined();
    expect(decodeHash("")).toBeUndefined();
  });

  it("parses HA versions", () => {
    expect(parseHaVersion("2026.10.1")).toEqual([2026, 10]);
    expect(parseHaVersion("2026.11.0b0")).toEqual([2026, 11]);
    expect(isSupportedHaVersion("2026.9.3")).toBe(false);
    expect(isSupportedHaVersion("2027.1.0")).toBe(true);
    expect(isSupportedHaVersion(undefined)).toBe(true);
  });
});

describe("computeEntityNameList", () => {
  const hass = (patch: Partial<HomeAssistant>) =>
    ({
      states: {
        "light.ceiling": {
          entity_id: "light.ceiling",
          attributes: { friendly_name: "Living Lamp Ceiling" },
        },
      },
      entities: {},
      devices: {},
      areas: { living: { area_id: "living", name: "Living room" } },
      formatEntityName: (_s: unknown, { type }: { type: string }) =>
        type === "entity" ? "Ceiling" : "",
      ...patch,
    }) as unknown as HomeAssistant;

  it("builds area ▸ device ▸ entity for device-relative names", () => {
    const list = computeEntityNameList(
      hass({
        entities: {
          "light.ceiling": {
            entity_id: "light.ceiling",
            device_id: "d1",
            next_name_part: "device",
          },
        },
        devices: {
          d1: {
            id: "d1",
            name: "Living Lamp",
            name_by_user: null,
            area_id: "living",
            entry_type: null,
          },
        },
      }),
      "light.ceiling",
    );
    expect(list).toEqual(["Living room", "Living Lamp", "Ceiling"]);
  });

  it("falls back to the friendly name without registry entry", () => {
    expect(computeEntityNameList(hass({}), "light.ceiling")).toEqual([
      "Living Lamp Ceiling",
    ]);
  });
});

describe("device info label", () => {
  const hassWith = (strings: Record<string, string>) =>
    ({
      localize: (key: string, values?: Record<string, unknown>) =>
        (strings[key] ?? "").replace("{type}", String(values?.type ?? "")),
    }) as unknown as HomeAssistant;

  it("uses the 2026.11 keys", () => {
    const hass = hassWith({
      "ui.dialogs.more_info_control.device_info": "Device info",
      "ui.dialogs.more_info_control.service_info": "Service info",
    });
    expect(deviceInfoLabel(hass, "device")).toBe("Device info");
    expect(deviceInfoLabel(hass, "service")).toBe("Service info");
  });

  it("falls back to the 2026.10 keys", () => {
    const hass = hassWith({
      "ui.dialogs.more_info_control.device_or_service_info": "{type} info",
      "ui.dialogs.more_info_control.device_type.service": "Service",
    });
    expect(deviceInfoLabel(hass, "service")).toBe("Service info");
  });
});
