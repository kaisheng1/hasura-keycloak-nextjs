import { parseCookies } from "./cookie";
import { getKeycloakInstance, SSRCookies } from "@react-keycloak/ssr";
import { IncomingMessage } from "http";

export const keycloakConfig = {
  realm: "demo",
  url: "http://localhost:8081/auth/",
  clientId: "demo",
};

export const initOptions = {
  onLoad: "login-required",
};

export const getPersistor = (cookies) => {
  return SSRCookies(cookies);
};

export const Keycloak = (req: IncomingMessage) => {
  const cookies = parseCookies(req);
  return getKeycloakInstance(keycloakConfig, getPersistor(cookies));
};
