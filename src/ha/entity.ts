/**
 * Entity helpers replicating the rules of the native more-info dialog
 * (`src/dialogs/more-info/ha-more-info-dialog.ts` and `const.ts`).
 */
import type { HassEntity, HomeAssistant } from "./types";

export const computeDomain = (entityId: string): string =>
  entityId.substring(0, entityId.indexOf("."));

export const computeObjectId = (entityId: string): string =>
  entityId.substring(entityId.indexOf(".") + 1);

const EDITABLE_DOMAINS_WITH_ID = ["scene", "automation"];
const EDITABLE_DOMAINS_WITH_UNIQUE_ID = ["script"];
const DOMAINS_MORE_INFO_NO_HISTORY = ["camera", "configurator"];
const CONTINUOUS_DOMAINS = [
  "counter",
  "input_number",
  "number",
  "proximity",
  "sensor",
];

/** Domains with a dedicated more-info control (the only ones that get a history button natively). */
export const DOMAINS_WITH_MORE_INFO = [
  "alarm_control_panel",
  "automation",
  "camera",
  "climate",
  "configurator",
  "conversation",
  "counter",
  "cover",
  "date",
  "datetime",
  "fan",
  "group",
  "humidifier",
  "image",
  "input_boolean",
  "input_datetime",
  "lawn_mower",
  "light",
  "lock",
  "media_player",
  "person",
  "remote",
  "script",
  "scene",
  "siren",
  "sun",
  "switch",
  "time",
  "timer",
  "update",
  "vacuum",
  "valve",
  "water_heater",
  "weather",
];

export const isAdmin = (hass: HomeAssistant): boolean =>
  Boolean(hass.user?.is_admin);

const isComponentLoaded = (hass: HomeAssistant, component: string) =>
  hass.config.components.includes(component);

const showHistoryComponent = (hass: HomeAssistant, entityId: string) =>
  isComponentLoaded(hass, "history") &&
  !DOMAINS_MORE_INFO_NO_HISTORY.includes(computeDomain(entityId));

const showLogbookComponent = (hass: HomeAssistant, entityId: string) => {
  if (!isComponentLoaded(hass, "logbook")) return false;
  const stateObj = hass.states[entityId];
  if (!stateObj) return false;
  const domain = computeDomain(entityId);
  if (DOMAINS_MORE_INFO_NO_HISTORY.includes(domain)) return false;
  if (CONTINUOUS_DOMAINS.includes(domain)) return false;
  return true;
};

/**
 * `strict` applies the native rule (only domains with a dedicated control).
 * The popup's own entity uses the relaxed rule, since its body replaces the
 * native control that would otherwise show history inline (e.g. sensors).
 */
export const shouldShowHistory = (
  hass: HomeAssistant,
  entityId: string,
  strict: boolean,
): boolean =>
  (!strict || DOMAINS_WITH_MORE_INFO.includes(computeDomain(entityId))) &&
  (showHistoryComponent(hass, entityId) ||
    showLogbookComponent(hass, entityId));

export const shouldShowAddTo = (hass: HomeAssistant): boolean =>
  isAdmin(hass) || Boolean(hass.auth.external?.config.hasEntityAddTo);

export const getDeviceId = (
  hass: HomeAssistant,
  entityId: string,
): string | null => hass.entities[entityId]?.device_id ?? null;

/**
 * "Device info" / "Service info" menu label. Home Assistant 2026.11 replaced
 * `device_or_service_info` + `device_type.*` with `device_info` /
 * `service_info`; the old keys are kept for 2026.10.
 */
export const deviceInfoLabel = (
  hass: HomeAssistant,
  deviceType: "device" | "service",
): string =>
  hass.localize(`ui.dialogs.more_info_control.${deviceType}_info`) ||
  hass.localize("ui.dialogs.more_info_control.device_or_service_info", {
    type: hass.localize(
      `ui.dialogs.more_info_control.device_type.${deviceType}`,
    ),
  });

export const getDeviceType = (
  hass: HomeAssistant,
  deviceId: string | null,
): "device" | "service" =>
  (deviceId && hass.devices[deviceId]?.entry_type) === "service"
    ? "service"
    : "device";

export const shouldShowEdit = (stateObj: HassEntity | undefined): boolean => {
  if (!stateObj) return false;
  const domain = computeDomain(stateObj.entity_id);
  if (EDITABLE_DOMAINS_WITH_ID.includes(domain) && stateObj.attributes.id) {
    return true;
  }
  if (EDITABLE_DOMAINS_WITH_UNIQUE_ID.includes(domain)) return true;
  return domain === "person" && stateObj.attributes.editable !== "false";
};

/** Path of the config editor for automations, scenes, scripts and persons. */
export const computeEditPath = (
  stateObj: HassEntity,
  uniqueId: string | undefined,
): string | undefined => {
  const domain = computeDomain(stateObj.entity_id);
  let id: string | undefined = stateObj.entity_id;
  if (EDITABLE_DOMAINS_WITH_ID.includes(domain) || domain === "person") {
    id = stateObj.attributes.id;
  }
  if (EDITABLE_DOMAINS_WITH_UNIQUE_ID.includes(domain)) {
    id = uniqueId;
  }
  return id ? `/config/${domain}/edit/${id}` : undefined;
};

export const computeStateName = (stateObj: HassEntity): string =>
  stateObj.attributes.friendly_name ??
  stateObj.entity_id.substring(stateObj.entity_id.indexOf(".") + 1);

const deviceName = (
  hass: HomeAssistant,
  deviceId: string | null | undefined,
) => {
  const device = deviceId ? hass.devices[deviceId] : undefined;
  return device
    ? (device.name_by_user || device.name)?.trim() || undefined
    : undefined;
};

/**
 * Returns `[area, parent device, device, entity]` (empty parts removed),
 * following the same naming rules as the native breadcrumb
 * (`computeEntityEntryNameList`, `next_name_part`).
 */
export const computeEntityNameList = (
  hass: HomeAssistant,
  entityId: string,
): string[] => {
  const stateObj = hass.states[entityId];
  const entry = hass.entities[entityId];
  if (!entry) {
    return [stateObj ? computeStateName(stateObj) : entityId];
  }
  const device = entry.device_id ? hass.devices[entry.device_id] : undefined;
  const areaId = entry.area_id || device?.area_id;
  const area = areaId ? hass.areas[areaId]?.name : undefined;

  const fmt = (type: "entity" | "device") =>
    stateObj && hass.formatEntityName
      ? hass.formatEntityName(stateObj, { type }) || undefined
      : undefined;

  const devName = deviceName(hass, entry.device_id);
  let entityName =
    fmt("entity") ?? (stateObj ? computeStateName(stateObj) : undefined);
  if (entityName && devName && entityName === devName) {
    // The entity is named after its device.
    entityName = undefined;
  }
  const useDevice = entry.next_name_part === "device" || !entityName;
  const parent =
    useDevice && device?.next_name_part === "parent_device"
      ? deviceName(hass, device.parent_device_id)
      : undefined;

  return [area, parent, useDevice ? devName : undefined, entityName].filter(
    (part): part is string => Boolean(part),
  );
};

export const computeRTL = (hass: HomeAssistant): boolean =>
  Boolean(hass.translationMetadata?.translations?.[hass.language]?.isRTL);
