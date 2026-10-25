import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ClickpadTracker,
  CommandQueue,
  PAD_DEFAULTS,
  type PadEvent,
  type RemoteCommand,
  VOLUME_DEFAULTS,
  type VolumeEvent,
  VolumeTracker,
} from "../src/controls/remote-gestures";
import {
  companionMediaPlayer,
  companionRemote,
  remoteChoices,
  remoteProfile,
  resolveRemote,
} from "../src/controls/remote-profiles";
import {
  defaultShowState,
  remountsStateCard,
} from "../src/controls/state-controls";
import type { HomeAssistant } from "../src/ha/types";

const RADIUS = 130;

describe("ClickpadTracker", () => {
  let events: PadEvent[];
  let pad: ClickpadTracker;

  beforeEach(() => {
    vi.useFakeTimers();
    events = [];
    pad = new ClickpadTracker((event) => events.push(event));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("taps select", () => {
    pad.down(0, 0, RADIUS, 0);
    pad.move(3, 2, 50);
    pad.up(80);
    expect(events).toEqual([{ type: "tap" }]);
  });

  it("long press holds select, without a tap on release", () => {
    pad.down(0, 0, RADIUS, 0);
    vi.advanceTimersByTime(PAD_DEFAULTS.holdMs);
    pad.up(PAD_DEFAULTS.holdMs + 100);
    expect(events).toEqual([{ type: "hold" }]);
  });

  it("drags one arrow per step, following the direction", () => {
    pad.down(0, 0, RADIUS, 0);
    // Slow drag right for two steps, then down for one.
    pad.move(20, 0, 200);
    pad.move(40, 2, 400);
    pad.move(75, 4, 600);
    pad.move(75, 45, 900);
    pad.up(1200);
    expect(events).toEqual([
      { type: "step", direction: "right", source: "drag" },
      { type: "step", direction: "right", source: "drag" },
      { type: "step", direction: "down", source: "drag" },
    ]);
  });

  it("does not tap after a drag shorter than a step", () => {
    pad.down(0, 0, RADIUS, 0);
    pad.move(-20, 0, 200);
    pad.up(400);
    expect(events).toEqual([]);
  });

  it("adds flick arrows for a fast release", () => {
    pad.down(0, -40, RADIUS, 0);
    pad.move(0, -10, 20);
    pad.move(0, 30, 40);
    pad.move(0, 70, 60);
    pad.up(60);
    const flick = events.find((event) => event.type === "flick");
    expect(flick).toMatchObject({ type: "flick", direction: "down" });
    expect((flick as { count: number }).count).toBeGreaterThan(1);
    expect((flick as { count: number }).count).toBeLessThanOrEqual(
      PAD_DEFAULTS.flickMax,
    );
  });

  it("keeps scrolling while the finger stays still after a drag", () => {
    pad.down(0, 0, RADIUS, 0);
    pad.move(0, -40, 300);
    vi.advanceTimersByTime(PAD_DEFAULTS.holdMs + PAD_DEFAULTS.repeatMs * 2);
    expect(pad.repeating).toBe(true);
    pad.up(2000);
    expect(events).toEqual([
      { type: "step", direction: "up", source: "drag" },
      { type: "step", direction: "up", source: "repeat" },
      { type: "step", direction: "up", source: "repeat" },
      { type: "step", direction: "up", source: "repeat" },
    ]);
    // No flick after repeating, and nothing once released.
    vi.advanceTimersByTime(1000);
    expect(events).toHaveLength(4);
  });

  it("clicks the ring like a d-pad and repeats while held", () => {
    pad.down(-RADIUS * 0.85, 10, RADIUS, 0);
    expect(events).toEqual([
      { type: "step", direction: "left", source: "ring" },
    ]);
    vi.advanceTimersByTime(PAD_DEFAULTS.holdMs + PAD_DEFAULTS.repeatMs);
    pad.up(1000);
    expect(events.slice(1)).toEqual([
      { type: "step", direction: "left", source: "repeat" },
      { type: "step", direction: "left", source: "repeat" },
    ]);
  });

  it("cancel stops timers without emitting", () => {
    pad.down(0, 0, RADIUS, 0);
    pad.cancel();
    vi.advanceTimersByTime(2000);
    expect(events).toEqual([]);
    expect(pad.active).toBe(false);
  });
});

describe("CommandQueue", () => {
  const deferred = () => {
    let resolve!: () => void;
    let reject!: (err: Error) => void;
    const promise = new Promise<void>((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };

  it("sends one call at a time and merges the same key", async () => {
    const sent: RemoteCommand[] = [];
    const calls: ReturnType<typeof deferred>[] = [];
    const queue = new CommandQueue((command) => {
      sent.push({ ...command });
      const call = deferred();
      calls.push(call);
      return call.promise;
    });
    queue.push("right");
    queue.push("right");
    queue.push("right");
    queue.push("down");
    expect(sent).toEqual([
      { command: "right", repeats: 1, hold: false, transient: false },
    ]);
    calls[0]!.resolve();
    await vi.waitFor(() => expect(sent).toHaveLength(2));
    expect(sent[1]).toMatchObject({ command: "right", repeats: 2 });
    calls[1]!.resolve();
    await vi.waitFor(() => expect(sent).toHaveLength(3));
    expect(sent[2]).toMatchObject({ command: "down", repeats: 1 });
  });

  it("drops the repeats of a released key", async () => {
    const sent: string[] = [];
    let release!: () => void;
    const queue = new CommandQueue((command) => {
      sent.push(`${command.command}×${command.repeats}`);
      return new Promise<void>((resolve) => {
        release = resolve;
      });
    });
    queue.push("volume_up");
    queue.push("volume_up", { transient: true });
    queue.push("volume_up", { transient: true });
    queue.dropTransient();
    release();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(sent).toEqual(["volume_up×1"]);
    expect(queue.pending).toBe(0);
  });

  it("caps the presses waiting", () => {
    const queue = new CommandQueue(
      () => new Promise(() => undefined),
      undefined,
      3,
    );
    for (let i = 0; i < 10; i += 1) queue.push("up");
    // The first one is on its way; three wait.
    expect(queue.pending).toBe(3);
  });

  it("keeps holds as their own call", () => {
    const sent: RemoteCommand[] = [];
    const queue = new CommandQueue((command) => {
      sent.push(command);
      return new Promise(() => undefined);
    });
    queue.push("select");
    queue.push("select", { hold: true });
    queue.push("select");
    expect(queue.pending).toBe(2);
  });

  it("reports errors and forgets what was waiting", async () => {
    const onError = vi.fn();
    const sent: string[] = [];
    let fail!: (err: Error) => void;
    const queue = new CommandQueue((command) => {
      sent.push(command.command);
      return new Promise((_, reject) => {
        fail = reject;
      });
    }, onError);
    queue.push("up");
    queue.push("down");
    fail(new Error("not connected"));
    await vi.waitFor(() => expect(onError).toHaveBeenCalledOnce());
    expect(sent).toEqual(["up"]);
    expect(queue.pending).toBe(0);
  });
});

const hass = (
  entities: Record<string, { device_id?: string; platform?: string }>,
): HomeAssistant =>
  ({
    entities: Object.fromEntries(
      Object.entries(entities).map(([id, entry]) => [
        id,
        { entity_id: id, ...entry },
      ]),
    ),
    states: Object.fromEntries(
      Object.keys(entities).map((id) => [
        id,
        { entity_id: id, state: "on", attributes: {} },
      ]),
    ),
  }) as unknown as HomeAssistant;

describe("remote profiles", () => {
  const home = hass({
    "media_player.living": { device_id: "atv", platform: "apple_tv" },
    "remote.living": { device_id: "atv", platform: "apple_tv" },
    "media_player.kitchen": { device_id: "speaker", platform: "sonos" },
    "remote.other": { device_id: "speaker", platform: "harmony" },
    "media_player.loose": { platform: "apple_tv" },
  });

  it("finds the remote of an Apple TV media player", () => {
    expect(companionRemote(home, "media_player.living")).toBe("remote.living");
    expect(companionMediaPlayer(home, "remote.living")).toBe(
      "media_player.living",
    );
  });

  it("ignores media players of other integrations and without device", () => {
    expect(companionRemote(home, "media_player.kitchen")).toBeUndefined();
    expect(companionRemote(home, "media_player.loose")).toBeUndefined();
  });

  it("resolves the remote option", () => {
    expect(resolveRemote(home, "media_player.living", undefined)).toBe(
      "remote.living",
    );
    expect(resolveRemote(home, "media_player.living", "auto")).toBe(
      "remote.living",
    );
    expect(resolveRemote(home, "media_player.living", "none")).toBeUndefined();
    expect(resolveRemote(home, "media_player.kitchen", "remote.other")).toBe(
      "remote.other",
    );
    expect(resolveRemote(undefined, "media_player.living", "auto")).toBe(
      undefined,
    );
  });

  it("takes the remote of another media player's device", () => {
    // A universal media player has no device: point it at the Apple TV.
    const withUniversal = hass({
      "media_player.living": { device_id: "atv", platform: "apple_tv" },
      "remote.living": { device_id: "atv", platform: "apple_tv" },
      "media_player.tv": { platform: "universal" },
    });
    expect(
      resolveRemote(withUniversal, "media_player.tv", undefined),
    ).toBeUndefined();
    expect(
      resolveRemote(withUniversal, "media_player.tv", "media_player.living"),
    ).toBe("remote.living");
    expect(
      resolveRemote(withUniversal, "media_player.tv", "media_player.tv"),
    ).toBeUndefined();
  });

  it("lists remotes and Apple TV media players for the editor", () => {
    expect(remoteChoices(home)).toEqual([
      "media_player.living",
      "remote.living",
      "remote.other",
    ]);
  });

  it("maps the keys to Apple TV commands", () => {
    const profile = remoteProfile(home, "remote.living");
    expect(profile.commands.back).toBe("menu");
    expect(profile.commands.home).toBe("home");
    expect(profile.commands.power_off).toBe("turn_off");
    expect(profile.holdable).toContain("select");
    expect(profile.holdable).not.toContain("volume_up");
  });
});

describe("remote in the state card", () => {
  it("hides the state header of the remote control by default", () => {
    expect(defaultShowState("remote.living", "remote")).toBe(false);
    expect(defaultShowState("remote.living", "more_info")).toBe(false);
  });

  it("remounts when the remote options change", () => {
    const base = { entity: "media_player.living" };
    expect(remountsStateCard(base, { ...base, remote: "none" })).toBe(true);
    expect(remountsStateCard(base, { ...base, remote_view: "remote" })).toBe(
      true,
    );
    expect(remountsStateCard(base, { ...base })).toBe(false);
  });
});

describe("VolumeTracker", () => {
  let events: VolumeEvent[];
  let pill: VolumeTracker;
  const steps = () =>
    events.flatMap((event) =>
      event.type === "step" ? [`${event.direction}:${event.source}`] : [],
    );
  const moving = () =>
    events.flatMap((event) =>
      event.type === "moving" ? [event.direction] : [],
    );

  beforeEach(() => {
    vi.useFakeTimers();
    events = [];
    pill = new VolumeTracker((event) => events.push(event));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("taps one step on release", () => {
    pill.down("up", 30);
    expect(steps()).toEqual([]);
    pill.move(33);
    pill.up();
    expect(steps()).toEqual(["up:tap"]);
  });

  it("repeats a held key, without a tap on release", () => {
    pill.down("down", 110);
    vi.advanceTimersByTime(VOLUME_DEFAULTS.holdMs + VOLUME_DEFAULTS.repeatMs);
    pill.up();
    expect(steps()).toEqual(["down:repeat", "down:repeat"]);
    expect(moving()).toEqual(["down", null]);
  });

  it("swipes a step per distance, either way, from any half", () => {
    pill.down("down", 120);
    pill.move(100); // past the slop: swiping, measured from here
    pill.move(80); // one step up
    pill.move(60); // another
    pill.move(100); // back down: two steps
    pill.up();
    expect(steps()).toEqual([
      "up:swipe",
      "up:swipe",
      "down:swipe",
      "down:swipe",
    ]);
    expect(moving()).toEqual(["up", "down", null]);
  });

  it("keeps going while the finger stays still after a swipe", () => {
    pill.down("up", 100);
    pill.move(85);
    pill.move(66);
    vi.advanceTimersByTime(VOLUME_DEFAULTS.holdMs + VOLUME_DEFAULTS.repeatMs);
    pill.up();
    vi.advanceTimersByTime(1000);
    expect(steps()).toEqual(["up:swipe", "up:repeat", "up:repeat"]);
  });
});
