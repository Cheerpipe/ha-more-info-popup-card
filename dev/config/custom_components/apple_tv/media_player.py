from homeassistant.components.media_player import (
    MediaPlayerEntity,
    MediaPlayerEntityFeature as F,
    MediaPlayerState,
    MediaType,
)
from homeassistant.util import dt as dt_util

from .art import COVER
from .const import DEVICE


async def async_setup_entry(hass, entry, async_add_entities):
    async_add_entities([FakeAppleTv()])


class FakeAppleTv(MediaPlayerEntity):
    _attr_has_entity_name = True
    _attr_name = None
    _attr_unique_id = "fake-apple-tv-mp"
    _attr_device_info = DEVICE
    _attr_supported_features = (
        F.PLAY | F.PAUSE | F.TURN_ON | F.TURN_OFF | F.VOLUME_STEP | F.VOLUME_MUTE
        | F.NEXT_TRACK | F.PREVIOUS_TRACK | F.SEEK
    )
    _attr_media_content_type = MediaType.MOVIE
    _attr_media_title = "Winter Kingdom"
    _attr_app_name = "Apple TV+"
    _attr_media_duration = 6153
    _attr_is_volume_muted = False
    # Served by async_get_media_image (through the media player proxy).
    _attr_media_image_url = "fake-apple-tv://cover"
    _attr_media_image_remotely_accessible = False

    def __init__(self):
        self._attr_state = MediaPlayerState.PLAYING
        self._attr_media_position = 4169
        self._attr_media_position_updated_at = dt_util.utcnow()

    async def async_get_media_image(self):
        return COVER, "image/png"

    def _set_position(self, position):
        self._attr_media_position = position
        self._attr_media_position_updated_at = dt_util.utcnow()

    async def async_media_play(self):
        self._set_position(self.media_position)
        self._attr_state = MediaPlayerState.PLAYING
        self.async_write_ha_state()

    async def async_media_pause(self):
        elapsed = (dt_util.utcnow() - self._attr_media_position_updated_at).total_seconds()
        self._set_position(self._attr_media_position + elapsed)
        self._attr_state = MediaPlayerState.PAUSED
        self.async_write_ha_state()

    async def async_media_seek(self, position):
        self._set_position(position)
        self.async_write_ha_state()

    async def async_turn_on(self):
        self._attr_state = MediaPlayerState.IDLE
        self.async_write_ha_state()

    async def async_turn_off(self):
        self._attr_state = MediaPlayerState.OFF
        self.async_write_ha_state()

    async def async_mute_volume(self, mute):
        self._attr_is_volume_muted = mute
        self.async_write_ha_state()
