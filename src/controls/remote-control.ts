/**
 * `remote` control of the state card: the Siri Remote of an Apple TV drawn
 * with the shapes of the native controls. A round clickpad (the ring clicks
 * the arrows, the center takes drags, taps and long presses) over the
 * buttons of the remote: back, TV, play / pause, volume and mute. With a
 * media player, a strip above shows what is playing and the power button.
 */
import { css, html, LitElement, nothing, svg } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { computeStateName } from "../ha/entity";
import { fireEvent } from "../ha/fire-event";
import type { HassEntity, HomeAssistant } from "../ha/types";
import { localize } from "../localize/localize";
import {
  ClickpadTracker,
  CommandQueue,
  PAD_DEFAULTS,
  type Direction,
  type PadEvent,
  type RemoteCommand,
} from "./remote-gestures";
import { remoteProfile, type RemoteKey } from "./remote-profiles";

export const REMOTE_CONTROL_TAG = "more-info-popup-remote-control";

/** `MediaPlayerEntityFeature` (`src/data/media-player.ts`). */
const VOLUME_MUTE = 8;
const MEDIA_OFF_STATES = ["off", "standby", "unavailable", "unknown"];

/** Pause between the presses of one call with `num_repeats` (s). */
const REPEAT_DELAY_SECS = 0.05;

type Haptic = "light" | "medium" | "selection" | "failure";

/** `navigator.vibrate` patterns where the companion app can't vibrate. */
const VIBRATION: Record<Haptic, number | number[]> = {
  selection: 6,
  light: 10,
  medium: 20,
  failure: [20, 40, 20],
};

/** Stroke icons drawn after the ones printed on the Siri Remote. */
const ICONS = {
  back: svg`<path d="M17 6 9 14l8 8" />`,
  tv: svg`<rect x="5" y="6" width="18" height="12.5" rx="1.5" /><path d="M11 22h6" />`,
  play_pause: svg`<path d="M6 9.5v9l7-4.5z" /><path d="M17 9.5v9M21 9.5v9" />`,
  plus: svg`<path d="M14 8v12M8 14h12" />`,
  minus: svg`<path d="M8 14h12" />`,
  mute: svg`<path d="M8 11h3.5L16 7v14l-4.5-4H8z" /><path d="M6 7l16 15" />`,
  power: svg`<path d="M14 5v8" /><path d="M9 8.2a8 8 0 1 0 10 0" />`,
} as const;

const icon = (name: keyof typeof ICONS) =>
  html`<svg class="icon" viewBox="0 0 28 28" aria-hidden="true">
    ${ICONS[name]}
  </svg>`;

const KEY_DIRECTIONS: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

/** Keeps the moves and the release of a press that leaves the element. */
const capturePointer = (ev: PointerEvent) => {
  try {
    (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
  } catch {
    // The pointer is already gone (released, or a synthetic event).
  }
};

interface ButtonSpec {
  key: RemoteKey;
  /** Repeats while held (volume) instead of a long press. */
  repeat?: boolean;
}

export class MoreInfoRemoteControl extends LitElement {
  @property({ attribute: false }) accessor hass: HomeAssistant | undefined;

  /** `remote.*` entity the commands go to. */
  @property({ attribute: false }) accessor remote: string | undefined;

  /** Media player of the same device: now playing, power and mute. */
  @property({ attribute: false }) accessor mediaPlayer: string | undefined;

  /** Strip with what is playing and the power button. */
  @property({ attribute: false }) accessor showNowPlaying = true;

  @property({ attribute: false }) accessor haptics = true;

  /** Ring direction lit by the last press. */
  @state() accessor _flash: Direction | undefined;

  /** Finger on the center: position of the touch dot. */
  @state() accessor _touch: { x: number; y: number } | undefined;

  @state() accessor _tapped = false;

  private _flashTimer?: ReturnType<typeof setTimeout>;
  private _tapTimer?: ReturnType<typeof setTimeout>;

  private readonly _queue = new CommandQueue(
    (command) => this._call(command),
    () => this._haptic("failure"),
  );

  private readonly _tracker = new ClickpadTracker((event) =>
    this._padEvent(event),
  );

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._tracker.cancel();
    this._queue.clear();
    this._releaseButton();
    clearTimeout(this._flashTimer);
    clearTimeout(this._tapTimer);
  }

  private get _remoteObj(): HassEntity | undefined {
    return this.remote ? this.hass?.states[this.remote] : undefined;
  }

  private get _mediaObj(): HassEntity | undefined {
    return this.mediaPlayer ? this.hass?.states[this.mediaPlayer] : undefined;
  }

  private get _disabled(): boolean {
    const state = this._remoteObj?.state;
    return !state || state === "unavailable";
  }

  private _haptic(type: Haptic) {
    if (!this.haptics) return;
    fireEvent(window, "haptic", type);
    // The companion apps turn the event into native haptics; browsers only
    // have the vibration API (Android).
    if (!this.hass?.auth?.external) {
      try {
        navigator.vibrate?.(VIBRATION[type]);
      } catch {
        // Not allowed here (no user activation, iframe policy).
      }
    }
  }

  private _call({ command, repeats, hold }: RemoteCommand): Promise<unknown> {
    return this.hass!.callService("remote", "send_command", {
      entity_id: this.remote,
      command,
      num_repeats: repeats,
      // The service waits `delay_secs` (0.4 s by default) after each press.
      delay_secs: repeats > 1 ? REPEAT_DELAY_SECS : 0,
      ...(hold ? { hold_secs: 1 } : {}),
    });
  }

  private _press(
    key: RemoteKey,
    options: { repeats?: number; hold?: boolean; transient?: boolean } = {},
  ) {
    if (this._disabled) return;
    const profile = remoteProfile(this.hass!, this.remote!);
    const hold = options.hold && profile.holdable.includes(key);
    this._queue.push(profile.commands[key], { ...options, hold });
  }

  // Clickpad

  private _padEvent(event: PadEvent) {
    switch (event.type) {
      case "step":
        this._press(event.direction, { transient: event.source === "repeat" });
        this._haptic(event.source === "ring" ? "light" : "selection");
        if (event.source !== "drag") this._flashRing(event.direction);
        return;
      case "flick":
        this._press(event.direction, { repeats: event.count });
        this._haptic("selection");
        return;
      case "tap":
        this._press("select");
        this._haptic("light");
        this._tap();
        return;
      case "hold":
        this._press("select", { hold: true });
        this._haptic("medium");
        this._tap();
        return;
    }
  }

  private _flashRing(direction: Direction) {
    clearTimeout(this._flashTimer);
    this._flash = direction;
    this._flashTimer = setTimeout(() => {
      this._flash = undefined;
    }, 180);
  }

  private _tap() {
    clearTimeout(this._tapTimer);
    this._tapped = true;
    this._tapTimer = setTimeout(() => {
      this._tapped = false;
    }, 160);
  }

  private _padPoint(ev: PointerEvent) {
    const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect();
    return {
      x: ev.clientX - rect.left - rect.width / 2,
      y: ev.clientY - rect.top - rect.height / 2,
      radius: rect.width / 2,
    };
  }

  private _padDown(ev: PointerEvent) {
    if (this._disabled || (ev.pointerType === "mouse" && ev.button !== 0)) {
      return;
    }
    ev.preventDefault();
    capturePointer(ev);
    const { x, y, radius } = this._padPoint(ev);
    this._tracker.down(x, y, radius, ev.timeStamp);
    if (Math.hypot(x, y) <= radius * PAD_DEFAULTS.ringRatio) {
      this._touch = { x, y };
    }
  }

  private _padMove(ev: PointerEvent) {
    if (!this._tracker.active) return;
    const { x, y } = this._padPoint(ev);
    this._tracker.move(x, y, ev.timeStamp);
    if (this._touch) this._touch = { x, y };
  }

  private _padUp(ev: PointerEvent) {
    if (!this._tracker.active) return;
    this._tracker.up(ev.timeStamp);
    this._queue.dropTransient();
    this._touch = undefined;
  }

  private _padCancel() {
    this._tracker.cancel();
    this._queue.dropTransient();
    this._touch = undefined;
  }

  private _padKey(ev: KeyboardEvent) {
    const direction = KEY_DIRECTIONS[ev.key];
    if (direction) {
      ev.preventDefault();
      this._press(direction);
      this._flashRing(direction);
      return;
    }
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      this._press("select");
      this._tap();
    }
  }

  // Buttons

  private _button?: {
    spec: ButtonSpec;
    timer?: ReturnType<typeof setTimeout>;
    fired: boolean;
  };

  private _buttonDown(ev: PointerEvent, spec: ButtonSpec) {
    if (this._disabled || (ev.pointerType === "mouse" && ev.button !== 0)) {
      return;
    }
    capturePointer(ev);
    this._releaseButton();
    const button: NonNullable<typeof this._button> = { spec, fired: false };
    this._button = button;
    if (spec.repeat) {
      // Volume: one step now, then steps while held.
      button.fired = true;
      this._press(spec.key);
      this._haptic("light");
      const repeat = () => {
        this._press(spec.key, { transient: true });
        this._haptic("selection");
        button.timer = setTimeout(repeat, PAD_DEFAULTS.repeatMs);
      };
      button.timer = setTimeout(repeat, PAD_DEFAULTS.holdMs);
      return;
    }
    const profile = remoteProfile(this.hass!, this.remote!);
    if (!profile.holdable.includes(spec.key)) return;
    button.timer = setTimeout(() => {
      button.fired = true;
      this._press(spec.key, { hold: true });
      this._haptic("medium");
    }, PAD_DEFAULTS.holdMs);
  }

  private _buttonUp() {
    const button = this._button;
    if (!button) return;
    this._releaseButton();
    if (!button.fired) {
      this._press(button.spec.key);
      this._haptic("light");
    }
  }

  private _releaseButton() {
    if (this._button) clearTimeout(this._button.timer);
    this._button = undefined;
    this._queue.dropTransient();
  }

  /** Enter / Space on a focused button (pointer presses are handled above). */
  private _buttonClick(ev: MouseEvent, key: RemoteKey) {
    if (ev.detail !== 0) return;
    this._press(key);
  }

  private _remoteButton(
    spec: ButtonSpec,
    iconName: keyof typeof ICONS,
    label: string,
    extraClass = "",
  ) {
    return html`
      <button
        class="key ${extraClass}"
        aria-label=${label}
        title=${label}
        .disabled=${this._disabled}
        @pointerdown=${(ev: PointerEvent) => this._buttonDown(ev, spec)}
        @pointerup=${this._buttonUp}
        @pointercancel=${this._releaseButton}
        @lostpointercapture=${this._releaseButton}
        @click=${(ev: MouseEvent) => this._buttonClick(ev, spec.key)}
        @contextmenu=${(ev: Event) => ev.preventDefault()}
      >
        ${icon(iconName)}
      </button>
    `;
  }

  // Media player

  private _toggleMute() {
    const media = this._mediaObj;
    if (!media) return;
    this._haptic("light");
    this.hass!.callService("media_player", "volume_mute", {
      entity_id: media.entity_id,
      is_volume_muted: !media.attributes.is_volume_muted,
    }).catch(() => this._haptic("failure"));
  }

  private _power() {
    const media = this._mediaObj;
    if (!media) return;
    this._press(
      MEDIA_OFF_STATES.includes(media.state) ? "power_on" : "power_off",
    );
    this._haptic("light");
  }

  private _nowPlaying() {
    const media = this._mediaObj;
    if (!this.showNowPlaying || !media) return nothing;
    const hass = this.hass!;
    const attrs = media.attributes;
    const off = MEDIA_OFF_STATES.includes(media.state);
    const title = off
      ? computeStateName(media)
      : (attrs.media_title ??
        hass.localize("ui.card.media_player.nothing_playing"));
    const secondary = off
      ? hass.formatEntityState(media)
      : (attrs.media_artist ??
        attrs.media_series_name ??
        attrs.app_name ??
        hass.formatEntityState(media));
    const picture = !off && (attrs.entity_picture as string | undefined);
    const powerLabel = hass.localize("ui.card.media_player.power");
    return html`
      <div class="now-playing">
        <div class="art">
          ${
            picture
              ? html`<img src=${picture} alt="" />`
              : html`<ha-state-icon
                  .hass=${hass}
                  .stateObj=${media}
                ></ha-state-icon>`
          }
        </div>
        <div class="info">
          <div class="title">${title}</div>
          <div class="secondary">${secondary}</div>
        </div>
        <button
          class="key small"
          aria-label=${powerLabel}
          title=${powerLabel}
          .disabled=${this._disabled}
          @click=${this._power}
        >
          ${icon("power")}
        </button>
      </div>
    `;
  }

  protected override render() {
    if (!this.hass || !this.remote) return nothing;
    const hass = this.hass;
    const t = (key: Parameters<typeof localize>[1]) => localize(hass, key);
    const media = this._mediaObj;
    const canMute = media
      ? ((media.attributes.supported_features ?? 0) & VOLUME_MUTE) !== 0
      : false;
    const muted = Boolean(media?.attributes.is_volume_muted);
    const muteLabel = hass.localize("ui.card.media_player.volume_mute");
    return html`
      ${this._nowPlaying()}
      <div
        class=${classMap({
          pad: true,
          disabled: this._disabled,
          [`flash-${this._flash}`]: Boolean(this._flash),
          tapped: this._tapped,
        })}
        role="button"
        tabindex=${this._disabled ? -1 : 0}
        aria-label=${t("remote.clickpad")}
        aria-disabled=${this._disabled}
        @pointerdown=${this._padDown}
        @pointermove=${this._padMove}
        @pointerup=${this._padUp}
        @pointercancel=${this._padCancel}
        @lostpointercapture=${this._padCancel}
        @keydown=${this._padKey}
        @contextmenu=${(ev: Event) => ev.preventDefault()}
      >
        <div class="glow"></div>
        <span class="tick up"></span>
        <span class="tick down"></span>
        <span class="tick left"></span>
        <span class="tick right"></span>
        <div class="center"></div>
        ${
          this._touch
            ? html`<div
                class="touch"
                style=${styleMap({
                  transform: `translate(${this._touch.x}px, ${this._touch.y}px)`,
                })}
              ></div>`
            : nothing
        }
      </div>
      <div class="keys">
        ${this._remoteButton({ key: "back" }, "back", hass.localize("ui.common.back"), "back")}
        ${this._remoteButton({ key: "home" }, "tv", t("remote.home"), "home")}
        ${this._remoteButton(
          { key: "play_pause" },
          "play_pause",
          hass.localize("ui.card.media_player.media_play_pause"),
          "play",
        )}
        <div class="volume">
          ${this._remoteButton(
            { key: "volume_up", repeat: true },
            "plus",
            hass.localize("ui.card.media_player.volume_up"),
          )}
          ${this._remoteButton(
            { key: "volume_down", repeat: true },
            "minus",
            hass.localize("ui.card.media_player.volume_down"),
          )}
        </div>
        <button
          class=${classMap({ key: true, mute: true, hidden: !canMute, on: muted })}
          aria-label=${muteLabel}
          aria-pressed=${muted}
          title=${muteLabel}
          .disabled=${this._disabled || !canMute}
          @click=${this._toggleMute}
        >
          ${icon("mute")}
        </button>
      </div>
    `;
  }

  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: stretch;
      gap: var(--ha-space-6, 24px);
      --remote-key-size: 64px;
      --remote-surface: var(--disabled-color);
      --remote-surface-opacity: 0.2;
      -webkit-tap-highlight-color: transparent;
    }
    .icon {
      width: 28px;
      height: 28px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Now playing */
    .now-playing {
      align-self: stretch;
      display: flex;
      align-items: center;
      gap: var(--ha-space-3, 12px);
      padding: var(--ha-space-2, 8px);
      border-radius: var(--ha-border-radius-xl, 18px);
      position: relative;
      isolation: isolate;
    }
    .now-playing::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: inherit;
      background: var(--remote-surface);
      opacity: calc(var(--remote-surface-opacity) * 0.6);
    }
    .art {
      flex: none;
      width: 44px;
      height: 44px;
      border-radius: var(--ha-border-radius-md, 8px);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
    }
    .art img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .info {
      flex: 1;
      min-width: 0;
    }
    .title,
    .secondary {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .title {
      font-weight: var(--ha-font-weight-medium, 500);
    }
    .secondary {
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-s, 12px);
    }

    /* Clickpad */
    .pad {
      position: relative;
      box-sizing: border-box;
      width: min(100%, 260px);
      aspect-ratio: 1;
      border-radius: 50%;
      cursor: pointer;
      outline: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
      isolation: isolate;
      overflow: hidden;
    }
    .pad::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -2;
      border-radius: inherit;
      background: var(--remote-surface);
      opacity: var(--remote-surface-opacity);
      transition: opacity 180ms ease-in-out;
    }
    .pad:not(.disabled):hover::before {
      opacity: calc(var(--remote-surface-opacity) * 1.5);
    }
    .pad:focus-visible {
      box-shadow: 0 0 0 2px var(--primary-color);
    }
    .pad.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .center {
      position: absolute;
      inset: 23%;
      border-radius: 50%;
      background: var(--card-background-color, var(--ha-color-surface-default));
      box-shadow: inset 0 0 0 1px var(--divider-color);
      transition:
        scale 120ms ease-out,
        background-color 120ms ease-out;
    }
    .pad.tapped .center {
      scale: 0.97;
    }
    .tick {
      position: absolute;
      width: 6px;
      height: 6px;
      margin: -3px;
      border-radius: 50%;
      background: var(--secondary-text-color);
      opacity: 0.6;
      transition:
        opacity 120ms ease-out,
        scale 120ms ease-out;
    }
    .tick.up {
      left: 50%;
      top: 11.5%;
    }
    .tick.down {
      left: 50%;
      top: 88.5%;
    }
    .tick.left {
      top: 50%;
      left: 11.5%;
    }
    .tick.right {
      top: 50%;
      left: 88.5%;
    }
    .pad.flash-up .tick.up,
    .pad.flash-down .tick.down,
    .pad.flash-left .tick.left,
    .pad.flash-right .tick.right {
      opacity: 1;
      scale: 1.6;
    }
    /* Ring pressed: light toward the pressed side. */
    .glow {
      position: absolute;
      z-index: -1;
      width: 46%;
      height: 46%;
      left: 27%;
      top: 27%;
      border-radius: 50%;
      background: var(--primary-color);
      opacity: 0;
      filter: blur(18px);
      transition: opacity 180ms ease-out;
      pointer-events: none;
    }
    .pad.flash-up .glow {
      opacity: 0.35;
      transform: translateY(-62%);
    }
    .pad.flash-down .glow {
      opacity: 0.35;
      transform: translateY(62%);
    }
    .pad.flash-left .glow {
      opacity: 0.35;
      transform: translateX(-62%);
    }
    .pad.flash-right .glow {
      opacity: 0.35;
      transform: translateX(62%);
    }
    /* Finger on the center. */
    .touch {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 44px;
      height: 44px;
      margin: -22px;
      border-radius: 50%;
      background: var(--primary-color);
      opacity: 0.25;
      pointer-events: none;
    }

    /* Buttons, laid out like the Siri Remote. */
    .keys {
      display: grid;
      grid-template-columns: var(--remote-key-size) var(--remote-key-size);
      grid-template-rows: repeat(3, var(--remote-key-size));
      gap: var(--ha-space-4, 16px) var(--ha-space-10, 40px);
      justify-content: center;
      color: var(--primary-text-color);
    }
    .key {
      position: relative;
      isolation: isolate;
      width: var(--remote-key-size);
      height: var(--remote-key-size);
      padding: 0;
      border: none;
      border-radius: 50%;
      background: none;
      color: inherit;
      font: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      outline: none;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      transition: scale 120ms ease-out;
    }
    .key::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      border-radius: inherit;
      background: var(--remote-surface);
      opacity: var(--remote-surface-opacity);
      transition: opacity 120ms ease-out;
    }
    .key:not(:disabled):hover::before {
      opacity: calc(var(--remote-surface-opacity) * 1.5);
    }
    .key:not(:disabled):active::before {
      opacity: calc(var(--remote-surface-opacity) * 2.5);
    }
    .key:not(:disabled):active {
      scale: 0.94;
    }
    .key:focus-visible {
      box-shadow: 0 0 0 2px var(--primary-color);
    }
    .key:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .key.hidden {
      visibility: hidden;
    }
    .key.on {
      color: var(--primary-color);
    }
    .key.small {
      flex: none;
      width: 40px;
      height: 40px;
    }
    .key.small .icon {
      width: 22px;
      height: 22px;
    }
    .back {
      grid-area: 1 / 1;
    }
    .home {
      grid-area: 1 / 2;
    }
    .play {
      grid-area: 2 / 1;
    }
    .mute {
      grid-area: 3 / 1;
    }
    /* One pill for both volume keys, each half rounded on its own side. */
    .volume {
      grid-area: 2 / 2 / 4 / 3;
      display: flex;
      flex-direction: column;
    }
    .volume .key {
      flex: 1;
      height: auto;
    }
    /* Halves of one pill: shrinking one would open a gap. */
    .volume .key:not(:disabled):active {
      scale: none;
    }
    .volume .key:first-child {
      border-radius: calc(var(--remote-key-size) / 2)
        calc(var(--remote-key-size) / 2) 0 0;
    }
    .volume .key:last-child {
      border-radius: 0 0 calc(var(--remote-key-size) / 2)
        calc(var(--remote-key-size) / 2);
    }
  `;
}

if (!customElements.get(REMOTE_CONTROL_TAG)) {
  customElements.define(REMOTE_CONTROL_TAG, MoreInfoRemoteControl);
}
