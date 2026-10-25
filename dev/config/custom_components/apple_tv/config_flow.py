from homeassistant import config_entries


class FakeAppleTvFlow(config_entries.ConfigFlow, domain="apple_tv"):
    VERSION = 1

    async def async_step_user(self, user_input=None):
        await self.async_set_unique_id("fake-apple-tv")
        self._abort_if_unique_id_configured()
        return self.async_create_entry(title="Living Room Apple TV", data={})
