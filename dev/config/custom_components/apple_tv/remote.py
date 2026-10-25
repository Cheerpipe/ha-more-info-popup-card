import time

from homeassistant.components.remote import (
    ATTR_DELAY_SECS,
    ATTR_HOLD_SECS,
    ATTR_NUM_REPEATS,
    RemoteEntity,
)

from .const import DEVICE


async def async_setup_entry(hass, entry, async_add_entities):
    async_add_entities([FakeAppleTvRemote()])


class FakeAppleTvRemote(RemoteEntity):
    """Records what it receives in the `commands` attribute."""

    _attr_has_entity_name = True
    _attr_name = None
    _attr_unique_id = "fake-apple-tv-remote"
    _attr_device_info = DEVICE
    _attr_is_on = True

    def __init__(self):
        self._log = []

    @property
    def extra_state_attributes(self):
        return {"commands": self._log[-30:]}

    async def async_send_command(self, command, **kwargs):
        for single in command:
            self._log.append(
                f"{time.strftime('%H:%M:%S')} {single}"
                f" x{kwargs.get(ATTR_NUM_REPEATS)}"
                f" delay={kwargs.get(ATTR_DELAY_SECS)}"
                f" hold={kwargs.get(ATTR_HOLD_SECS)}"
            )
        self.async_write_ha_state()
