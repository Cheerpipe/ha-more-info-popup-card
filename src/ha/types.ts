/**
 * Minimal subset of the Home Assistant frontend types this card relies on.
 * Mirrors `src/types.ts` and `src/panels/lovelace/types.ts` of the HA frontend.
 */
import type { HassEntity } from "home-assistant-js-websocket";

export type { HassEntity };

export interface EntityRegistryDisplayEntry {
  entity_id: string;
  name?: string | null;
  device_id?: string | null;
  area_id?: string | null;
  hidden?: boolean;
  entity_category?: string | null;
  next_name_part?: string | null;
  platform?: string;
  translation_key?: string;
}

export interface DeviceRegistryEntry {
  id: string;
  name: string | null;
  name_by_user: string | null;
  area_id: string | null;
  entry_type: "service" | null;
  parent_device_id?: string | null;
  next_name_part?: string | null;
  configuration_url?: string | null;
}

export interface AreaRegistryEntry {
  area_id: string;
  name: string;
}

export interface ExtEntityRegistryEntry extends EntityRegistryDisplayEntry {
  unique_id: string;
  platform: string;
  options?: Record<string, Record<string, unknown> | undefined> | null;
}

export interface HassService {
  name?: string;
  description?: string;
  fields?: Record<string, { required?: boolean }>;
}

export type EntityNameType =
  "entity" | "device" | "parent_device" | "area" | "floor";

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities: Record<string, EntityRegistryDisplayEntry>;
  devices: Record<string, DeviceRegistryEntry>;
  areas: Record<string, AreaRegistryEntry>;
  floors: Record<string, unknown>;
  services: Record<string, Record<string, HassService | undefined>>;
  user?: { id: string; name: string; is_admin: boolean };
  language: string;
  themes?: { darkMode?: boolean };
  locale: Record<string, unknown>;
  config: { version: string; components: string[] };
  translationMetadata: {
    translations: Record<string, { isRTL?: boolean }>;
  };
  auth: { external?: { config: { hasEntityAddTo?: boolean } } };
  localize(key: string, values?: Record<string, unknown>): string;
  loadBackendTranslation?(category: string): Promise<unknown>;
  callWS<T>(msg: { type: string; [key: string]: unknown }): Promise<T>;
  callService(
    domain: string,
    service: string,
    data?: Record<string, unknown>,
  ): Promise<unknown>;
  formatEntityState(stateObj: HassEntity, state?: string): string;
  formatEntityAttributeName(stateObj: HassEntity, attribute: string): string;
  formatEntityAttributeValue(
    stateObj: HassEntity,
    attribute: string,
    value?: unknown,
  ): string;
  formatEntityName?(
    stateObj: HassEntity,
    name: { type: EntityNameType } | { type: EntityNameType }[],
  ): string;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: any;
}

export interface LovelaceGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  min_columns?: number;
  max_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface LovelaceSectionConfig {
  type: "grid";
  column_span?: number;
  cards: LovelaceCardConfig[];
}

export interface LovelaceViewConfig {
  type?: string;
  sections?: LovelaceSectionConfig[];
  [key: string]: unknown;
}

export interface LovelaceConfig {
  views: LovelaceViewConfig[];
  [key: string]: unknown;
}

export interface ShowToastParams {
  message: string;
  action?: { text: string; action: () => void };
  duration?: number;
  dismissable?: boolean;
}

/** Shape of the `Lovelace` controller used by `hui-section` in edit mode. */
export interface Lovelace {
  config: LovelaceConfig;
  rawConfig: LovelaceConfig;
  editMode: boolean;
  urlPath: string | null;
  mode: "generated" | "yaml" | "storage";
  locale: Record<string, unknown>;
  enableFullEditMode: () => void;
  setEditMode: (editMode: boolean) => void;
  saveConfig: (newConfig: LovelaceConfig) => Promise<void>;
  deleteConfig: () => Promise<void>;
  showToast: (params: ShowToastParams) => void;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  preview?: boolean;
  layout?: string;
  connectedWhileHidden?: boolean;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number | Promise<number>;
  getGridOptions?(): LovelaceGridOptions;
}

export type MoreInfoView =
  "info" | "history" | "settings" | "related" | "add_to" | "details";

export interface ChildView {
  viewTag: string;
  viewTitle?: string;
  viewImport?: () => Promise<unknown>;
  viewParams?: unknown;
  viewHeaderTag?: string;
  viewHeaderImport?: () => Promise<unknown>;
}

export interface MoreInfoEventDetail {
  entityId: string | null;
  view?: MoreInfoView;
  tab?: MoreInfoView;
  data?: Record<string, unknown>;
}

export interface ActionConfig {
  action: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<{
      importMoreInfoControl?: (type: string) => void;
      showEnterCodeDialog?: (
        element: HTMLElement,
        params: {
          codeFormat: "text" | "number";
          codePattern?: string;
          title?: string;
          submitText?: string;
        },
      ) => Promise<string | null>;
    }>;
    customCards?: {
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
      documentationURL?: string;
    }[];
  }
}
