# Test plan

[← Documentation index](README.md)

How each case was checked on Home Assistant 2026.10 (frontend 20260930.4, `demo`
integration):

- **Unit**: automated test in `test/`, run with `npm test`.
- **HA**: checked by hand in the development instance (`dev/`).
- **Shot**: captured for these docs; the screenshot is linked.
- **Not verified**: the case has not been checked yet.

## Popup card

| Case                                                                                                                     | How            | Evidence                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------ | -------------- | ----------------------------------------------------------------------------------------------------- |
| Opens with a Navigate action to `#id` (push)                                                                             | Unit, HA       | `registry.test.ts`, history keeps one entry                                                           |
| Opens with `navigation_replace` and with a deep link                                                                     | Unit, HA       | `registry.test.ts`                                                                                    |
| Ignores unknown hashes and hashes of other pages                                                                         | Unit           | `registry.test.ts`                                                                                    |
| Back button, Esc and ✕ close it; history stays clean                                                                     | HA             | `history.state` checked after each close                                                              |
| `fire-dom-event` open / toggle / close                                                                                   | Unit, HA       | `registry.test.ts`                                                                                    |
| `replace_more_info` (including requested views)                                                                          | Unit, HA, Shot | [history](images/view_history.png), [settings](images/view_settings.png)                              |
| `match` template popup: integration / domain / glob / list, exact entity and most specific match win                     | Unit, HA       | `registry.test.ts`, `match.test.ts`; real WLED lights open the WLED popup, other lights stay native   |
| `entity: this` replaced in nested cards, lists and `entity_id`; opened entity drives header, history and menu            | Unit, HA       | `match.test.ts`; history of `light.wled_segment_1` inside the popup                                   |
| Template popup opened without an entity (`fire-dom-event` without `entity`) shows the cards' "entity not available"      | HA             | dev instance                                                                                          |
| `keep_alive` keeps one body per opened entity                                                                            | HA             | dev instance                                                                                          |
| Events from inside a popup are not intercepted                                                                           | Unit           | `registry.test.ts`                                                                                    |
| Header identical to the native more-info                                                                                 | HA             | compared side by side with the native dialog                                                          |
| Entity views: history, settings, related, details, menu                                                                  | HA, Shot       | [related](images/view_related.png), [details](images/view_details.png), [menu](images/view_menu.png)  |
| Nested more-info inline with back arrow                                                                                  | HA, Shot       | [nested](images/nested_inline.png)                                                                    |
| Widths small / medium / large / full / custom                                                                            | Shot           | [small](images/width_small.png), [large](images/width_large.png), [custom](images/width_custom.png)   |
| Custom height                                                                                                            | Shot           | [height](images/height_custom.png)                                                                    |
| `mode: bottom_sheet`, `auto` on a phone, `dialog` on a phone                                                             | HA, Shot       | [sheet](images/sheet_desktop.png), [auto](images/auto_mobile.png), [dialog](images/dialog_mobile.png) |
| `mode: top_sheet`: drops from the top, handle at the bottom, swipe up to close; a later bottom sheet stays at the bottom | HA             | dev instance, touch gesture simulated                                                                 |
| Hidden on the dashboard, placeholder in edit mode                                                                        | HA, Shot       | [placeholders](images/editor_placeholders.png)                                                        |
| Card registered after the HA registry polyfill                                                                           | HA             | must be loaded as a dashboard resource (see README)                                                   |
| `dismissable: false`, `auto_close`, `keep_alive`                                                                         | Not verified   |                                                                                                       |
| Config validation errors                                                                                                 | Unit           | `config.test.ts`                                                                                      |

## Editor

| Case                                                     | How      | Evidence                                                                        |
| -------------------------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| Popup options form (General / Appearance / Behavior)     | HA, Shot | [form](images/editor_form.png), [appearance](images/editor_appearance.png)      |
| Native grid: drag & drop reorder, saved to the dashboard | HA       | dashboard config read back over WebSocket                                       |
| Card menu: edit, duplicate, copy, cut, delete            | HA, Shot | [menu](images/editor_card_menu.png)                                             |
| Copy in popup → paste from the card picker               | HA, Shot | [paste](images/editor_picker.png)                                               |
| Delete + Undo (inside the editor)                        | HA       | restored config, Save disabled again                                            |
| Child card Config / Visibility / Layout tabs             | HA       | Layout shows a 24-column grid with `column_span: 2`                             |
| Controls card list editor and item form                  | HA, Shot | [list](images/editor_controls_list.png), [item](images/editor_control_item.png) |
| Test popup (stacked over the editor; Esc closes only it) | HA       |                                                                                 |
| Virtual Lovelace adapter                                 | Unit     | `editor-helpers.test.ts`                                                        |

## State card

| Case                                                                                                                        | How          | Evidence                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| Automatic control per domain (same rules as more-info)                                                                      | Unit         | `controls.test.ts`                                                                                                                  |
| Every control renders (toggle … vacuum status)                                                                              | Shot         | [state card page](state-card.md)                                                                                                    |
| Header text like more-info (brightness, speed, state · position)                                                            | Shot         | [brightness](images/state_brightness.png), [position](images/state_position.png)                                                    |
| `state_override`, `show_last_changed`, `show_state`, `control: none`                                                        | Shot         | [state card page](state-card.md#options)                                                                                            |
| Climate / humidifier / water heater controls appear immediately on first load                                               | HA           | regression fixed: no wait for the state header                                                                                      |
| Control centered in the free height of a full-height sheet, like more-info                                                  | HA           | compared side by side with the native dialog on a phone; no change on desktop                                                       |
| Light: lightbulb toggle, button bar, color / color temp pickers, favorite colors                                            | HA           | compared side by side with the native dialog                                                                                        |
| `more_info` control: camera, conversation, date, datetime, number, person, remote, select, sun, text, time, update, weather | HA           | rendered in the dev instance; sun compared with the native dialog                                                                   |
| `trigger` control: script (run, running, cancel, required fields), button, automation (trigger, on/off)                     | HA           | `dev/config/configuration.yaml` test entities; check / error feedback and states read from the DOM                                  |
| `push` control (vertical, horizontal, square, circle), `icon` / `icon_off`, `color` / `color_off`                           | HA           | dev instance: shapes, lit while running, toggle icons and colors read from the DOM                                                  |
| Cover / valve: position + tilt side by side, mode switch, buttons, toggle, favorite positions                               | HA           | every demo cover and valve, element positions equal to the native dialog (desktop and phone width), also after switching to buttons |
| Lock: Open button (confirm → done), jammed status with Unlock / Lock                                                        | HA           | positions equal to the native dialog; `lock.openable_lock` opened, `lock.poorly_installed_door` jammed then unlocked                |
| Alarm: pulsing status and Disarm while arming / triggered, native code dialog                                               | HA           | positions equal to the native dialog; disarmed with the demo code                                                                   |
| Siren: volume icons, More controls opens the native dialog                                                                  | HA           | `siren.siren_with_all_features`                                                                                                     |
| Vacuum: command buttons, Cleaning by area (child view in the popup and in more-info; native more-info on a dashboard)       | HA           | positions equal to the native dialog except the fan speed select (left to the controls card)                                        |
| Lawn mower: start / pause, stop, dock; battery in the header                                                                | Not verified | no lawn mower or battery sensor in the demo                                                                                         |
| Pure helpers (cover / valve controls, favorites, position text, lock, colors, battery)                                      | Unit         | `native-helpers.test.ts`                                                                                                            |
| Interaction: fan speed, vacuum start / return to base                                                                       | HA           | entity state changed                                                                                                                |
| Remote: Apple TV media player gets the Now playing / Remote switch (`remote: auto`); other media players unchanged          | HA           | dev-only fake `apple_tv` integration (media player + remote on one device) and the demo media players                               |
| Remote: tap, long press, ring, slow drag, flick, still-after-drag repeat, held volume, held TV, keyboard → `send_command`   | Unit, HA     | `remote.test.ts`; commands recorded by the fake remote                                                                              |
| Remote: universal media player with `remote: media_player.<apple_tv>`; editor lists remotes and Apple TV media players      | Unit, HA     | `remote.test.ts`; universal over the fake Apple TV in the dev instance                                                              |
| Remote: mute (`media_player.volume_mute`), editor options, light / dark, phone width                                        | HA           | dev instance                                                                                                                        |
| Remote: seek slider follows playback, drag → `media_seek`; `seek_color` theme / art / color                                 | Unit, HA     | `seek.test.ts`; fake Apple TV with a local cover, dominant color read from the slider                                               |
| Remote: volume pill tap, hold, swipe up / down, still-after-swipe repeat, elastic stretch                                   | Unit, HA     | `remote.test.ts`; commands recorded by the fake remote, stretch read from the computed style                                        |
| Remote: `audio_entity` takes the volume pill (tap, swipe) and mute; the remote gets no volume commands                      | HA           | demo media player as the AVR, volume level and mute read back                                                                       |
| Remote fits the bottom sheet of a phone (375 × 812) without scrolling                                                       | HA, Shot     | [phone](images/state_remote_phone.png)                                                                                              |
| Remote on a real Apple TV, haptics in the companion apps                                                                    | Not verified | no Apple TV in the dev instance                                                                                                     |

## Controls card

| Case                                                                                                                               | How            | Evidence                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------- |
| Attribute → service mapping (preset, oscillating, hvac, select…)                                                                   | Unit           | `controls.test.ts`                                                                                          |
| Type inference                                                                                                                     | Unit           | `controls.test.ts`                                                                                          |
| Every select attribute renders with native labels and icons                                                                        | Shot           | [controls card page](controls-card.md)                                                                      |
| Filtered / renamed / re-iconed options                                                                                             | HA, Shot       | [options](images/select_options.png)                                                                        |
| Custom options + `perform_action` + `data_key`                                                                                     | Shot           | [custom](images/select_custom_action.png)                                                                   |
| Select changes the entity (vacuum suction → Turbo)                                                                                 | HA             | entity attribute changed                                                                                    |
| Toggle chip changes the entity (AC)                                                                                                | HA             | entity state changed                                                                                        |
| Number steppers render with min / max / step / unit                                                                                | Shot           | [numbers](images/number_chips.png)                                                                          |
| Number stepper changes the entity                                                                                                  | Not verified   |                                                                                                             |
| Action chip navigates to another popup                                                                                             | HA             | `#ajustes` opened from the vacuum popup                                                                     |
| Action chip `perform-action` / `more-info`                                                                                         | Not verified   |                                                                                                             |
| Command buttons above the chips                                                                                                    | HA, Shot       | [buttons](images/button_row.png)                                                                            |
| Missing / unavailable entity                                                                                                       | Shot           | [unavailable](images/unavailable.png)                                                                       |
| `wrap: true` on a phone (rows instead of horizontal scroll)                                                                        | HA, Shot       | [wrap](images/wrap_mobile.png)                                                                              |
| Native layout with 2, 4 and 6 chips                                                                                                | Shot           | [many](images/many_chips.png)                                                                               |
| Item `visibility`: hidden / shown as the condition flips (native `conditional` card), empty rows not drawn, all shown in edit mode | Unit, HA       | `visibility.test.ts`; `media_player` playing / paused in the dev instance                                   |
| Controls editor: item Visibility with the native editor (status, conditions, add condition)                                        | HA, Shot       | condition added and saved in `visibility`; [visibility](images/editor_control_visibility.png)               |
| Controls editor: open conditions stay open while edited, also when the config comes back cloned (popup editor)                     | Unit, HA       | `visibility.test.ts` (`reuseEqualConditions`); numeric state condition in a popup, config re-set as a clone |
| Controls editor: native list, item opens in place, fields of its type only (select, toggle, number, action, button)                | Unit, HA, Shot | `editor-options.test.ts`; [list](images/editor_controls_list.png), [item](images/editor_control_item.png)   |
| State card editor: only the options the config uses (icons, Cancel, push shape, remote options)                                    | Unit, HA       | `editor-options.test.ts`; schema read for a switch, thermostat, script, media players                       |

## UIX

| Case                                              | How                              |
| ------------------------------------------------- | -------------------------------- |
| Card styling through `uix:` / `card_mod:`         | Not verified (UIX not installed) |
| Popup `uix:` and `uix-more-info-popup` theme keys | Not verified (UIX not installed) |

## Running the checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```
