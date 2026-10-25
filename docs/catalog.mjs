// Single source of truth for the documentation: every example below is
// installed in the "Popup docs" dashboard of the dev Home Assistant
// (`node dev/docs.mjs dashboard`), captured to docs/images/<id>.png and rendered
// into docs/*.md (`node dev/docs.mjs markdown`). Entities come from HA's `demo`
// integration.

const POPUP = "custom:more-info-popup-card";
const STATE = "custom:more-info-state-card";
const CONTROLS = "custom:more-info-controls-card";

const tile = (entity, extra = {}) => ({ type: "tile", entity, ...extra });
const heading = (text, extra = {}) => ({
  type: "heading",
  heading: text,
  ...extra,
});
const state = (entity, extra = {}) => ({ type: STATE, entity, ...extra });
const controls = (items, extra = {}) => ({
  type: CONTROLS,
  controls: items,
  ...extra,
});

/** A popup example. `open` / `setup` describe how the screenshot is taken. */
const popup = (id, title, text, config, opts = {}) => ({
  id,
  title,
  text,
  kind: "popup",
  config: { type: POPUP, popup_id: id, ...config },
  ...opts,
});

/**
 * An example shown only as YAML: its entities are not in the `demo`
 * integration, so it is not installed in the docs dashboard nor captured.
 */
const snippet = (id, title, text, yaml) => ({
  id,
  title,
  text,
  kind: "snippet",
  yaml,
});

/** A popup whose body is a single building-block card (for the card pages). */
const inPopup = (id, title, text, entity, cards, opts = {}) =>
  popup(
    id,
    title,
    text,
    { entity, cards },
    { yaml: cards.length === 1 ? cards[0] : cards, ...opts },
  );

const vacuum = "vacuum.demo_vacuum_0_ground_floor";

export const PAGES = [
  // ---------------------------------------------------------------------------
  {
    file: "popup-card.md",
    title: "Popup card",
    intro:
      "`custom:more-info-popup-card` is a container: it is invisible on the dashboard and opens as a popup that uses Home Assistant's own more-info dialog. Its body is a sections grid of any cards.",
    sections: [
      {
        title: "Basics",
        examples: [
          popup(
            "basic",
            "A popup without entity",
            "Only `popup_id` and `cards` are needed. Open it with a Navigate action to `#basic`.",
            {
              name: "Living room",
              cards: [
                heading("Lights"),
                tile("light.ceiling_lights"),
                tile("light.living_room_rgbww_lights"),
                tile("light.bed_light"),
                tile("switch.decorative_lights"),
              ],
            },
          ),
          popup(
            "with_entity",
            "Bound to an entity",
            "With `entity`, the header shows the native history, settings and ⋮ menu, and the title, breadcrumb and views follow that entity.",
            {
              entity: "light.ceiling_lights",
              cards: [
                tile("light.ceiling_lights", {
                  features: [{ type: "light-brightness" }],
                  grid_options: { columns: 12 },
                }),
                tile("light.living_room_rgbww_lights"),
                tile("light.bed_light"),
              ],
            },
          ),
          popup(
            "breadcrumb_text",
            "Custom title and breadcrumb",
            "`name` replaces the title and `breadcrumb` the text above it (`auto` = area ▸ device, `none`, or any text).",
            {
              name: "Kitchen",
              breadcrumb: "Ground floor",
              icon: "mdi:silverware-fork-knife",
              cards: [
                tile("light.kitchen_lights"),
                tile("switch.decorative_lights"),
              ],
            },
          ),
          popup(
            "no_header_actions",
            "Entity without header buttons",
            "`show_header_actions: false` keeps the entity title but hides history, settings and the menu.",
            {
              entity: "climate.ecobee",
              show_header_actions: false,
              cards: [
                tile("climate.ecobee", {
                  features: [{ type: "target-temperature" }],
                }),
                tile("sensor.outside_temperature"),
              ],
            },
          ),
        ],
      },
      {
        title: "Size",
        examples: [
          popup("width_small", "Small", "`width: small` (320 px).", {
            name: "Small popup",
            width: "small",
            cards: [
              tile("light.bed_light", { grid_options: { columns: 12 } }),
              tile("switch.decorative_lights", {
                grid_options: { columns: 12 },
              }),
            ],
          }),
          popup(
            "width_large",
            "Large with a 24-column grid",
            "`column_span: 2` gives a 24-column grid (two dashboard sections wide) and opens a large dialog.",
            {
              name: "Climate",
              column_span: 2,
              cards: [
                tile("climate.hvac", {
                  features: [{ type: "target-temperature" }],
                }),
                tile("climate.ecobee"),
                {
                  type: "weather-forecast",
                  entity: "weather.demo_weather_south",
                  grid_options: { columns: 12 },
                },
                tile("sensor.outside_temperature"),
                tile("sensor.outside_humidity"),
              ],
            },
          ),
          popup(
            "width_custom",
            "Custom width",
            "`width: custom` with any CSS length in `custom_width`.",
            {
              name: "720 px wide",
              width: "custom",
              custom_width: "720px",
              cards: [
                tile("light.ceiling_lights"),
                tile("light.kitchen_lights"),
                tile("light.bed_light"),
                tile("light.office_rgbw_lights"),
              ],
            },
          ),
          popup(
            "height_custom",
            "Custom height",
            "`height: custom` with `min_height` / `max_height` (here both `60vh`). Longer content scrolls inside, with the native scroll fades.",
            {
              name: "Fixed height",
              height: "custom",
              min_height: "60vh",
              max_height: "60vh",
              cards: [
                heading("Lights"),
                tile("light.ceiling_lights"),
                tile("light.kitchen_lights"),
                tile("light.bed_light"),
                tile("light.office_rgbw_lights"),
              ],
            },
          ),
          popup(
            "align_center",
            "Centered cards without borders",
            "`vertical_align: center` and `horizontal_align: center` place the cards in the middle of a popup taller than its content (a custom height, or the full-height bottom sheet on a phone); `horizontal_align` affects rows narrower than the grid. `card_borders: false` removes the border and shadow of the cards, like the native more-info.",
            {
              name: "Bedroom",
              height: "custom",
              min_height: "50vh",
              vertical_align: "center",
              horizontal_align: "center",
              card_borders: false,
              cards: [
                tile("light.bed_light", { grid_options: { columns: 6 } }),
              ],
            },
          ),
          popup(
            "zones",
            "Header, main and footer",
            "`layout: zones` splits the popup in three: the `header` and `footer` stay pinned at the top and bottom, and the main `cards` take the free height between them (and scroll when they do not fit). Each zone has its own `vertical_align` and `horizontal_align`; the header and footer also take a `min_height`. The main zone uses the top-level options. Give the popup a height (or open it as the full-height bottom sheet on a phone) so the main zone has room to fill. In the visual editor, the zones are drawn as a frame, and cards can be dragged between them.",
            {
              name: "Bed light",
              entity: "light.bed_light",
              height: "custom",
              min_height: "70vh",
              layout: "zones",
              card_borders: false,
              vertical_align: "center",
              header: {
                horizontal_align: "right",
                cards: [
                  tile("switch.decorative_lights", {
                    grid_options: { columns: 6 },
                  }),
                ],
              },
              cards: [state("light.bed_light")],
              footer: {
                cards: [
                  tile("light.kitchen_lights", {
                    grid_options: { columns: 6 },
                  }),
                  tile("light.ceiling_lights", {
                    grid_options: { columns: 6 },
                  }),
                ],
              },
            },
          ),
        ],
      },
      {
        title: "Presentation",
        examples: [
          popup(
            "sheet_desktop",
            "Bottom sheet on desktop",
            "`mode: bottom_sheet` always slides up from the bottom, with the native drag handle. `mode: top_sheet` is the same sheet dropping from the top like a marquee, with the handle at the bottom: swipe up to close.",
            {
              name: "Kitchen",
              mode: "bottom_sheet",
              cards: [
                tile("light.kitchen_lights"),
                tile("switch.decorative_lights"),
              ],
            },
          ),
          popup(
            "auto_mobile",
            "Automatic on a phone",
            "`mode: auto` (default) behaves like Home Assistant: dialog on large screens, bottom sheet on phones.",
            {
              entity: "light.ceiling_lights",
              cards: [
                tile("light.ceiling_lights"),
                tile("light.bed_light"),
                tile("climate.ecobee"),
                tile("sensor.outside_temperature"),
              ],
            },
            { viewport: "mobile" },
          ),
          popup(
            "dialog_mobile",
            "Dialog forced on a phone",
            "`mode: dialog` keeps the dialog; like native dialogs it becomes full screen on small phones.",
            {
              name: "Dialog",
              mode: "dialog",
              cards: [tile("light.ceiling_lights"), tile("light.bed_light")],
            },
            { viewport: "mobile" },
          ),
        ],
      },
      {
        title: "Entity views",
        text: "With an entity, the header buttons open the native views inside the popup, with the back arrow, exactly like the more-info dialog.",
        examples: [
          popup(
            "view_history",
            "History",
            "Chart button.",
            {
              entity: "sensor.outside_temperature",
              replace_more_info: true,
              cards: [tile("sensor.outside_temperature")],
            },
            { open: { view: "history" } },
          ),
          popup(
            "view_settings",
            "Settings",
            "Cog button (admins).",
            {
              entity: "light.kitchen_lights",
              replace_more_info: true,
              cards: [tile("light.kitchen_lights")],
            },
            { open: { view: "settings" } },
          ),
          popup(
            "view_related",
            "Related",
            "Menu ▸ Related, or click the breadcrumb.",
            {
              entity: "light.office_rgbw_lights",
              replace_more_info: true,
              cards: [tile("light.office_rgbw_lights")],
            },
            { open: { view: "related" } },
          ),
          popup(
            "view_details",
            "Details / attributes",
            "Menu ▸ Details, with the YAML toggle.",
            {
              entity: "climate.heatpump",
              replace_more_info: true,
              cards: [tile("climate.heatpump")],
            },
            { open: { view: "details" } },
          ),
          popup(
            "view_menu",
            "The ⋮ menu",
            "Same entries as the native menu, plus **Entity controls** (the native more-info of the entity).",
            {
              entity: "light.entrance_color_white_lights",
              cards: [tile("light.entrance_color_white_lights")],
            },
            { setup: "menu" },
          ),
          popup(
            "nested_inline",
            "Entities opened from inside",
            "`nested_more_info: inline` (default): a card inside the popup that opens a more-info navigates inside the popup, with the back arrow. Use `dialog` to open a separate dialog instead.",
            {
              name: "Lights",
              cards: [
                tile("light.living_room_rgbww_lights"),
                tile("light.bed_light"),
              ],
            },
            { setup: "nested:light.living_room_rgbww_lights" },
          ),
        ],
      },
      {
        title: "Opening a popup",
        text: "A popup is available on the views where its card is placed.",
        examples: [
          {
            id: "trigger_navigate",
            kind: "text",
            title: "Navigate action",
            text: "From any card, badge or button. The hash is consumed, so the browser history keeps a single entry and Back closes the popup.",
            yaml: tile("light.ceiling_lights", {
              tap_action: { action: "navigate", navigation_path: "#basic" },
            }),
          },
          {
            id: "trigger_replace",
            kind: "text",
            title: "Replace an entity's more-info",
            text: "With `replace_more_info: true`, anything on the view that opens the entity's more-info (tiles, the search, history…) opens the popup instead. Requested views (history, settings…) open inside the popup.",
            yaml: {
              type: POPUP,
              popup_id: "living_room",
              entity: "light.ceiling_lights",
              replace_more_info: true,
              cards: [],
            },
          },
          {
            id: "trigger_template",
            kind: "text",
            title: "One popup for many entities",
            text: "This single card makes every WLED light on the view (each segment and the main light) open the WLED card instead of the native more-info. With `match`, one popup replaces the more-info of every entity it matches: `integration` (the integration that provides the entity), `domain` and `entity_glob` (`*` matches any text) must all match, and `entities` are always included. The opened entity becomes the popup's entity (title, history, settings, menu) and replaces `this` in `entity: this`, `entity_id: this` and `entities` lists of the cards. When several popups match, the one with that `entity` wins, then an `entities` entry, then the one with more criteria.",
            yaml: {
              type: POPUP,
              popup_id: "wled_lights",
              replace_more_info: true,
              match: { integration: "wled", domain: "light" },
              cards: [
                { type: "custom:more-info-wled-state-card", entity: "this" },
              ],
            },
          },
          {
            id: "trigger_template_covers",
            kind: "text",
            title: "Any domain or integration",
            text: "The same works for any integration or domain, for example every cover on the view. `entity_glob` narrows it down by entity ID (`light.living_room_*`).",
            yaml: {
              type: POPUP,
              popup_id: "covers",
              replace_more_info: true,
              match: { domain: "cover" },
              cards: [
                state("this"),
                tile("this", { features: [{ type: "cover-open-close" }] }),
              ],
            },
          },
          {
            id: "trigger_dom_event",
            kind: "text",
            title: "fire-dom-event",
            text: "`open`, `close` (optionally with an id) and `toggle`. `open` and `toggle` also take an `entity` for popups that use `entity: this`.",
            yaml: {
              type: "button",
              name: "Toggle living room",
              tap_action: {
                action: "fire-dom-event",
                more_info_popup: { toggle: "living_room" },
              },
            },
          },
          {
            id: "trigger_link",
            kind: "text",
            title: "Links and bookmarks",
            text: "`/dashboard/view#living_room` opens the popup when the view loads.",
          },
        ],
      },
      {
        title: "Behavior",
        examples: [
          {
            id: "behavior_options",
            kind: "text",
            title: "Closing and lifecycle",
            text: "`dismissable: false` ignores Esc, outside clicks and swipes (the ✕ still closes). `auto_close` closes after N seconds without interaction. `keep_alive` keeps the cards loaded while closed for a faster reopen.",
            yaml: {
              type: POPUP,
              popup_id: "doorbell",
              dismissable: false,
              auto_close: 30,
              keep_alive: true,
              cards: [],
            },
          },
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    file: "state-card.md",
    title: "State card",
    intro:
      "`custom:more-info-state-card` renders the top of a native more-info: the state header (state and last changed) and the big native control. `control: auto` picks the same control as Home Assistant; any other value forces one.",
    sections: [
      {
        title: "Controls",
        text: "Lights get the whole native light control: the brightness slider, the button bar (power, brightness, color, color temperature, white) and the favorite colors; on/off lights get the lightbulb toggle. Entities whose more-info is a view of its own (camera, conversation, counter, date, datetime, group, image, input_datetime, person, remote, sun, time, timer, update, weather) and those whose more-info is only the state row (number, select, text, scene and the `input_*` helpers) use `control: more_info`: the native more-info content itself, under the native state row where more-info shows one. The state header is then hidden by default (`show_state: true` adds it back). On a full-height sheet, the control sits in the free height like in more-info. Scripts, buttons and automations, which more-info only gives plain buttons, get `control: trigger`: a momentary switch with the shape, size and colors of the toggle. Tapping it sends the handle up in the state color, confirms with a check (or an error) and drops it back; a running script keeps it up and breathing, with Cancel below (`show_cancel: false` hides it). Automations run their actions (conditions skipped, like more-info) and get an on/off button below; scripts with fields show the native fields form, and the switch waits for the required ones. The header says when it last ran or was pressed. `control: script` and `control: press` keep the plain native buttons. `control: push` is the same action as one big stateless push button, lit only while the action happens (the press, a running script); `button_layout` shapes it: `vertical` (like the toggle, default), `horizontal`, `square` or `circle`. `icon` (and `icon_off` for the toggle) replace the entity icon of the toggle, trigger and push controls; `color` and `color_off` recolor the native control through the state color variables it reads, so they reach every control that uses the state color.",
        examples: [
          inPopup(
            "state_toggle",
            "toggle",
            "Switches, input booleans, sirens. Lights without brightness use the lightbulb icons; sirens get the volume icons and, when they have tones, volume or duration, the native More controls dialog.",
            "switch.decorative_lights",
            [state("switch.decorative_lights")],
          ),
          inPopup(
            "state_brightness",
            "brightness",
            "Lights with brightness, with the native button bar and favorite colors. The header shows the brightness like more-info.",
            "light.ceiling_lights",
            [state("light.ceiling_lights")],
          ),
          inPopup(
            "state_fan_speed",
            "fan_speed",
            "Fans with speeds (segments for few speeds, a slider otherwise).",
            "fan.living_room_fan",
            [state("fan.living_room_fan")],
          ),
          inPopup(
            "state_position",
            "position",
            "Covers with position, like more-info: position and tilt sliders side by side, the switch to the open / stop / close buttons and the favorite positions. Open / close-only covers get the toggle. Header: state · position.",
            "cover.hall_window",
            [state("cover.hall_window")],
          ),
          inPopup(
            "state_tilt",
            "tilt",
            "Cover tilt position alone: a forced control shows only that control, without the mode switch or favorites.",
            "cover.pergola_roof",
            [state("cover.pergola_roof", { control: "tilt" })],
          ),
          inPopup(
            "state_cover_buttons",
            "cover_buttons",
            "Open / stop / close buttons, forced here on an open / close-only cover (which gets the toggle by default).",
            "cover.garage_door",
            [state("cover.garage_door", { control: "cover_buttons" })],
          ),
          inPopup(
            "state_valve_position",
            "valve_position",
            "Valves with position, with the switch to the buttons and the favorite positions like more-info.",
            "valve.back_garden",
            [state("valve.back_garden")],
          ),
          inPopup(
            "state_valve_toggle",
            "valve_toggle",
            "Open / close valves without position (with stop they get `valve_buttons`).",
            "valve.front_garden",
            [state("valve.front_garden")],
          ),
          inPopup(
            "state_lock",
            "lock",
            "Lock toggle. Locks that open get the Open button (tap twice to confirm); a jammed lock shows its pulsing icon with Unlock / Lock. Codes are asked with the native code dialog unless the entity has a default code.",
            "lock.front_door",
            [state("lock.front_door")],
          ),
          inPopup(
            "state_alarm",
            "alarm_modes",
            "Alarm panel modes. While arming, pending or triggered: the pulsing state icon and the Disarm button (native code dialog).",
            "alarm_control_panel.security",
            [state("alarm_control_panel.security")],
          ),
          inPopup(
            "state_temperature",
            "temperature",
            "Thermostat dial. Climate has no state header natively.",
            "climate.ecobee",
            [state("climate.ecobee")],
          ),
          inPopup(
            "state_climate_humidity",
            "climate_humidity",
            "Target humidity of a climate entity.",
            "climate.hvac",
            [state("climate.hvac", { control: "climate_humidity" })],
          ),
          inPopup(
            "state_humidity",
            "humidity",
            "Humidifiers.",
            "humidifier.hygrostat",
            [state("humidifier.hygrostat")],
          ),
          inPopup(
            "state_water_heater",
            "water_heater",
            "Water heaters.",
            "water_heater.demo_water_heater_celsius",
            [state("water_heater.demo_water_heater_celsius")],
          ),
          inPopup(
            "state_vacuum",
            "vacuum_status",
            "Vacuum illustration (animated while cleaning), the command buttons (start / pause, stop, return home, locate, clean spot) and Cleaning by area, which opens the native view inside the popup. The header shows the status and the device battery. The fan speed is left to the controls card. Lawn mowers get start / pause, stop and dock.",
            vacuum,
            [state(vacuum)],
          ),
        ],
      },
      {
        title: "Remote",
        text: [
          "Media players of the Apple TV integration get the remote of their device: a **Now playing / Remote** switch above the native media player control. Nothing to configure (`remote: auto`); other media players are unchanged. The Remote view draws the Siri Remote with the shapes and colors of the native controls.",
          "",
          "- **Clickpad.** The ring clicks the arrows (held, they repeat). The center works like the touch surface as far as the integration allows: it only takes key presses, so a drag sends one arrow every few millimeters, a fast flick adds a few more, and a finger that stays still after a drag keeps scrolling that way. A tap is select; a long press holds select (context menu). Arrow keys and Enter drive the focused clickpad.",
          "- **Buttons.** Back, TV (held: Control Center), play / pause, mute and the volume pill. The pill steps with a tap on + or −, repeats while held, and also takes a swipe up or down anywhere on it: a step every few millimeters, then on while the finger stays still, with the pill stretching toward where the volume goes. Mute uses `media_player.volume_mute` and shows when the media player supports it.",
          "- **Now playing strip.** Cover, title, power and, for media players that can seek, a seek slider: it follows the playback, shows the target time while dragged and seeks on release (arrow keys jump 10 s). `seek_color` colors it: `theme` (default), `art` (the dominant color of the cover, kept readable on light and dark themes) or any theme or CSS color.",
          "- **Commands.** They go through `remote.send_command` one call at a time, merged with `num_repeats` when they come faster than the device answers; repeats still waiting are dropped when the finger leaves, so the focus stops with it.",
          "- **Haptics.** Keys and gestures give haptic feedback in the companion apps (and vibrate in Android browsers); `haptics: false` turns it off.",
          "",
          "| Option | Default | |",
          "| --- | --- | --- |",
          "| `remote` | `auto` | `auto` finds the remote of the device (Apple TV), `none` hides it, a `remote.*` entity uses that remote, and another media player uses the remote of its device (for `universal`, group or template media players) |",
          "| `remote_view` | `now_playing` | View the media player opens on: `now_playing` or `remote` |",
          "| `audio_entity` | | Media player that takes the volume and mute instead of the remote (an AVR or sound system) |",
          "| `seek_color` | `theme` | `theme`, `art` or a color |",
          "| `haptics` | `true` | Haptic feedback of keys and gestures |",
          "",
          "`control: remote` shows the remote alone. The visual editor lists the remotes and Apple TV media players for `remote`. The screenshots use the stand-in Apple TV of the dev instance (`dev/config/custom_components/apple_tv`).",
        ].join("\n"),
        examples: [
          inPopup(
            "state_remote",
            "Remote view",
            "The Remote view of an Apple TV media player, with the seek slider in the color of the cover.",
            "media_player.living_room_apple_tv",
            [
              state("media_player.living_room_apple_tv", {
                remote_view: "remote",
                seek_color: "art",
              }),
            ],
          ),
          inPopup(
            "state_remote_now_playing",
            "Now playing view",
            "Opened on the native media player (the default), with the switch to the remote above it.",
            "media_player.living_room_apple_tv",
            [state("media_player.living_room_apple_tv")],
          ),
          inPopup(
            "state_remote_phone",
            "On a phone",
            "The same remote in the bottom sheet of a phone.",
            "media_player.living_room_apple_tv",
            [
              state("media_player.living_room_apple_tv", {
                remote_view: "remote",
                seek_color: "art",
              }),
            ],
            { viewport: "mobile" },
          ),
          inPopup(
            "state_remote_control",
            "Remote alone",
            "`control: remote` on the `remote.*` entity (or on a media player with one): only the remote, with the Now playing strip of the media player of the same device.",
            "remote.living_room_apple_tv",
            [state("remote.living_room_apple_tv", { control: "remote" })],
          ),
          snippet(
            "state_remote_universal",
            "Universal media player with an AVR",
            "A shared setup: a `universal` media player in front of the Apple TV, and an AVR that handles the volume. `remote` points at the Apple TV media player (its device has the remote), and `audio_entity` sends the volume pill and mute to the AVR. The native Now playing view still controls the volume of the card's entity: route it to the AVR in the `universal` config (`commands` and `attributes`).",
            state("media_player.living_room_tv", {
              remote: "media_player.living_room_apple_tv",
              audio_entity: "media_player.living_room_receiver",
              remote_view: "remote",
            }),
          ),
        ],
      },
      {
        title: "Options",
        examples: [
          inPopup(
            "state_override",
            "Custom state text",
            "`state_override` replaces the state text, and the button text of the trigger, push, press and script controls.",
            "light.kitchen_lights",
            [
              state("light.kitchen_lights", {
                state_override: "Cooking light",
              }),
            ],
          ),
          inPopup(
            "state_no_time",
            "Without last changed",
            "`show_last_changed: false` keeps only the state.",
            "switch.ac",
            [state("switch.ac", { show_last_changed: false })],
          ),
          inPopup(
            "state_header_only",
            "Header only",
            "`control: none`.",
            "sensor.outside_temperature",
            [state("sensor.outside_temperature", { control: "none" })],
          ),
          inPopup(
            "state_force_toggle",
            "A different control",
            "Force `toggle` on a dimmable light.",
            "light.office_rgbw_lights",
            [state("light.office_rgbw_lights", { control: "toggle" })],
          ),
          inPopup(
            "state_no_header",
            "Control only",
            "`show_state: false`.",
            "light.bed_light",
            [state("light.bed_light", { show_state: false })],
          ),
          inPopup(
            "state_card",
            "Card appearance",
            "`appearance: card` draws a regular card (default `plain` has no frame, like more-info).",
            "fan.ceiling_fan",
            [state("fan.ceiling_fan", { appearance: "card" })],
          ),
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    file: "controls-card.md",
    title: "Controls card",
    intro:
      "`custom:more-info-controls-card` renders the row of chips at the bottom of a native more-info, and the command buttons above it. Item `type` is inferred when omitted: `select` for select entities and attributes, `number` for number entities, `toggle` for toggleable entities, `action` otherwise.",
    sections: [
      {
        title: "Select chips",
        text: "Native `ha-control-select-menu` chips calling the same service as the native control.",
        examples: [
          inPopup(
            "select_entity",
            "select / input_select entity",
            "The state is the selected option.",
            "select.speed",
            [controls([{ entity: "select.speed" }])],
          ),
          inPopup(
            "select_open",
            "The dropdown",
            "Options with their icons, current one highlighted.",
            "climate.ecobee",
            [
              controls([
                { entity: "climate.ecobee", attribute: "preset_mode" },
              ]),
            ],
            { setup: "select" },
          ),
          inPopup(
            "select_light",
            "Light effect",
            "`attribute: effect` → `light.turn_on`.",
            "light.bed_light",
            [controls([{ entity: "light.bed_light", attribute: "effect" }])],
          ),
          inPopup(
            "select_fan",
            "Fan: preset, direction, oscillation",
            "`preset_mode`, `direction` and `oscillating` (on / off as a select, like more-info).",
            "fan.living_room_fan",
            [
              controls([
                { entity: "fan.living_room_fan", attribute: "preset_mode" },
                { entity: "fan.living_room_fan", attribute: "direction" },
                { entity: "fan.living_room_fan", attribute: "oscillating" },
              ]),
            ],
          ),
          inPopup(
            "select_climate",
            "Climate modes",
            "`hvac_mode`, `preset_mode`, `fan_mode`, `swing_mode` (and `swing_horizontal_mode`).",
            "climate.ecobee",
            [
              controls([
                { entity: "climate.ecobee", attribute: "hvac_mode" },
                { entity: "climate.ecobee", attribute: "preset_mode" },
                { entity: "climate.ecobee", attribute: "fan_mode" },
                { entity: "climate.ecobee", attribute: "swing_mode" },
              ]),
            ],
          ),
          inPopup(
            "select_vacuum",
            "Vacuum fan speed",
            "`attribute: fan_speed`.",
            vacuum,
            [controls([{ entity: vacuum, attribute: "fan_speed" }])],
          ),
          inPopup(
            "select_humidifier",
            "Humidifier state and mode",
            "`attribute: state` (on / off) and `mode`.",
            "humidifier.hygrostat",
            [
              controls([
                { entity: "humidifier.hygrostat", attribute: "state" },
                { entity: "humidifier.hygrostat", attribute: "mode" },
              ]),
            ],
          ),
          inPopup(
            "select_water_heater",
            "Water heater",
            "`operation_mode` and `away_mode`.",
            "water_heater.demo_water_heater",
            [
              controls([
                {
                  entity: "water_heater.demo_water_heater",
                  attribute: "operation_mode",
                },
                {
                  entity: "water_heater.demo_water_heater",
                  attribute: "away_mode",
                },
              ]),
            ],
          ),
          inPopup(
            "select_media",
            "Media player",
            "`source` and `sound_mode`.",
            "media_player.lounge_room",
            [
              controls([
                { entity: "media_player.lounge_room", attribute: "source" },
                { entity: "media_player.lounge_room", attribute: "sound_mode" },
              ]),
            ],
          ),
        ],
      },
      {
        title: "Customizing selects",
        examples: [
          inPopup(
            "select_options",
            "Filter, order, rename and re-icon",
            "`options` keeps only the listed values in that order; objects rename them and change their icons. `name` and `icon` change the chip.",
            vacuum,
            [
              controls([
                {
                  entity: vacuum,
                  attribute: "fan_speed",
                  name: "Suction",
                  icon: "mdi:weather-windy",
                  options: [
                    { value: "min", name: "Quiet", icon: "mdi:fan-speed-1" },
                    {
                      value: "medium",
                      name: "Normal",
                      icon: "mdi:fan-speed-2",
                    },
                    { value: "max", name: "Turbo", icon: "mdi:fan-speed-3" },
                  ],
                },
                {
                  entity: "climate.ecobee",
                  attribute: "hvac_mode",
                  name: "Mode",
                  options: ["off", "heat_cool", "cool"],
                },
              ]),
            ],
            { setup: "select" },
          ),
          inPopup(
            "select_custom_action",
            "Your own options and action",
            "Any list of options sent to any action: `perform_action` + `data_key` (+ `data`).",
            "light.bed_light",
            [
              controls([
                {
                  type: "select",
                  entity: "light.bed_light",
                  name: "Scene",
                  icon: "mdi:palette",
                  options: [
                    {
                      value: "orange",
                      name: "Warm",
                      icon: "mdi:white-balance-sunny",
                    },
                    { value: "white", name: "White", icon: "mdi:lightbulb" },
                    { value: "blue", name: "Blue", icon: "mdi:weather-night" },
                  ],
                  perform_action: "light.turn_on",
                  data_key: "color_name",
                },
              ]),
            ],
          ),
        ],
      },
      {
        title: "Visibility",
        text: "Each item takes `visibility`: the same conditions as a card's Visibility tab (`state`, `numeric_state`, `screen`, `user`, `time`, `location`, and `and` / `or` / `not`). Home Assistant evaluates them with its own `conditional` card logic, so they update the same way (an entity changes, the screen is resized, the time passes). While the dashboard is edited every item shows, like hidden cards do. A row or the button group left without items is not drawn.",
        examples: [
          snippet(
            "controls_visibility",
            "Items with conditions",
            "The child lock only while the vacuum is docked, and Turbo only on large screens.",
            controls([
              {
                entity: "switch.child_lock",
                visibility: [
                  {
                    condition: "state",
                    entity: "vacuum.robot",
                    state: "docked",
                  },
                ],
              },
              {
                type: "button",
                entity: "vacuum.robot",
                name: "Turbo",
                icon: "mdi:fan-speed-3",
                perform_action: "vacuum.set_fan_speed",
                visibility: [
                  { condition: "screen", media_query: "(min-width: 768px)" },
                ],
              },
            ]),
          ),
        ],
      },
      {
        title: "Toggle, number, action and button",
        examples: [
          inPopup(
            "toggle_chips",
            "Toggle chips",
            "Name, state and an icon colored when active. Locks lock / unlock, covers and valves toggle. Any item takes `color` (a theme color name or any CSS color) for its icon; on a toggle it is the color while on.",
            "switch.ac",
            [
              controls([
                { entity: "switch.ac" },
                { entity: "switch.decorative_lights", name: "Decoration" },
                { entity: "lock.kitchen_door" },
                { entity: "light.kitchen_lights", icon: "mdi:ceiling-light" },
              ]),
            ],
          ),
          inPopup(
            "number_chips",
            "Number steppers",
            "`number` / `input_number` entities with their own min, max, step and unit; override them with `min`, `max`, `step`. Changes are debounced.",
            "number.volume",
            [
              controls([
                { entity: "number.volume", name: "Volume" },
                { entity: "number.temperature_setting", name: "Setpoint" },
                { entity: "number.pwm_1", name: "PWM" },
                { entity: "number.large_range", name: "Big steps", step: 50 },
              ]),
            ],
          ),
          inPopup(
            "action_chips",
            "Action chips",
            "Any `tap_action`. The chevron shows for `navigate` and `more-info` (override with `show_arrow`). Navigate to `#other_popup` to chain popups.",
            vacuum,
            [
              controls([
                {
                  type: "action",
                  name: "Cleaning",
                  value: "By room",
                  icon: "mdi:texture-box",
                  tap_action: {
                    action: "navigate",
                    navigation_path: "#select_entity",
                  },
                },
                {
                  type: "action",
                  entity: "sensor.outside_temperature",
                  name: "Outside",
                },
                {
                  type: "action",
                  name: "Locate",
                  icon: "mdi:map-marker",
                  tap_action: {
                    action: "perform-action",
                    perform_action: "vacuum.locate",
                    target: { entity_id: vacuum },
                  },
                },
              ]),
            ],
          ),
          inPopup(
            "button_row",
            "Command buttons",
            "`type: button` renders the native square buttons above the chips (like the vacuum more-info). `button`, `scene` and `script` entities work without `perform_action`.",
            vacuum,
            [
              controls([
                {
                  type: "button",
                  entity: vacuum,
                  name: "Start",
                  icon: "mdi:play",
                  perform_action: "vacuum.start",
                },
                {
                  type: "button",
                  entity: vacuum,
                  name: "Stop",
                  icon: "mdi:stop",
                  perform_action: "vacuum.stop",
                },
                {
                  type: "button",
                  entity: vacuum,
                  name: "Dock",
                  icon: "mdi:home-import-outline",
                  perform_action: "vacuum.return_to_base",
                },
                {
                  type: "button",
                  entity: "button.push",
                  name: "Push",
                  icon: "mdi:gesture-tap-button",
                },
                { entity: vacuum, attribute: "fan_speed" },
              ]),
            ],
          ),
          inPopup(
            "unavailable",
            "Missing or unavailable entities",
            "Chips of missing or unavailable entities are disabled instead of breaking the card.",
            "select.speed",
            [
              controls([
                { entity: "select.speed" },
                { entity: "input_boolean.does_not_exist", name: "Missing" },
              ]),
            ],
          ),
          inPopup(
            "many_chips",
            "Many chips",
            "The native container lays out four chips as a 2 × 2 grid and more chips in rows of three; on phones the row scrolls horizontally.",
            "climate.ecobee",
            [
              controls([
                { entity: "climate.ecobee", attribute: "hvac_mode" },
                { entity: "climate.ecobee", attribute: "preset_mode" },
                { entity: "climate.ecobee", attribute: "fan_mode" },
                { entity: "climate.ecobee", attribute: "swing_mode" },
                { entity: "switch.ac" },
                { entity: "number.temperature_setting", name: "Setpoint" },
              ]),
            ],
          ),
          inPopup(
            "wrap_mobile",
            "Wrap on phones",
            "By default the chips row scrolls sideways on phones, like Home Assistant (the last chip is cut to hint that it scrolls). `wrap: true` puts the chips in rows instead.",
            "climate.ecobee",
            [
              controls(
                [
                  { entity: "climate.ecobee", attribute: "hvac_mode" },
                  { entity: "climate.ecobee", attribute: "preset_mode" },
                  { entity: "climate.ecobee", attribute: "fan_mode" },
                  { entity: "climate.ecobee", attribute: "swing_mode" },
                  { entity: "switch.ac" },
                ],
                { wrap: true },
              ),
            ],
            { viewport: "mobile" },
          ),
          inPopup(
            "controls_card",
            "Card appearance",
            "`appearance: card` draws a regular card.",
            "fan.living_room_fan",
            [
              controls(
                [
                  { entity: "fan.living_room_fan", attribute: "preset_mode" },
                  { entity: "fan.living_room_fan", attribute: "direction" },
                ],
                { appearance: "card" },
              ),
            ],
          ),
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    file: "recipes.md",
    title: "Recipes: custom more-info popups",
    intro:
      "Complete popups that replace the native more-info of an entity (`replace_more_info: true`) with a customized one built from the state and controls cards plus any other card.",
    sections: [
      {
        title: "Recipes",
        examples: [
          popup(
            "recipe_vacuum",
            "Vacuum",
            "Status, command buttons, renamed suction levels and a chip that opens a rooms popup.",
            {
              entity: vacuum,
              replace_more_info: true,
              cards: [
                state(vacuum),
                controls([
                  {
                    type: "button",
                    entity: vacuum,
                    name: "Start",
                    icon: "mdi:play",
                    perform_action: "vacuum.start",
                  },
                  {
                    type: "button",
                    entity: vacuum,
                    name: "Pause",
                    icon: "mdi:pause",
                    perform_action: "vacuum.pause",
                  },
                  {
                    type: "button",
                    entity: vacuum,
                    name: "Dock",
                    icon: "mdi:home-import-outline",
                    perform_action: "vacuum.return_to_base",
                  },
                  {
                    type: "button",
                    entity: vacuum,
                    name: "Locate",
                    icon: "mdi:map-marker",
                    perform_action: "vacuum.locate",
                  },
                  {
                    entity: vacuum,
                    attribute: "fan_speed",
                    name: "Suction",
                    options: [
                      { value: "min", name: "Quiet", icon: "mdi:fan-speed-1" },
                      {
                        value: "medium",
                        name: "Normal",
                        icon: "mdi:fan-speed-2",
                      },
                      { value: "max", name: "Turbo", icon: "mdi:fan-speed-3" },
                    ],
                  },
                  {
                    type: "action",
                    name: "Cleaning",
                    value: "By room",
                    icon: "mdi:texture-box",
                    tap_action: {
                      action: "navigate",
                      navigation_path: "#recipe_room",
                    },
                  },
                ]),
              ],
            },
          ),
          popup(
            "recipe_fan",
            "Fan",
            "Speed control, fan options and a related switch.",
            {
              entity: "fan.living_room_fan",
              replace_more_info: true,
              cards: [
                state("fan.living_room_fan"),
                controls([
                  { entity: "fan.living_room_fan", attribute: "preset_mode" },
                  { entity: "fan.living_room_fan", attribute: "direction" },
                  { entity: "fan.living_room_fan", attribute: "oscillating" },
                  { entity: "switch.ac", name: "Air conditioning" },
                ]),
              ],
            },
          ),
          popup(
            "recipe_thermostat",
            "Thermostat",
            "Dial, a reduced set of HVAC modes and the room sensors.",
            {
              entity: "climate.ecobee",
              replace_more_info: true,
              cards: [
                state("climate.ecobee"),
                controls([
                  {
                    entity: "climate.ecobee",
                    attribute: "hvac_mode",
                    options: ["off", "heat_cool", "cool", "auto"],
                  },
                  { entity: "climate.ecobee", attribute: "preset_mode" },
                  { entity: "climate.ecobee", attribute: "fan_mode" },
                  { entity: "climate.ecobee", attribute: "swing_mode" },
                ]),
                heading("Sensors", { heading_style: "subtitle" }),
                tile("sensor.outside_temperature"),
                tile("sensor.outside_humidity"),
              ],
            },
          ),
          popup(
            "recipe_light",
            "Light",
            "Brightness, effect, and the other lights of the room.",
            {
              entity: "light.living_room_rgbww_lights",
              replace_more_info: true,
              cards: [
                state("light.living_room_rgbww_lights"),
                controls([
                  {
                    entity: "light.bed_light",
                    attribute: "effect",
                    name: "Bed light effect",
                  },
                  { entity: "switch.decorative_lights", name: "Decoration" },
                ]),
                heading("Room", { heading_style: "subtitle" }),
                tile("light.ceiling_lights"),
                tile("light.bed_light"),
              ],
            },
          ),
          popup(
            "recipe_cover",
            "Cover",
            "Position plus tilt as a second state card and favorite positions as buttons.",
            {
              entity: "cover.living_room_window",
              replace_more_info: true,
              cards: [
                state("cover.living_room_window"),
                controls([
                  {
                    type: "button",
                    entity: "cover.living_room_window",
                    name: "Open",
                    icon: "mdi:arrow-up",
                    perform_action: "cover.open_cover",
                  },
                  {
                    type: "button",
                    entity: "cover.living_room_window",
                    name: "Stop",
                    icon: "mdi:stop",
                    perform_action: "cover.stop_cover",
                  },
                  {
                    type: "button",
                    entity: "cover.living_room_window",
                    name: "Close",
                    icon: "mdi:arrow-down",
                    perform_action: "cover.close_cover",
                  },
                  {
                    type: "action",
                    name: "Half",
                    icon: "mdi:window-shutter-open",
                    tap_action: {
                      action: "perform-action",
                      perform_action: "cover.set_cover_position",
                      target: { entity_id: "cover.living_room_window" },
                      data: { position: 50 },
                    },
                  },
                ]),
              ],
            },
          ),
          popup(
            "recipe_water_heater",
            "Water heater",
            "Temperature, operation mode and away mode.",
            {
              entity: "water_heater.demo_water_heater",
              replace_more_info: true,
              cards: [
                state("water_heater.demo_water_heater"),
                controls([
                  {
                    entity: "water_heater.demo_water_heater",
                    attribute: "operation_mode",
                  },
                  {
                    entity: "water_heater.demo_water_heater",
                    attribute: "away_mode",
                  },
                ]),
              ],
            },
          ),
          popup(
            "recipe_security",
            "Security",
            "Alarm panel and locks in one popup.",
            {
              entity: "alarm_control_panel.security",
              replace_more_info: true,
              cards: [
                state("alarm_control_panel.security"),
                controls([
                  { entity: "lock.front_door" },
                  { entity: "lock.kitchen_door" },
                  { entity: "lock.openable_lock" },
                ]),
              ],
            },
          ),
          popup(
            "recipe_room",
            "A room",
            "A popup without entity mixing building blocks and regular cards, wide on desktop.",
            {
              name: "Living room",
              breadcrumb: "Ground floor",
              column_span: 2,
              cards: [
                heading("Climate"),
                { ...state("climate.ecobee"), grid_options: { columns: 12 } },
                {
                  ...controls([
                    { entity: "climate.ecobee", attribute: "hvac_mode" },
                    { entity: "climate.ecobee", attribute: "preset_mode" },
                  ]),
                  grid_options: { columns: 12 },
                },
                heading("Lights"),
                tile("light.ceiling_lights", {
                  features: [{ type: "light-brightness" }],
                }),
                tile("light.living_room_rgbww_lights", {
                  features: [{ type: "light-brightness" }],
                }),
                heading("Media"),
                {
                  type: "media-control",
                  entity: "media_player.living_room",
                  grid_options: { columns: 24 },
                },
              ],
            },
          ),
        ],
      },
    ],
  },
];
