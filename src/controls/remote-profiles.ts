/**
 * What the remote control sends to each kind of device, and how it finds the
 * remote entity of a media player (and the other way round) through the
 * device they share in the registry.
 */
import { computeDomain } from "../ha/entity";
import type { HomeAssistant } from "../ha/types";

/** Keys of the remote, named after what they do. */
export type RemoteKey =
  | "up"
  | "down"
  | "left"
  | "right"
  | "select"
  | "back"
  | "home"
  | "play_pause"
  | "volume_up"
  | "volume_down"
  | "power_on"
  | "power_off";

export interface RemoteProfile {
  /** `remote.send_command` command of each key. */
  commands: Record<RemoteKey, string>;
  /** Keys that take a long press (`hold_secs`). */
  holdable: readonly RemoteKey[];
}

/**
 * `apple_tv` integration (`components/apple_tv/remote.py`): pyatv
 * `RemoteControl` methods, plus `turn_on` / `turn_off` and the volume keys
 * it maps to the power and audio interfaces. Arrows, select, menu and home
 * take `InputAction.Hold` when `hold_secs >= 1` (holding TV opens Control
 * Center, holding select opens the context menu).
 */
const APPLE_TV: RemoteProfile = {
  commands: {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
    select: "select",
    back: "menu",
    home: "home",
    play_pause: "play_pause",
    volume_up: "volume_up",
    volume_down: "volume_down",
    power_on: "turn_on",
    power_off: "turn_off",
  },
  holdable: ["up", "down", "left", "right", "select", "back", "home"],
};

export const REMOTE_PROFILES: Partial<Record<string, RemoteProfile>> = {
  apple_tv: APPLE_TV,
};

/**
 * Profile of a remote entity. Remotes of other integrations get the Apple TV
 * command names, the only ones supported for now.
 */
export const remoteProfile = (
  hass: HomeAssistant,
  remoteId: string,
): RemoteProfile =>
  REMOTE_PROFILES[hass.entities?.[remoteId]?.platform ?? ""] ?? APPLE_TV;

/** Entity of `domain` on the same device as `entityId`. */
const sibling = (
  hass: HomeAssistant,
  entityId: string,
  domain: string,
): string | undefined => {
  const entry = hass.entities?.[entityId];
  if (!entry?.device_id) return undefined;
  return Object.values(hass.entities).find(
    (other) =>
      other.device_id === entry.device_id &&
      other.platform === entry.platform &&
      computeDomain(other.entity_id) === domain &&
      hass.states[other.entity_id] !== undefined,
  )?.entity_id;
};

/** Remote of a media player whose integration has a profile. */
export const companionRemote = (
  hass: HomeAssistant,
  mediaPlayerId: string,
): string | undefined => {
  const platform = hass.entities?.[mediaPlayerId]?.platform;
  if (!platform || !REMOTE_PROFILES[platform]) return undefined;
  return sibling(hass, mediaPlayerId, "remote");
};

/** Media player of the device of a remote (now playing, power, mute). */
export const companionMediaPlayer = (
  hass: HomeAssistant,
  remoteId: string,
): string | undefined => sibling(hass, remoteId, "media_player");

/**
 * Remote shown with a media player for its `remote` option: `auto` (the
 * default) finds the remote of supported integrations, `none` hides it, an
 * entity id uses that remote.
 */
export const resolveRemote = (
  hass: HomeAssistant | undefined,
  mediaPlayerId: string,
  option: string | undefined,
): string | undefined => {
  if (!hass || option === "none") return undefined;
  if (option && option !== "auto") return option;
  return companionRemote(hass, mediaPlayerId);
};
