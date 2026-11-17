/**
 * Loads the lazily imported elements of a popup's cards before it opens.
 *
 * Native cards (`hui-*-card`) and the native more-info controls used by the
 * state and controls cards are lazy chunks. If they are still loading when
 * the dialog opens, the cards draw empty and the popup opens short, then
 * grows once they arrive. Preloading them lets the popup open at its final
 * size.
 */
import { CONTROLS_CARD_TYPE } from "./controls/controls-card";
import { CONTROLS_CARD_LOAD, ensureMoreInfoElements } from "./controls/loader";
import { STATE_CARD_TYPE, type StateCardConfig } from "./controls/state-card";
import { stateCardLoads } from "./controls/state-controls";
import { isDefined, whenDefined } from "./ha/internals";
import type { HomeAssistant, LovelaceCardConfig } from "./ha/types";
import { allCards, type BodyConfig } from "./zones";

const CUSTOM_PREFIX = "custom:";

/** The cards of a popup, nested ones (stacks, conditional) included. */
const flattenCards = (
  cards: LovelaceCardConfig[],
  out: LovelaceCardConfig[] = [],
): LovelaceCardConfig[] => {
  for (const card of cards) {
    if (!card || typeof card !== "object") continue;
    out.push(card);
    if (Array.isArray(card.cards)) {
      flattenCards(card.cards as LovelaceCardConfig[], out);
    }
    if (card.card && typeof card.card === "object") {
      flattenCards([card.card as LovelaceCardConfig], out);
    }
  }
  return out;
};

/** Built-in card elements already being imported (one per type). */
const nativeImports = new Map<string, Promise<boolean>>();

const loadNativeCard = (card: LovelaceCardConfig): Promise<boolean> => {
  const tag = `hui-${card.type}-card`;
  if (isDefined(tag)) return Promise.resolve(true);
  let load = nativeImports.get(tag);
  if (!load) {
    load = (async () => {
      // Creating a card element starts the import of its chunk.
      const helpers = await window.loadCardHelpers?.();
      try {
        helpers?.createCardElement?.(card);
      } catch {
        // Only the import matters.
      }
      return whenDefined(tag);
    })();
    nativeImports.set(tag, load);
  }
  return load;
};

const loadCard = (
  card: LovelaceCardConfig,
  hass: HomeAssistant,
): Promise<boolean>[] => {
  const type = card.type;
  if (typeof type !== "string" || !type) return [];
  if (!type.startsWith(CUSTOM_PREFIX)) return [loadNativeCard(card)];
  const tag = type.slice(CUSTOM_PREFIX.length);
  if (tag === STATE_CARD_TYPE) {
    const config = card as StateCardConfig;
    if (typeof config.entity !== "string") return [];
    return stateCardLoads(config, hass.states[config.entity]).map(
      ([domain, tags]) => ensureMoreInfoElements(domain, [...tags]),
    );
  }
  if (tag === CONTROLS_CARD_TYPE) {
    const [domain, tags] = CONTROLS_CARD_LOAD;
    return [ensureMoreInfoElements(domain, [...tags])];
  }
  // Another custom card: its resource may still be loading.
  return [whenDefined(tag)];
};

/** Resolves once every card of the popup can draw (never rejects). */
export const preloadPopup = async (
  config: BodyConfig,
  hass: HomeAssistant | undefined,
): Promise<void> => {
  if (!hass) return;
  const loads = flattenCards(allCards(config)).flatMap((card) => {
    try {
      return loadCard(card, hass);
    } catch {
      return [];
    }
  });
  await Promise.allSettled(loads);
};

/** `preloadPopup`, waiting at most `timeout` ms. */
export const preloadPopupWithin = (
  config: BodyConfig,
  hass: HomeAssistant | undefined,
  timeout: number,
): Promise<void> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return Promise.race([
    preloadPopup(config, hass),
    new Promise<void>((resolve) => {
      timer = setTimeout(resolve, timeout);
    }),
  ]).finally(() => clearTimeout(timer));
};
