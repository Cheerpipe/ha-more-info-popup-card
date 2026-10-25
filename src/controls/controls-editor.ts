/**
 * Visual editor of the controls card. The items list looks like HA's object
 * selector (`ha-selector-object`), but that selector gives every item the
 * same fields; here an item opens in place like the rows of the entities
 * card editor (back arrow, then its form), and the form only has the fields
 * its type uses (`controlItemFields`).
 */
import { mdiDelete, mdiDragHorizontalVariant, mdiPencil } from "@mdi/js";
import { css, html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { computeStateName } from "../ha/entity";
import { fireEvent } from "../ha/fire-event";
import type { HomeAssistant } from "../ha/types";
import { localize, type TranslationKey } from "../localize/localize";
import { CONTROLS_CARD_DEFAULTS } from "./editor-defaults";
import {
  assertControlsCardConfig,
  controlItemHelper,
  controlItemLabel,
  controlItemSchema,
  controlsCardOptionsSchema,
} from "./forms";
import {
  inferControlType,
  type ControlItemConfig,
  type ControlsCardConfig,
} from "./items";

export class MoreInfoControlsCardEditor extends LitElement {
  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  @state() accessor _config: ControlsCardConfig | undefined;

  /** Item open in its form, or the list. */
  @state() accessor _editing: number | undefined;

  /** Throws for configs the form can't edit (HA then offers YAML). */
  public setConfig(config: ControlsCardConfig): void {
    assertControlsCardConfig(config);
    this._config = config;
    if (
      this._editing !== undefined &&
      this._editing >= (config.controls?.length ?? 0)
    ) {
      this._editing = undefined;
    }
  }

  private get _filled(): ControlsCardConfig {
    return CONTROLS_CARD_DEFAULTS.fill(
      { ...this._config!, controls: this._config!.controls ?? [] },
      this.hass,
    );
  }

  private _save(config: ControlsCardConfig) {
    this._config = config;
    fireEvent(this, "config-changed", {
      config: CONTROLS_CARD_DEFAULTS.strip(config, this.hass),
    });
  }

  private _setItems(controls: ControlItemConfig[]) {
    this._save({ ...this._config!, controls });
  }

  private _title(item: ControlItemConfig): string {
    const stateObj = item.entity ? this.hass?.states[item.entity] : undefined;
    return (
      item.name ||
      (stateObj ? computeStateName(stateObj) : item.entity) ||
      this._typeLabel(item)
    );
  }

  private _typeLabel(item: ControlItemConfig): string {
    const type = inferControlType(item);
    return (
      localize(this.hass, `controls.type.${type}` as TranslationKey) || type
    );
  }

  private _description(item: ControlItemConfig): string {
    const parts = [this._typeLabel(item)];
    if (item.attribute && item.attribute !== "state") {
      parts.push(
        localize(
          this.hass,
          `controls.attribute.${item.attribute}` as TranslationKey,
        ) || item.attribute,
      );
    }
    if (item.visibility?.length) {
      parts.push(localize(this.hass, "controls.visibility"));
    }
    return parts.join(" · ");
  }

  // List

  private _moved(ev: CustomEvent<{ oldIndex: number; newIndex: number }>) {
    ev.stopPropagation();
    const { oldIndex, newIndex } = ev.detail;
    const controls = [...this._config!.controls];
    const [moved] = controls.splice(oldIndex, 1);
    controls.splice(newIndex, 0, moved!);
    this._setItems(controls);
  }

  private _add() {
    const controls = [...(this._config!.controls ?? []), {}];
    this._setItems(controls);
    this._editing = controls.length - 1;
  }

  private _delete(index: number) {
    const controls = [...this._config!.controls];
    controls.splice(index, 1);
    this._setItems(controls);
  }

  private _optionsChanged(ev: CustomEvent<{ value: ControlsCardConfig }>) {
    ev.stopPropagation();
    this._save({ ...this._filled, ...ev.detail.value });
  }

  private _renderList() {
    const hass = this.hass!;
    const filled = this._filled;
    return html`
      <label>${localize(hass, "controls.controls")}</label>
      <div class="items-container">
        <ha-sortable
          handle-selector=".handle"
          draggable-selector=".item"
          @item-moved=${this._moved}
        >
          <ha-list-base>
            ${filled.controls.map(
              (item, index) => html`
                <ha-list-item-base class="item">
                  <ha-svg-icon
                    class="handle"
                    .path=${mdiDragHorizontalVariant}
                    slot="start"
                  ></ha-svg-icon>
                  <div slot="headline" class="label">${this._title(item)}</div>
                  <div slot="supporting-text" class="description">
                    ${this._description(item)}
                  </div>
                  <ha-icon-button
                    slot="end"
                    .label=${hass.localize("ui.common.edit")}
                    .path=${mdiPencil}
                    @click=${() => {
                      this._editing = index;
                    }}
                  ></ha-icon-button>
                  <ha-icon-button
                    slot="end"
                    .label=${hass.localize("ui.common.delete")}
                    .path=${mdiDelete}
                    @click=${() => this._delete(index)}
                  ></ha-icon-button>
                </ha-list-item-base>
              `,
            )}
          </ha-list-base>
        </ha-sortable>
        <ha-button appearance="filled" @click=${this._add}>
          ${hass.localize("ui.common.add")}
        </ha-button>
      </div>
      <ha-form
        .hass=${hass}
        .data=${filled}
        .schema=${controlsCardOptionsSchema()}
        .computeLabel=${(schema: { name: string }) =>
          controlItemLabel(schema.name)}
        .computeHelper=${(schema: { name: string }) =>
          controlItemHelper(schema.name)}
        @value-changed=${this._optionsChanged}
      ></ha-form>
    `;
  }

  // One item

  private _itemChanged(ev: CustomEvent<{ value: ControlItemConfig }>) {
    ev.stopPropagation();
    const index = this._editing!;
    const controls = [...this._filled.controls];
    // Fields of another type stay (the card ignores them), so switching the
    // type back keeps them.
    controls[index] = ev.detail.value;
    this._setItems(controls);
  }

  private _renderItem(index: number) {
    const hass = this.hass!;
    const item = this._filled.controls[index] ?? {};
    const back = hass.localize("ui.common.back");
    return html`
      <div class="header">
        <ha-icon-button-prev
          .label=${back}
          @click=${() => {
            this._editing = undefined;
          }}
        ></ha-icon-button-prev>
        <span class="title">${this._title(item)}</span>
      </div>
      <ha-form
        .hass=${hass}
        .data=${item}
        .schema=${controlItemSchema(item)}
        .computeLabel=${(schema: { name: string }) =>
          controlItemLabel(schema.name)}
        .computeHelper=${(schema: { name: string }) =>
          controlItemHelper(schema.name)}
        @value-changed=${this._itemChanged}
      ></ha-form>
    `;
  }

  protected override render() {
    if (!this._config || !this.hass) return nothing;
    return this._editing !== undefined
      ? this._renderItem(this._editing)
      : this._renderList();
  }

  /** `ha-selector-object` and `hui-sub-element-editor` styles. */
  static override styles = css`
    label {
      margin-bottom: 8px;
      display: block;
    }
    .items-container {
      margin-bottom: var(--ha-space-6, 24px);
    }
    ha-list-base {
      --ha-list-gap: var(--ha-space-2);
      --ha-list-padding: var(--ha-space-2) 0;
    }
    ha-list-item-base {
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-md);
      --ha-row-item-gap: 0;
      --ha-row-item-padding-block: 0;
      --ha-row-item-padding-inline: var(--ha-space-3) var(--ha-space-1);
    }
    ha-list-item-base::part(start),
    ha-list-item-base::part(end) {
      color: var(--ha-color-text-secondary);
    }
    .handle {
      cursor: move;
      padding: 8px;
      margin-inline-start: -8px;
    }
    ha-list-item-base .label,
    ha-list-item-base .description {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .header {
      display: flex;
      align-items: center;
      gap: var(--ha-space-1, 4px);
      margin-bottom: var(--ha-space-2, 8px);
    }
    .header .title {
      font-size: var(--ha-font-size-l, 18px);
      font-weight: var(--ha-font-weight-medium, 500);
    }
  `;
}
