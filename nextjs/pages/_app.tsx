import type { AppProps, AppContext } from "next/app";
import { SSRKeycloakProvider } from "@react-keycloak/ssr";
import { Provider } from "urql";
import {
  keycloakConfig,
  initOptions,
  getPersistor,
  Keycloak,
} from "../libs/keycloak";
import { parseCookies } from "../libs/cookie";
import { useMemo } from "react";
import { createUrqlClient, ssrCache } from "../libs/urql";

interface Props extends AppProps {
  cookies: unknown;
  token?: string;
}

function MyApp({ Component, pageProps, cookies, token }: Props) {
  const urqlClient = useMemo(() => createUrqlClient(token), [token]);

  // SSR cache for urql
  if (pageProps?.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakConfig}
      persistor={getPersistor(cookies)}
      initOptions={initOptions}
    >
      <Provider value={urqlClient}>
        <Component {...pageProps} />
      </Provider>
    </SSRKeycloakProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const keycloak = Keycloak(context?.ctx?.req);

  return {
    cookies: parseCookies(context?.ctx?.req),
    token: keycloak.token,
  };
};
export default MyApp;
