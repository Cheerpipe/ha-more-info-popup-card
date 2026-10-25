"""Device shared by the media player and the remote."""
from homeassistant.helpers.device_registry import DeviceInfo

DEVICE = DeviceInfo(
    identifiers={("apple_tv", "fake-apple-tv")},
    name="Living Room Apple TV",
    manufacturer="Apple",
    model="Apple TV 4K (dev stand-in)",
)
