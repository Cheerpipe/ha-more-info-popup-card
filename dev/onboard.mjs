// Onboards the local development Home Assistant (dev/docker-compose.yml) with a
// throwaway test user and installs a demo dashboard. Credentials are generated
// here and stored in dev/.credentials.json (git-ignored).
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const HA = process.env.HA_URL ?? "http://localhost:8123";
const CLIENT_ID = `${HA}/`;
const URL_PATH = "popup-lab";
const RESOURCE_URL = "/local/more-info-popup-card/more-info-popup-card.js";
const CREDENTIALS = new URL("./.credentials.json", import.meta.url);

const post = async (path, body, token, form = false) => {
  const res = await fetch(`${HA}${path}`, {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": form
        ? "application/x-www-form-urlencoded"
        : "application/json",
    },
    body: form ? new URLSearchParams(body) : JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path}: ${res.status} ${await res.text()}`);
  return res.json();
};

const exchange = (params) =>
  post("/auth/token", { client_id: CLIENT_ID, ...params }, undefined, true);

const onboard = async () => {
  const username = "dev";
  const password = randomBytes(12).toString("base64url");
  const { auth_code } = await post("/api/onboarding/users", {
    client_id: CLIENT_ID,
    name: "Developer",
    username,
    password,
    language: "es",
  });
  const tokens = await exchange({
    grant_type: "authorization_code",
    code: auth_code,
  });
  await post("/api/onboarding/core_config", {}, tokens.access_token);
  await post("/api/onboarding/analytics", {}, tokens.access_token);
  await post(
    "/api/onboarding/integration",
    { client_id: CLIENT_ID, redirect_uri: `${HA}/?auth_callback=1` },
    tokens.access_token,
  );
  const credentials = {
    username,
    password,
    refresh_token: tokens.refresh_token,
  };
  writeFileSync(CREDENTIALS, JSON.stringify(credentials, null, 2));
  return credentials;
};

const ws = (token) =>
  new Promise((resolve, reject) => {
    const socket = new WebSocket(`${HA.replace(/^http/, "ws")}/api/websocket`);
    let id = 1;
    const pending = new Map();
    socket.onerror = reject;
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "auth_required")
        socket.send(JSON.stringify({ type: "auth", access_token: token }));
      else if (msg.type === "auth_ok")
        resolve({
          call: (payload) =>
            new Promise((res, rej) => {
              const msgId = id++;
              pending.set(msgId, { res, rej });
              socket.send(JSON.stringify({ id: msgId, ...payload }));
            }),
          close: () => socket.close(),
        });
      else if (msg.type === "auth_invalid") reject(new Error(msg.message));
      else if (msg.type === "result") {
        const p = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.success) p?.res(msg.result);
        else p?.rej(new Error(JSON.stringify(msg.error)));
      }
    };
  });

const tile = (entity, extra = {}) => ({ type: "tile", entity, ...extra });

const DASHBOARD = {
  title: "Popup lab",
  views: [
    {
      title: "Inicio",
      path: "home",
      type: "sections",
      max_columns: 4,
      sections: [
        {
          type: "grid",
          cards: [
            { type: "heading", heading: "Disparadores" },
            tile("light.ceiling_lights", {
              name: "Salón (reemplaza more-info)",
            }),
            {
              type: "tile",
              entity: "sensor.outside_temperature",
              name: "Abrir #clima",
              tap_action: { action: "navigate", navigation_path: "#clima" },
            },
            {
              type: "button",
              name: "Hoja inferior #cocina",
              icon: "mdi:silverware-fork-knife",
              tap_action: { action: "navigate", navigation_path: "#cocina" },
              grid_options: { columns: 6, rows: 1 },
            },
            {
              type: "button",
              name: "fire-dom-event",
              icon: "mdi:gesture-tap",
              tap_action: {
                action: "fire-dom-event",
                more_info_popup: { open: "clima" },
              },
              grid_options: { columns: 6, rows: 1 },
            },
          ],
        },
        {
          type: "grid",
          cards: [
            {
              type: "custom:more-info-popup-card",
              popup_id: "salon",
              entity: "light.ceiling_lights",
              replace_more_info: true,
              cards: [
                { type: "heading", heading: "Luces" },
                tile("light.ceiling_lights", {
                  features: [{ type: "light-brightness" }],
                }),
                tile("light.living_room_rgbww_lights"),
                tile("light.bed_light"),
                { type: "heading", heading: "Clima" },
                tile("climate.hvac"),
                tile("sensor.outside_temperature"),
              ],
            },
            {
              type: "custom:more-info-popup-card",
              popup_id: "clima",
              name: "Clima",
              icon: "mdi:thermometer",
              breadcrumb: "Casa",
              width: "large",
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
            {
              type: "custom:more-info-popup-card",
              popup_id: "cocina",
              name: "Cocina",
              mode: "bottom_sheet",
              cards: [
                tile("light.kitchen_lights"),
                tile("switch.decorative_lights"),
                {
                  type: "entities",
                  entities: [
                    "light.kitchen_lights",
                    "switch.decorative_lights",
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Composición",
      path: "composicion",
      type: "sections",
      max_columns: 4,
      sections: [
        {
          type: "grid",
          cards: [
            { type: "heading", heading: "More-info personalizados" },
            tile("vacuum.demo_vacuum_0_ground_floor", {
              name: "Aspiradora (reemplaza more-info)",
            }),
            tile("fan.living_room_fan", {
              name: "Ventilador (reemplaza more-info)",
            }),
            tile("climate.ecobee", {
              name: "Termostato (reemplaza more-info)",
            }),
            tile("light.bed_light", { name: "Luz (reemplaza more-info)" }),
            {
              type: "tile",
              entity: "select.speed",
              name: "Abrir #ajustes",
              tap_action: { action: "navigate", navigation_path: "#ajustes" },
            },
          ],
        },
        {
          type: "grid",
          cards: [
            {
              type: "custom:more-info-popup-card",
              popup_id: "aspiradora",
              entity: "vacuum.demo_vacuum_0_ground_floor",
              replace_more_info: true,
              cards: [
                {
                  type: "custom:more-info-state-card",
                  entity: "vacuum.demo_vacuum_0_ground_floor",
                },
                {
                  type: "custom:more-info-controls-card",
                  controls: [
                    {
                      type: "button",
                      entity: "vacuum.demo_vacuum_0_ground_floor",
                      name: "Iniciar",
                      icon: "mdi:play",
                      perform_action: "vacuum.start",
                    },
                    {
                      type: "button",
                      entity: "vacuum.demo_vacuum_0_ground_floor",
                      name: "Parar",
                      icon: "mdi:stop",
                      perform_action: "vacuum.stop",
                    },
                    {
                      type: "button",
                      entity: "vacuum.demo_vacuum_0_ground_floor",
                      name: "Volver a la base",
                      icon: "mdi:home-import-outline",
                      perform_action: "vacuum.return_to_base",
                    },
                    {
                      type: "button",
                      entity: "vacuum.demo_vacuum_0_ground_floor",
                      name: "Localizar",
                      icon: "mdi:map-marker",
                      perform_action: "vacuum.locate",
                    },
                    {
                      entity: "vacuum.demo_vacuum_0_ground_floor",
                      attribute: "fan_speed",
                      name: "Succión",
                      options: [
                        {
                          value: "min",
                          name: "Silenciosa",
                          icon: "mdi:fan-speed-1",
                        },
                        {
                          value: "medium",
                          name: "Normal",
                          icon: "mdi:fan-speed-2",
                        },
                        {
                          value: "max",
                          name: "Turbo",
                          icon: "mdi:fan-speed-3",
                        },
                      ],
                    },
                    {
                      type: "action",
                      name: "Limpieza",
                      value: "Por habitaciones",
                      icon: "mdi:texture-box",
                      tap_action: {
                        action: "navigate",
                        navigation_path: "#ajustes",
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "custom:more-info-popup-card",
              popup_id: "ventilador",
              entity: "fan.living_room_fan",
              replace_more_info: true,
              cards: [
                {
                  type: "custom:more-info-state-card",
                  entity: "fan.living_room_fan",
                },
                {
                  type: "custom:more-info-controls-card",
                  controls: [
                    { entity: "fan.living_room_fan", attribute: "preset_mode" },
                    { entity: "fan.living_room_fan", attribute: "direction" },
                    { entity: "fan.living_room_fan", attribute: "oscillating" },
                    { entity: "switch.ac", name: "Aire acondicionado" },
                  ],
                },
              ],
            },
            {
              type: "custom:more-info-popup-card",
              popup_id: "termostato",
              entity: "climate.ecobee",
              replace_more_info: true,
              cards: [
                {
                  type: "custom:more-info-state-card",
                  entity: "climate.ecobee",
                },
                {
                  type: "custom:more-info-controls-card",
                  controls: [
                    {
                      entity: "climate.ecobee",
                      attribute: "hvac_mode",
                      options: ["off", "heat_cool", "cool", "auto"],
                    },
                    { entity: "climate.ecobee", attribute: "preset_mode" },
                    { entity: "climate.ecobee", attribute: "fan_mode" },
                    { entity: "climate.ecobee", attribute: "swing_mode" },
                  ],
                },
                {
                  type: "heading",
                  heading: "Sensores",
                  heading_style: "subtitle",
                },
                tile("sensor.outside_temperature"),
                tile("sensor.outside_humidity"),
              ],
            },
            {
              type: "custom:more-info-popup-card",
              popup_id: "luz",
              entity: "light.bed_light",
              replace_more_info: true,
              cards: [
                {
                  type: "custom:more-info-state-card",
                  entity: "light.bed_light",
                  control: "toggle",
                },
                {
                  type: "custom:more-info-controls-card",
                  controls: [
                    { entity: "light.bed_light", attribute: "effect" },
                    { entity: "switch.decorative_lights", name: "Decoración" },
                    { entity: "number.volume", name: "Volumen" },
                    {
                      type: "action",
                      name: "Clima",
                      icon: "mdi:thermometer",
                      tap_action: {
                        action: "navigate",
                        navigation_path: "#termostato",
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "custom:more-info-popup-card",
              popup_id: "ajustes",
              name: "Ajustes",
              icon: "mdi:tune",
              cards: [
                {
                  type: "custom:more-info-controls-card",
                  controls: [
                    { entity: "select.speed", name: "Velocidad" },
                    { entity: "number.temperature_setting", name: "Consigna" },
                    { entity: "number.pwm_1", name: "PWM" },
                    { entity: "input_boolean.nope", name: "No existe" },
                  ],
                },
                {
                  type: "custom:more-info-state-card",
                  entity: "cover.living_room_window",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const main = async () => {
  // Once onboarding is done (and after a restart) the endpoint is gone (404).
  const res = await fetch(`${HA}/api/onboarding`);
  const status = res.ok ? await res.json() : [];
  const userStep = status.find?.((s) => s.step === "user");
  let credentials;
  if (userStep && !userStep.done) {
    credentials = await onboard();
    console.log("Onboarded test user 'dev' (see dev/.credentials.json)");
  } else if (existsSync(CREDENTIALS)) {
    credentials = JSON.parse(readFileSync(CREDENTIALS, "utf8"));
  } else {
    throw new Error("Already onboarded and no dev/.credentials.json found");
  }
  const { access_token } = await exchange({
    grant_type: "refresh_token",
    refresh_token: credentials.refresh_token,
  });
  // Stand-in Apple TV of dev/config/custom_components/apple_tv (the state
  // card remote); aborts when it is already configured.
  await post(
    "/api/config/config_entries/flow",
    { handler: "apple_tv" },
    access_token,
  ).catch(() => undefined);
  const conn = await ws(access_token);
  const resources = await conn.call({ type: "lovelace/resources" });
  if (!resources.some((r) => r.url.startsWith(RESOURCE_URL))) {
    await conn.call({
      type: "lovelace/resources/create",
      res_type: "module",
      url: `${RESOURCE_URL}?v=dev`,
    });
  }
  const dashboards = await conn.call({ type: "lovelace/dashboards/list" });
  if (!dashboards.some((d) => d.url_path === URL_PATH)) {
    await conn.call({
      type: "lovelace/dashboards/create",
      url_path: URL_PATH,
      title: "Popup lab",
      icon: "mdi:dock-window",
      mode: "storage",
      show_in_sidebar: true,
      require_admin: false,
    });
  }
  await conn.call({
    type: "lovelace/config/save",
    url_path: URL_PATH,
    config: DASHBOARD,
  });
  conn.close();
  console.log(`Dashboard saved: ${HA}/${URL_PATH}/home`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
