/**
 * Visibility conditions of something that is not a card (an item of the
 * controls card), evaluated by Home Assistant itself. The frontend keeps its
 * condition logic private (`validate-condition.ts`), but the `conditional`
 * card runs it with all its listeners (state, numeric state, screen, user,
 * time, location, and / or / not). A hidden `conditional` card around an
 * empty probe card reports the result: its `hidden` attribute, and
 * `card-visibility-changed` whenever it flips.
 */
import type { HomeAssistant } from "./types";

/** Same shape as a card's `visibility` (the Visibility tab). */
export type VisibilityCondition = Record<string, unknown>;

export const VISIBILITY_PROBE_TYPE = "more-info-popup-visibility-probe";

/** Empty card shown by the probe while the conditions are met. */
class VisibilityProbeCard extends HTMLElement {
  public setConfig(): void {}

  public getCardSize(): number {
    return 0;
  }
}

if (!customElements.get(VISIBILITY_PROBE_TYPE)) {
  customElements.define(VISIBILITY_PROBE_TYPE, VisibilityProbeCard);
}

type ConditionalCard = HTMLElement & { hass?: HomeAssistant };

/** How long to wait for the `conditional` card chunk before giving up. */
const LOAD_TIMEOUT_MS = 8000;

/**
 * Watches one list of conditions. `onChange` gets the visibility each time
 * it changes. Until Home Assistant answers (or if it can't), the item counts
 * as visible, so a frontend change never hides things for good.
 */
export class VisibilityWatcher {
  private _card?: ConditionalCard;
  private _visible = true;
  private _hass?: HomeAssistant;
  private _stopped = false;

  public constructor(
    conditions: VisibilityCondition[],
    /** Where the hidden probe lives (must stay connected while watched). */
    container: HTMLElement,
    private readonly _onChange: (visible: boolean) => void,
  ) {
    void this._create(conditions, container);
  }

  public get visible(): boolean {
    return this._visible;
  }

  public set hass(hass: HomeAssistant | undefined) {
    this._hass = hass;
    if (this._card && hass) this._card.hass = hass;
  }

  public stop(): void {
    this._stopped = true;
    this._card?.remove();
    this._card = undefined;
  }

  private async _create(
    conditions: VisibilityCondition[],
    container: HTMLElement,
  ) {
    try {
      const helpers = await window.loadCardHelpers?.();
      if (!helpers?.createCardElement || this._stopped) return;
      const card = helpers.createCardElement({
        type: "conditional",
        conditions,
        card: { type: `custom:${VISIBILITY_PROBE_TYPE}` },
      }) as ConditionalCard;
      // Built-in cards outside the main chunk are defined once loaded.
      const loaded = await Promise.race([
        customElements.whenDefined(card.localName).then(() => true),
        new Promise<boolean>((resolve) =>
          setTimeout(() => resolve(false), LOAD_TIMEOUT_MS),
        ),
      ]);
      if (
        !loaded ||
        this._stopped ||
        card.localName !== "hui-conditional-card"
      ) {
        return;
      }
      card.addEventListener("card-visibility-changed", (ev) => {
        // Our own card's visibility is not affected.
        ev.stopPropagation();
        this._update();
      });
      this._card = card;
      if (this._hass) card.hass = this._hass;
      container.appendChild(card);
      await (card as unknown as { updateComplete?: Promise<unknown> })
        .updateComplete;
      this._update();
    } catch (err) {
      console.warn("[more-info-popup-card] Visibility not available", err);
    }
  }

  private _update() {
    const visible = !this._card?.hidden;
    if (visible === this._visible) return;
    this._visible = visible;
    this._onChange(visible);
  }
}

/**
 * `next` with the condition objects of `previous` wherever they are equal.
 * The native conditions editor keys its rows (and their expanded state) by
 * object identity; a config that comes back cloned (the popup editor clones
 * on every change) would otherwise redraw every condition collapsed.
 */
export const reuseEqualConditions = <T>(
  next: T[] | undefined,
  previous: T[] | undefined,
): T[] | undefined => {
  if (!next || !previous) return next;
  const pool = previous.map((condition) => ({
    key: JSON.stringify(condition),
    condition,
    used: false,
  }));
  const result = next.map((condition) => {
    const key = JSON.stringify(condition);
    const match = pool.find((entry) => !entry.used && entry.key === key);
    if (!match) return condition;
    match.used = true;
    return match.condition;
  });
  const unchanged =
    result.length === previous.length &&
    result.every((condition, index) => condition === previous[index]);
  return unchanged ? previous : result;
};
