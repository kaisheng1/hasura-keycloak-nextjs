import type { AppProps, AppContext } from "next/app";
import { SSRKeycloakProvider } from "@react-keycloak/ssr";
import { ApolloProvider } from "@apollo/client";

import {
  keycloakConfig,
  initOptions,
  getPersistor,
  Keycloak,
} from "../libs/keycloak";
import { parseCookies } from "../libs/cookie";
import { createApolloClient } from "../libs/apollo";
import { useMemo } from "react";

interface Props extends AppProps {
  cookies: unknown;
  token?: string;
}

function MyApp({ Component, pageProps, cookies, token }: Props) {
  const apolloClient = useMemo(() => createApolloClient(token), [token]);
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakConfig}
      persistor={getPersistor(cookies)}
      initOptions={initOptions}
    >
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
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
