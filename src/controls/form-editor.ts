/**
 * Visual editor of the control cards: HA's `hui-form-editor` (an `ha-form`
 * over the card config) plus the values the card uses when an option is
 * unset. With a plain `getConfigForm` an unset `show_*` option reads as off
 * while the card shows it, and the defaults depend on the config (the
 * entity's domain, an item's action), which a static schema can't express.
 * Shown values are filled in; values equal to their default are not saved.
 */
import { html, LitElement, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { fireEvent } from "../ha/fire-event";
import type { HomeAssistant, LovelaceCardConfig } from "../ha/types";
import type { EditorDefaults } from "./editor-defaults";

export interface EditorForm {
  /** A function for options listed from the entities (kept while equal). */
  schema: unknown[] | ((hass: HomeAssistant | undefined) => unknown[]);
  computeLabel: (schema: { name: string }) => string;
  computeHelper?: (schema: { name: string }) => string | undefined;
  assertConfig?: (config: never) => void;
}

export const defineFormEditor = <C extends LovelaceCardConfig>(
  tag: string,
  form: () => EditorForm,
  defaults: EditorDefaults<C>,
) => {
  class FormEditor extends LitElement {
    @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

    @state() accessor _config: C | undefined;

    private readonly _form = form();

    private _schema?: { key: string; value: unknown[] };

    /** Same schema object while it doesn't change, so `ha-form` keeps it. */
    private get _currentSchema(): unknown[] {
      const { schema } = this._form;
      if (typeof schema !== "function") return schema;
      const value = schema(this.hass);
      const key = JSON.stringify(value);
      if (this._schema?.key !== key) this._schema = { key, value };
      return this._schema.value;
    }

    /** Throws for configs the form can't edit (HA then offers YAML). */
    public setConfig(config: C): void {
      this._form.assertConfig?.(config as never);
      this._config = config;
    }

    protected override render() {
      if (!this._config) return nothing;
      return html`
        <ha-form
          .hass=${this.hass}
          .data=${defaults.fill(this._config, this.hass)}
          .schema=${this._currentSchema}
          .computeLabel=${this._form.computeLabel}
          .computeHelper=${this._form.computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      `;
    }

    private _valueChanged(ev: CustomEvent<{ value: C }>) {
      ev.stopPropagation();
      fireEvent(this, "config-changed", {
        config: defaults.strip(ev.detail.value, this.hass),
      });
    }
  }
  if (!customElements.get(tag)) customElements.define(tag, FormEditor);
};
