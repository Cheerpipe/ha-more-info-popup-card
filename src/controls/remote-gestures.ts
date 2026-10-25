/**
 * Gestures of the remote clickpad and the queue that sends their commands.
 * Kept free of DOM and Home Assistant so they can be unit tested.
 *
 * The Apple TV integration only takes key presses (`remote.send_command`
 * with `up`, `select`…), not the touch surface of the Siri Remote, so a drag
 * on the clickpad is turned into one arrow per `step` pixels travelled, a
 * fast release into a few more (the inertia of a flick), and a still finger
 * after a drag into repeated arrows.
 */

export type Direction = "up" | "down" | "left" | "right";

export type PadEvent =
  /** One arrow: a press on the ring, a drag step or a repeat while held. */
  | { type: "step"; direction: Direction; source: "ring" | "drag" | "repeat" }
  /** Extra arrows for the speed of a flick when the finger leaves. */
  | { type: "flick"; direction: Direction; count: number }
  /** Short press without moving: select. */
  | { type: "tap" }
  /** Long press without moving: select held. */
  | { type: "hold" };

export interface PadOptions {
  /** Distance of one arrow while dragging (px). */
  step: number;
  /** Movement below this is still a tap (px). */
  slop: number;
  /** Long press, and stillness after a drag before repeating (ms). */
  holdMs: number;
  /** Interval of the repeated arrows (ms). */
  repeatMs: number;
  /** Presses farther than this fraction of the radius hit the ring. */
  ringRatio: number;
  /** Release speed that makes a flick (px/ms). */
  flickSpeed: number;
  /** Extra speed per additional flick arrow (px/ms). */
  flickSpeedStep: number;
  flickMax: number;
}

export const PAD_DEFAULTS: PadOptions = {
  step: 36,
  slop: 10,
  holdMs: 500,
  repeatMs: 160,
  ringRatio: 0.62,
  flickSpeed: 0.7,
  flickSpeedStep: 0.5,
  flickMax: 5,
};

/** Time window used to measure the release speed (ms). */
const VELOCITY_WINDOW_MS = 100;

const directionOf = (dx: number, dy: number): Direction =>
  Math.abs(dx) > Math.abs(dy)
    ? dx > 0
      ? "right"
      : "left"
    : dy > 0
      ? "down"
      : "up";

interface Point {
  x: number;
  y: number;
  t: number;
}

/**
 * Pointer sequence of one finger on the clickpad. Coordinates are relative
 * to the center of the pad, `t` in milliseconds.
 */
export class ClickpadTracker {
  private readonly _opts: PadOptions;

  private _start?: Point;
  /** Where the next drag step is measured from. */
  private _anchor?: { x: number; y: number };
  /** Where the finger was when the stillness timer was armed. */
  private _still?: { x: number; y: number };
  private _samples: Point[] = [];
  private _ring = false;
  private _moved = false;
  private _held = false;
  private _repeating = false;
  private _last?: Direction;
  private _holdTimer?: ReturnType<typeof setTimeout>;
  private _repeatTimer?: ReturnType<typeof setTimeout>;

  public constructor(
    private readonly _emit: (event: PadEvent) => void,
    options: Partial<PadOptions> = {},
  ) {
    this._opts = { ...PAD_DEFAULTS, ...options };
  }

  /** Whether a finger is on the pad. */
  public get active(): boolean {
    return this._start !== undefined;
  }

  /** Whether arrows are being repeated (ring held or still after a drag). */
  public get repeating(): boolean {
    return this._repeating;
  }

  public down(x: number, y: number, radius: number, t: number): void {
    this.cancel();
    this._start = { x, y, t };
    this._anchor = { x, y };
    this._samples = [{ x, y, t }];
    if (Math.hypot(x, y) > radius * this._opts.ringRatio) {
      // The ring clicks like a d-pad: one arrow now, repeated while held.
      this._ring = true;
      this._last = directionOf(x, y);
      this._emit({ type: "step", direction: this._last, source: "ring" });
      this._repeatTimer = setTimeout(() => this._repeat(), this._opts.holdMs);
      return;
    }
    this._holdTimer = setTimeout(() => {
      this._held = true;
      this._emit({ type: "hold" });
    }, this._opts.holdMs);
  }

  public move(x: number, y: number, t: number): void {
    if (!this._start || this._ring || this._held) return;
    this._samples.push({ x, y, t });
    while (
      this._samples.length > 2 &&
      t - this._samples[0]!.t > VELOCITY_WINDOW_MS
    ) {
      this._samples.shift();
    }
    const { step, slop } = this._opts;
    if (!this._moved) {
      if (Math.hypot(x - this._start.x, y - this._start.y) < slop) return;
      this._moved = true;
      clearTimeout(this._holdTimer);
    }
    const anchor = this._anchor!;
    for (;;) {
      const dx = x - anchor.x;
      const dy = y - anchor.y;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < step) break;
      const direction = directionOf(dx, dy);
      if (direction === "left" || direction === "right") {
        anchor.x += Math.sign(dx) * step;
      } else {
        anchor.y += Math.sign(dy) * step;
      }
      this._last = direction;
      this._emit({ type: "step", direction, source: "drag" });
    }
    // A finger that stays put after a drag keeps scrolling that way.
    if (
      this._last &&
      (!this._still || Math.hypot(x - this._still.x, y - this._still.y) > slop)
    ) {
      this._still = { x, y };
      this._stopRepeat();
      this._repeatTimer = setTimeout(() => this._repeat(), this._opts.holdMs);
    }
  }

  public up(t: number): void {
    if (!this._start) return;
    const { _moved: moved, _held: held, _ring: ring } = this;
    const repeating = this._repeating;
    const last = this._last;
    const samples = this._samples;
    this.cancel();
    if (ring || held) return;
    if (!moved) {
      this._emit({ type: "tap" });
      return;
    }
    if (repeating || !last) return;
    const first = samples.find((p) => t - p.t <= VELOCITY_WINDOW_MS);
    const end = samples[samples.length - 1]!;
    if (!first || first === end) return;
    const dt = Math.max(end.t - first.t, 1);
    const horizontal = last === "left" || last === "right";
    const travel = horizontal ? end.x - first.x : end.y - first.y;
    const speed = Math.abs(travel) / dt;
    const { flickSpeed, flickSpeedStep, flickMax } = this._opts;
    if (speed < flickSpeed) return;
    const count = Math.min(
      flickMax,
      1 + Math.floor((speed - flickSpeed) / flickSpeedStep),
    );
    const direction: Direction = horizontal
      ? travel > 0
        ? "right"
        : "left"
      : travel > 0
        ? "down"
        : "up";
    this._emit({ type: "flick", direction, count });
  }

  /** Ends the sequence without a release (pointer cancelled, unmounted). */
  public cancel(): void {
    clearTimeout(this._holdTimer);
    this._stopRepeat();
    this._start = undefined;
    this._anchor = undefined;
    this._still = undefined;
    this._samples = [];
    this._ring = false;
    this._moved = false;
    this._held = false;
    this._last = undefined;
  }

  private _repeat() {
    if (!this._last) return;
    this._repeating = true;
    this._emit({ type: "step", direction: this._last, source: "repeat" });
    this._repeatTimer = setTimeout(() => this._repeat(), this._opts.repeatMs);
  }

  private _stopRepeat() {
    clearTimeout(this._repeatTimer);
    this._repeating = false;
  }
}

export interface RemoteCommand {
  command: string;
  /** Times in a row (`num_repeats`). */
  repeats: number;
  /** Long press (`hold_secs`). */
  hold: boolean;
  /**
   * Repeats of a held key or finger: dropped when it is released, so the
   * focus doesn't keep moving after the finger is gone.
   */
  transient: boolean;
}

/**
 * Sends the commands one call at a time. Each call goes through Home
 * Assistant to the device, so presses that come while one is on its way
 * wait, and consecutive presses of the same key are merged into one call
 * with `num_repeats`.
 */
export class CommandQueue {
  private _queue: RemoteCommand[] = [];
  private _busy = false;

  public constructor(
    private readonly _send: (command: RemoteCommand) => Promise<unknown>,
    private readonly _onError: (err: unknown) => void = () => undefined,
    /** Most presses waiting, so a slow device doesn't pile them up. */
    private readonly _max = 8,
  ) {}

  public get pending(): number {
    return this._queue.reduce((sum, item) => sum + item.repeats, 0);
  }

  public push(
    command: string,
    { repeats = 1, hold = false, transient = false } = {},
  ): void {
    const room = this._max - this.pending;
    if (room <= 0) return;
    const count = Math.min(repeats, room);
    const last = this._queue[this._queue.length - 1];
    if (
      last &&
      last.command === command &&
      !last.hold &&
      !hold &&
      last.transient === transient
    ) {
      last.repeats += count;
    } else {
      this._queue.push({ command, repeats: count, hold, transient });
    }
    void this._next();
  }

  /** Forgets the repeats still waiting (key or finger released). */
  public dropTransient(): void {
    this._queue = this._queue.filter((item) => !item.transient);
  }

  public clear(): void {
    this._queue = [];
  }

  private async _next() {
    if (this._busy) return;
    const item = this._queue.shift();
    if (!item) return;
    this._busy = true;
    try {
      await this._send(item);
    } catch (err) {
      this._queue = [];
      this._onError(err);
    } finally {
      this._busy = false;
    }
    void this._next();
  }
}

export type VolumeDirection = "up" | "down";

export type VolumeEvent =
  /** One volume step: a tap, a swipe step or a repeat while held. */
  | {
      type: "step";
      direction: VolumeDirection;
      source: "tap" | "swipe" | "repeat";
    }
  /** The volume is moving that way (swipe or hold), or stopped (`null`). */
  | { type: "moving"; direction: VolumeDirection | null };

export interface VolumeOptions {
  /** Swipe distance of one step (px). */
  step: number;
  /** Movement below this is still a tap (px). */
  slop: number;
  /** Hold of a key, and stillness after a swipe, before repeating (ms). */
  holdMs: number;
  repeatMs: number;
}

export const VOLUME_DEFAULTS: VolumeOptions = {
  step: 18,
  slop: 10,
  holdMs: 500,
  repeatMs: 180,
};

/**
 * One finger on the volume pill. A tap on + or − is one step (sent on
 * release, so a swipe doesn't start with a stray one), holding it repeats,
 * and a vertical swipe anywhere on the pill sends a step every `step` pixels,
 * then keeps going while the finger stays still. There is no level to show
 * (the remote only steps the volume), so the pill reports which way the
 * volume is moving instead.
 */
export class VolumeTracker {
  private readonly _opts: VolumeOptions;
  private _half?: VolumeDirection;
  private _startY = 0;
  private _anchorY = 0;
  private _stillY = 0;
  private _swiping = false;
  private _repeated = false;
  private _moving: VolumeDirection | null = null;
  private _last?: VolumeDirection;
  private _timer?: ReturnType<typeof setTimeout>;

  public constructor(
    private readonly _emit: (event: VolumeEvent) => void,
    options: Partial<VolumeOptions> = {},
  ) {
    this._opts = { ...VOLUME_DEFAULTS, ...options };
  }

  public get active(): boolean {
    return this._half !== undefined;
  }

  /** `half`: the key under the finger. */
  public down(half: VolumeDirection, y: number): void {
    this.cancel();
    this._half = half;
    this._startY = y;
    this._anchorY = y;
    this._timer = setTimeout(() => this._repeat(half), this._opts.holdMs);
  }

  public move(y: number): void {
    if (!this._half) return;
    const { step, slop, holdMs } = this._opts;
    if (!this._swiping) {
      if (Math.abs(y - this._startY) < slop) return;
      this._swiping = true;
      this._anchorY = y;
      this._stillY = y;
      this._stop();
    }
    while (Math.abs(y - this._anchorY) >= step) {
      const direction: VolumeDirection = y < this._anchorY ? "up" : "down";
      this._anchorY += direction === "up" ? -step : step;
      this._last = direction;
      this._setMoving(direction);
      this._emit({ type: "step", direction, source: "swipe" });
    }
    // A finger that stays put after a swipe keeps the volume moving.
    if (this._last && Math.abs(y - this._stillY) > slop / 2) {
      this._stillY = y;
      this._stop();
      const direction = this._last;
      this._setMoving(direction);
      this._timer = setTimeout(() => this._repeat(direction), holdMs);
    }
  }

  public up(): void {
    if (!this._half) return;
    const tap = !this._swiping && !this._repeated ? this._half : undefined;
    this.cancel();
    if (tap) this._emit({ type: "step", direction: tap, source: "tap" });
  }

  public cancel(): void {
    this._stop();
    this._half = undefined;
    this._swiping = false;
    this._repeated = false;
    this._last = undefined;
    this._setMoving(null);
  }

  private _repeat(direction: VolumeDirection) {
    this._repeated = true;
    this._setMoving(direction);
    this._emit({ type: "step", direction, source: "repeat" });
    this._timer = setTimeout(
      () => this._repeat(direction),
      this._opts.repeatMs,
    );
  }

  private _stop() {
    clearTimeout(this._timer);
    this._timer = undefined;
  }

  private _setMoving(direction: VolumeDirection | null) {
    if (direction === this._moving) return;
    this._moving = direction;
    this._emit({ type: "moving", direction });
  }
}
