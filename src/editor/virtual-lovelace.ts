/**
 * A minimal `Lovelace` controller that lets native `hui-section`s run their
 * full edit mode (overlay, drag & drop, add button, copy/cut, delete) on the
 * popup's own card lists instead of the dashboard config.
 *
 * `hui-section` resolves cards with paths `[viewIndex, sectionIndex, card]`
 * (`["views", view, "sections", section, "cards", card]` since 2026.11),
 * so the popup is exposed as view 0 with one section per zone; cards dragged
 * between zones move between those sections.
 */
import type {
  LovelaceCardConfig,
  Lovelace,
  LovelaceConfig,
  LovelaceSectionConfig,
  ShowToastParams,
} from "../ha/types";

export interface VirtualLovelaceOptions {
  sections: LovelaceSectionConfig[];
  locale: Record<string, unknown>;
  /** The cards of every section, in section order. */
  onSave: (cards: LovelaceCardConfig[][]) => void;
  /** Toasts with an action must not fire HA's global `undo-change`. */
  onToast: (params: ShowToastParams) => void;
}

export const VIRTUAL_VIEW_INDEX = 0;

export const createVirtualLovelace = (
  options: VirtualLovelaceOptions,
): Lovelace => {
  const config: LovelaceConfig = {
    views: [{ type: "sections", sections: options.sections }],
  };
  return {
    config,
    rawConfig: config,
    editMode: true,
    urlPath: null,
    mode: "storage",
    locale: options.locale,
    enableFullEditMode: () => undefined,
    setEditMode: () => undefined,
    saveConfig: async (newConfig: LovelaceConfig) => {
      const sections = newConfig.views?.[VIRTUAL_VIEW_INDEX]?.sections ?? [];
      options.onSave(
        options.sections.map((_, i) =>
          structuredClone(sections[i]?.cards ?? []),
        ),
      );
    },
    deleteConfig: async () => undefined,
    showToast: (params: ShowToastParams) => options.onToast(params),
  };
};

/**
 * Path of a section of the virtual view, as Home Assistant 2026.11+ expects
 * it on `hui-section.path` (older versions use `viewIndex` / `index`).
 */
export const sectionPath = (section: number): (string | number)[] => [
  "views",
  VIRTUAL_VIEW_INDEX,
  "sections",
  section,
];

/**
 * Section and card index from a `ll-*-card` event path: `[view, section, card]`
 * before 2026.11, `["views", view, "sections", section, "cards", card]` after.
 */
export const cardPathFromEvent = (
  path: unknown,
): { section: number; card: number } | undefined => {
  if (!Array.isArray(path)) return undefined;
  const indexes = path.filter((part) => typeof part !== "string");
  if (indexes.length !== 3) return undefined;
  const [, section, card] = indexes;
  return typeof section === "number" && typeof card === "number"
    ? { section, card }
    : undefined;
};

/** `sessionStorage` key of the dashboard card clipboard (HA 2026.11+). */
export const CARD_CLIPBOARD_KEY = "dashboardCardClipboard";
