/**
 * `custom:more-info-controls-card`: the row of chips at the bottom of a
 * native more-info dialog (Effect, Fan speed, Mode, "Cleaning › By area"…)
 * as a composable card. Each chip can be a native select menu, a toggle,
 * a number stepper or an action, and can be renamed, re-iconed and filtered.
 */
import { mdiChevronRight, mdiMinus, mdiPlus } from "@mdi/js";
import { css, html, LitElement, nothing, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { computeDomain, computeStateName } from "../ha/entity";
import { computeCssColor } from "../ha/color";
import { fireEvent } from "../ha/fire-event";
import type {
  ActionConfig,
  HassEntity,
  HomeAssistant,
  LovelaceGridOptions,
} from "../ha/types";
import { localize } from "../localize/localize";
import { VisibilityWatcher, type VisibilityCondition } from "../ha/visibility";
import {
  ATTRIBUTE_SELECTS,
  ENTITY_SELECT,
  SELECT_DOMAINS,
  STATE_SELECT,
  type AttributeSelect,
} from "./attributes";
import {
  BUTTON_DEFAULTS,
  INACTIVE_STATES,
  inferControlType,
  NUMBER_DEBOUNCE,
  normalizeOptions,
  splitAction,
  defaultShowArrow,
  type ControlItemConfig,
  type ControlsCardConfig,
} from "./items";
import { ensureMoreInfoElements } from "./loader";
import { CONTROLS_CARD_EDITOR_TAG } from "./editors";
import { cardAppearanceStyles, chipStyles } from "./styles";

export const CONTROLS_CARD_TYPE = "more-info-controls-card";

export class MoreInfoControlsCard extends LitElement {
  /** `ha-form` editor that shows the values used for unset options. */
  public static getConfigElement() {
    return document.createElement(CONTROLS_CARD_EDITOR_TAG);
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[],
  ): ControlsCardConfig {
    const withEffects = entities.find(
      (id) =>
        id.startsWith("light.") && hass.states[id]?.attributes.effect_list,
    );
    const select = entities.find((id) =>
      SELECT_DOMAINS.includes(computeDomain(id)),
    );
    const toggle = entities.find((id) => id.startsWith("switch."));
    const controls: ControlItemConfig[] = [];
    if (withEffects)
      controls.push({ entity: withEffects, attribute: "effect" });
    if (select) controls.push({ entity: select });
    if (toggle) controls.push({ entity: toggle });
    if (!controls.length && entities[0]) controls.push({ entity: entities[0] });
    return { type: `custom:${CONTROLS_CARD_TYPE}`, controls };
  }

  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  /** Kept as given so UIX can read `uix:` / `card_mod:` from it. */
  @state() accessor _config: ControlsCardConfig | undefined;

  @state() accessor _ready = false;

  /** Edit mode (set by `hui-card`): every item shows, like hidden cards. */
  @property({ attribute: false }) accessor preview = false;

  /** Items whose `visibility` conditions are not met right now. */
  @state() accessor _hiddenItems: ReadonlySet<number> = new Set();

  /** One watcher per item with `visibility`, keyed by index. */
  private _watchers = new Map<
    number,
    { key: string; watcher: VisibilityWatcher }
  >();

  /** Hidden home of the watchers' probes (kept out of Lit's template). */
  private _probes?: HTMLElement;

  /** Optimistic values while a number change is pending. */
  @state() accessor _pending: Record<number, number> = {};

  private _timers: Record<number, ReturnType<typeof setTimeout>> = {};

  public setConfig(config: ControlsCardConfig): void {
    if (!Array.isArray(config?.controls)) {
      throw new Error('"controls" must be a list');
    }
    config.controls.forEach((item, index) => {
      if (!item || typeof item !== "object") {
        throw new Error(`Control ${index + 1} is invalid`);
      }
      const type = inferControlType(item);
      if (type !== "action" && type !== "button" && !item.entity) {
        throw new Error(`Control ${index + 1} needs an "entity"`);
      }
      if (
        item.attribute &&
        item.attribute !== "state" &&
        !ATTRIBUTE_SELECTS[item.attribute] &&
        !item.options
      ) {
        throw new Error(
          `Control ${index + 1}: unknown attribute "${item.attribute}"; add "options" and "perform_action"`,
        );
      }
    });
    this._config = config;
    this._syncWatchers();
  }

  /** Starts, keeps or stops the visibility watcher of each item. */
  private _syncWatchers() {
    const wanted = new Map<number, VisibilityCondition[]>();
    this._config?.controls.forEach((item, index) => {
      if (Array.isArray(item.visibility) && item.visibility.length) {
        wanted.set(index, item.visibility);
      }
    });
    for (const [index, { key, watcher }] of this._watchers) {
      const conditions = wanted.get(index);
      if (!conditions || JSON.stringify(conditions) !== key) {
        watcher.stop();
        this._watchers.delete(index);
      }
    }
    if (!this._probes) {
      this._probes = document.createElement("div");
      this._probes.hidden = true;
    }
    for (const [index, conditions] of wanted) {
      if (this._watchers.has(index)) continue;
      const watcher = new VisibilityWatcher(conditions, this._probes, () =>
        this._updateHidden(),
      );
      watcher.hass = this.hass;
      this._watchers.set(index, { key: JSON.stringify(conditions), watcher });
    }
    this._updateHidden();
  }

  private _updateHidden() {
    const hidden = new Set<number>();
    for (const [index, { watcher }] of this._watchers) {
      if (!watcher.visible) hidden.add(index);
    }
    const same =
      hidden.size === this._hiddenItems.size &&
      [...hidden].every((index) => this._hiddenItems.has(index));
    if (!same) this._hiddenItems = hidden;
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    if (changed.has("hass")) {
      for (const { watcher } of this._watchers.values()) {
        watcher.hass = this.hass;
      }
    }
  }

  protected override firstUpdated(): void {
    // Next to Lit's content: the probes must be connected to be evaluated.
    if (this._probes) this.renderRoot.appendChild(this._probes);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // The chips container and select menu come with the light more-info chunk.
    ensureMoreInfoElements("light", [
      "ha-more-info-control-select-container",
      "ha-control-select-menu",
    ]).then(() => {
      this._ready = true;
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    Object.values(this._timers).forEach(clearTimeout);
    this._timers = {};
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 12, rows: "auto", min_columns: 6 };
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  private _stateObj(item: ControlItemConfig): HassEntity | undefined {
    return item.entity ? this.hass?.states[item.entity] : undefined;
  }

  private _selectSpec(
    item: ControlItemConfig,
    stateObj: HassEntity,
  ): AttributeSelect | undefined {
    if (item.attribute) {
      if (item.attribute === "state") return STATE_SELECT;
      return (
        ATTRIBUTE_SELECTS[item.attribute] ?? {
          options: () => [],
          value: (s) =>
            s.attributes[item.attribute!] == null
              ? undefined
              : String(s.attributes[item.attribute!]),
          service: () => ["", ""],
          data: (value) => ({ [item.data_key ?? item.attribute!]: value }),
          icon: ENTITY_SELECT.icon,
        }
      );
    }
    if (SELECT_DOMAINS.includes(computeDomain(stateObj.entity_id))) {
      return ENTITY_SELECT;
    }
    // Your own options sent to your own action (no current value to show).
    if (item.options && item.perform_action) {
      return {
        options: () => [],
        value: () => undefined,
        service: () => ["", ""],
        data: (value) => ({ [item.data_key ?? "value"]: value }),
        icon: ENTITY_SELECT.icon,
        attributeIcons: false,
      };
    }
    return undefined;
  }

  private _call(
    item: ControlItemConfig,
    fallback: [string, string],
    data: Record<string, unknown>,
    value: unknown,
  ) {
    const [domain, service] = item.perform_action
      ? splitAction(item.perform_action)
      : fallback;
    if (!domain || !service) return;
    const payload: Record<string, unknown> = {
      ...(item.entity ? { entity_id: item.entity } : {}),
      ...(item.perform_action && item.data_key
        ? { [item.data_key]: value }
        : data),
      ...item.data,
    };
    this.hass!.callService(domain, service, payload);
  }

  private _label(
    item: ControlItemConfig,
    stateObj: HassEntity | undefined,
  ): string {
    if (item.name) return item.name;
    if (!stateObj) return "";
    if (item.attribute && item.attribute !== "state") {
      return this.hass!.formatEntityAttributeName(stateObj, item.attribute);
    }
    return computeStateName(stateObj);
  }

  /** `colored: false` keeps the default color (an inactive toggle). */
  private _icon(
    item: ControlItemConfig,
    stateObj: HassEntity | undefined,
    path: string | undefined,
    slot?: string,
    colored = true,
  ): TemplateResult {
    const style = styleMap({
      color: item.color && colored ? computeCssColor(item.color) : undefined,
    });
    if (item.icon) {
      return html`<ha-icon
        slot=${slot ?? nothing}
        style=${style}
        .icon=${item.icon}
      ></ha-icon>`;
    }
    if (path) {
      return html`<ha-svg-icon
        slot=${slot ?? nothing}
        style=${style}
        .path=${path}
      ></ha-svg-icon>`;
    }
    return html`<ha-state-icon
      slot=${slot ?? nothing}
      style=${style}
      .hass=${this.hass}
      .stateObj=${stateObj}
    ></ha-state-icon>`;
  }

  // ---------------------------------------------------------------------------
  // Chips
  // ---------------------------------------------------------------------------

  private _renderSelect(item: ControlItemConfig, stateObj: HassEntity) {
    const hass = this.hass!;
    const spec = this._selectSpec(item, stateObj);
    if (!spec) return nothing;
    const custom = normalizeOptions(item.options);
    const values = custom ? custom.map((o) => o.value) : spec.options(stateObj);
    const attribute =
      item.attribute && item.attribute !== "state" ? item.attribute : undefined;
    const formatValue = (value: string) => {
      const option = custom?.find((o) => o.value === value);
      if (option?.name) return option.name;
      if (spec.formatAsState || !attribute)
        return hass.formatEntityState(stateObj, value);
      return hass.formatEntityAttributeValue(
        stateObj,
        attribute,
        value === "true" ? true : value === "false" ? false : value,
      );
    };
    const options = values.map((value) => {
      const icon = custom?.find((o) => o.value === value)?.icon;
      const iconPath = icon ? undefined : spec.optionIcons?.[value];
      return {
        value,
        label: formatValue(value),
        ...(icon ? { icon } : {}),
        ...(iconPath ? { iconPath } : {}),
      };
    });
    // hvac_mode and select options are states: use state icons for them.
    const renderIcon = (value: string) =>
      attribute && !spec.formatAsState
        ? html`<ha-attribute-icon
            slot="icon"
            .hass=${hass}
            .stateObj=${stateObj}
            .attribute=${attribute}
            .attributeValue=${value}
          ></ha-attribute-icon>`
        : html`<ha-state-icon
            slot="icon"
            .hass=${hass}
            .stateObj=${stateObj}
            .stateValue=${value}
          ></ha-state-icon>`;
    const isEntitySelect =
      !attribute && SELECT_DOMAINS.includes(computeDomain(stateObj.entity_id));
    return html`
      <ha-control-select-menu
        .label=${this._label(item, stateObj)}
        .value=${spec.value(stateObj)}
        .options=${options}
        .renderIcon=${
          item.icon || spec.attributeIcons === false ? undefined : renderIcon
        }
        .disabled=${stateObj.state === "unavailable"}
        @wa-select=${(ev: CustomEvent<{ item?: { value?: string } }>) => {
          const value = ev.detail?.item?.value;
          if (value === undefined || value === spec.value(stateObj)) return;
          this._call(item, spec.service(stateObj), spec.data(value), value);
        }}
      >
        ${this._icon(item, isEntitySelect ? stateObj : undefined, isEntitySelect ? undefined : spec.icon, "icon")}
      </ha-control-select-menu>
    `;
  }

  private _renderToggle(item: ControlItemConfig, stateObj: HassEntity) {
    const domain = computeDomain(stateObj.entity_id);
    const active = !INACTIVE_STATES.includes(stateObj.state);
    const unavailable = stateObj.state === "unavailable";
    const toggle = () => {
      if (item.perform_action) {
        this._call(item, ["", ""], {}, undefined);
      } else if (domain === "lock") {
        this.hass!.callService("lock", active ? "lock" : "unlock", {
          entity_id: stateObj.entity_id,
        });
      } else if (domain === "cover" || domain === "valve") {
        this.hass!.callService(domain, "toggle", {
          entity_id: stateObj.entity_id,
        });
      } else {
        this.hass!.callService("homeassistant", "toggle", {
          entity_id: stateObj.entity_id,
        });
      }
    };
    return html`
      <button
        class=${classMap({ chip: true, toggle: true, active })}
        role="switch"
        aria-checked=${String(active)}
        ?disabled=${unavailable}
        @click=${toggle}
      >
        <div class="icon">
          ${this._icon(item, stateObj, undefined, undefined, active)}
        </div>
        <div class="content">
          <p class="label">${this._label(item, stateObj)}</p>
          <p class="value">${this.hass!.formatEntityState(stateObj)}</p>
        </div>
      </button>
    `;
  }

  private _renderNumber(
    item: ControlItemConfig,
    stateObj: HassEntity,
    index: number,
  ) {
    const hass = this.hass!;
    const attrs = stateObj.attributes;
    const min = item.min ?? Number(attrs.min ?? 0);
    const max = item.max ?? Number(attrs.max ?? 100);
    const step = item.step ?? Number(attrs.step ?? 1);
    const current =
      this._pending[index] ??
      Number(item.attribute ? attrs[item.attribute] : stateObj.state);
    const valid = Number.isFinite(current);
    const unavailable = stateObj.state === "unavailable" || !valid;
    const decimals = (String(step).split(".")[1] ?? "").length;
    const display = valid
      ? this._pending[index] !== undefined || item.attribute
        ? `${current.toFixed(decimals)}${attrs.unit_of_measurement ? ` ${attrs.unit_of_measurement}` : ""}`
        : hass.formatEntityState(stateObj)
      : hass.formatEntityState(stateObj);
    const change = (delta: number) => {
      const next = Math.min(
        max,
        Math.max(min, Number((current + delta * step).toFixed(decimals))),
      );
      if (next === current) return;
      this._pending = { ...this._pending, [index]: next };
      clearTimeout(this._timers[index]);
      this._timers[index] = setTimeout(() => {
        const domain = computeDomain(stateObj.entity_id);
        this._call(item, [domain, "set_value"], { value: next }, next);
        const rest = { ...this._pending };
        delete rest[index];
        this._pending = rest;
      }, NUMBER_DEBOUNCE);
    };
    return html`
      <div
        class="chip number"
        ?disabled=${unavailable}
        role="group"
        aria-label=${this._label(item, stateObj)}
      >
        <ha-icon-button
          .label=${hass.localize("ui.card.counter.actions.decrement") || "−"}
          .path=${mdiMinus}
          .disabled=${unavailable || current <= min}
          @click=${() => change(-1)}
        ></ha-icon-button>
        <div class="content center">
          <p class="label">${this._label(item, stateObj)}</p>
          <p class="value">${display}</p>
        </div>
        <ha-icon-button
          .label=${hass.localize("ui.card.counter.actions.increment") || "+"}
          .path=${mdiPlus}
          .disabled=${unavailable || current >= max}
          @click=${() => change(1)}
        ></ha-icon-button>
      </div>
    `;
  }

  private _runAction(item: ControlItemConfig, action: ActionConfig) {
    if (action.action === "none") return;
    if (action.action === "more-info") {
      // From the element itself, so the popup can open it inline.
      const entityId = (action.entity as string | undefined) ?? item.entity;
      if (entityId) fireEvent(this, "hass-more-info", { entityId });
      return;
    }
    fireEvent(this, "hass-action", {
      config: { entity: item.entity, tap_action: action },
      action: "tap",
    });
  }

  private _renderButton(
    item: ControlItemConfig,
    stateObj: HassEntity | undefined,
  ) {
    const domain = item.entity ? computeDomain(item.entity) : "";
    const press = () => {
      if (item.tap_action) {
        this._runAction(item, item.tap_action);
        return;
      }
      const action =
        item.perform_action ??
        BUTTON_DEFAULTS[domain] ??
        (item.entity ? "homeassistant.toggle" : undefined);
      if (!action) return;
      const [serviceDomain, service] = splitAction(action);
      this.hass!.callService(serviceDomain, service, {
        ...(item.entity ? { entity_id: item.entity } : {}),
        ...item.data,
      });
    };
    return html`
      <ha-control-button
        .label=${this._label(item, stateObj)}
        .disabled=${stateObj?.state === "unavailable"}
        @click=${press}
      >
        ${this._icon(item, stateObj, undefined)}
      </ha-control-button>
    `;
  }

  private _renderAction(
    item: ControlItemConfig,
    stateObj: HassEntity | undefined,
  ) {
    const action = item.tap_action ?? {
      action: stateObj ? "more-info" : "none",
    };
    const arrow = item.show_arrow ?? defaultShowArrow(item, Boolean(stateObj));
    const value =
      item.value ?? (stateObj ? this.hass!.formatEntityState(stateObj) : "");
    const run = () => this._runAction(item, action);
    return html`
      <button class="chip action" @click=${run}>
        <div class="icon">${this._icon(item, stateObj, undefined)}</div>
        <div class="content">
          <p class="label">${this._label(item, stateObj)}</p>
          ${value ? html`<p class="value">${value}</p>` : nothing}
        </div>
        ${
          arrow
            ? html`<div class="icon">
                <ha-svg-icon .path=${mdiChevronRight}></ha-svg-icon>
              </div>`
            : nothing
        }
      </button>
    `;
  }

  private _renderItem(item: ControlItemConfig, index: number) {
    const stateObj = this._stateObj(item);
    const type = inferControlType(item);
    if (type === "action") return this._renderAction(item, stateObj);
    if (type === "button") return this._renderButton(item, stateObj);
    if (!stateObj) {
      return html`<div class="chip" disabled>
        <div class="content">
          <p class="label">${item.name ?? item.entity}</p>
          <p class="value">
            ${this.hass!.localize("state.default.unavailable")}
          </p>
        </div>
      </div>`;
    }
    switch (type) {
      case "select":
        return this._renderSelect(item, stateObj);
      case "toggle":
        return this._renderToggle(item, stateObj);
      case "number":
        return this._renderNumber(item, stateObj, index);
      default:
        return nothing;
    }
  }

  /**
   * `wrap: true`: the native container's large-screen layout (centered rows,
   * 2 × 2 for four chips), applied on every screen size.
   */
  private _renderWrapped(chips: unknown[]) {
    const count = chips.length;
    return html`
      <div class="wrap-controls">
        <div
          class=${classMap({
            "wrap-scroll": true,
            [`items-${count}`]: true,
            multiline: count >= 4,
          })}
        >
          ${chips}
        </div>
      </div>
    `;
  }

  protected override render() {
    if (!this._config || !this.hass) return nothing;
    const appearance = this._config.appearance ?? "plain";
    const items = this._config.controls
      .map((item, index) => ({ item, index }))
      .filter(({ index }) => this.preview || !this._hiddenItems.has(index));
    // Same layout as more-info: command buttons above the chips row.
    const buttons = items.filter(
      ({ item }) => inferControlType(item) === "button",
    );
    const chips = items.filter(
      ({ item }) => inferControlType(item) !== "button",
    );
    return html`
      <ha-card class=${appearance}>
        ${
          !this._ready
            ? nothing
            : !items.length
              ? html`<p class="empty">
                  ${localize(this.hass, "controls.empty")}
                </p>`
              : html`
                  ${
                    buttons.length
                      ? html`<div class="buttons">
                          <ha-control-button-group>
                            ${buttons.map(({ item, index }) => this._renderItem(item, index))}
                          </ha-control-button-group>
                        </div>`
                      : nothing
                  }
                  ${
                    !chips.length
                      ? nothing
                      : this._config.wrap
                        ? this._renderWrapped(
                            chips.map(({ item, index }) =>
                              this._renderItem(item, index),
                            ),
                          )
                        : html`<ha-more-info-control-select-container>
                            ${chips.map(({ item, index }) => this._renderItem(item, index))}
                          </ha-more-info-control-select-container>`
                  }
                `
        }
      </ha-card>
    `;
  }

  static override styles = [
    cardAppearanceStyles,
    chipStyles,
    css`
      ha-card.card {
        padding: var(--ha-space-4);
      }
      .chip.toggle.active .icon {
        color: var(--state-active-color, var(--primary-color));
      }
      .chip.number {
        gap: 0;
        padding: 0 2px;
        cursor: default;
      }
      .chip.number ha-icon-button {
        --ha-icon-button-size: 40px;
        --mdc-icon-size: 20px;
        flex: none;
      }
      .chip .content.center {
        align-items: center;
        text-align: center;
      }
      .chip.number[disabled] {
        color: var(--disabled-color);
      }
      /* ha-more-info-control-select-container, large-screen rules */
      .wrap-controls {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .wrap-scroll {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--ha-space-3);
        width: 100%;
        max-width: 450px;
        margin: auto;
      }
      .wrap-scroll > * {
        min-width: 120px;
        max-width: 160px;
        flex: none;
      }
      .wrap-scroll.items-4 {
        max-width: 300px;
      }
      .wrap-scroll.items-3 > * {
        max-width: 140px;
      }
      .wrap-scroll.multiline > * {
        width: 140px;
      }
      /* more-info-vacuum.ts command buttons */
      .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: var(--ha-space-3);
      }
      .buttons:not(:last-child) {
        margin-bottom: var(--ha-space-6);
      }
      ha-control-button-group {
        --control-button-group-thickness: 48px;
        justify-content: center;
      }
      ha-control-button-group ha-control-button {
        flex: 0 0 auto;
        width: var(--control-button-group-thickness);
        --control-button-border-radius: var(--ha-border-radius-lg);
      }
      .empty {
        margin: 0;
        text-align: center;
        color: var(--secondary-text-color);
      }
    `,
  ];
}

if (!customElements.get(CONTROLS_CARD_TYPE)) {
  customElements.define(CONTROLS_CARD_TYPE, MoreInfoControlsCard);
}
