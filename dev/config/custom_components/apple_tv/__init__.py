"""Development stand-in for the apple_tv integration (docs and tests of the
state card remote): a media player and a remote on one device, so the card
finds the remote like with a real Apple TV. It overrides the built-in
integration in the dev instance only. Add it with
POST /api/config/config_entries/flow {"handler": "apple_tv"}.
"""
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

PLATFORMS = ["media_player", "remote"]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
