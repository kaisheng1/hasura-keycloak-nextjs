import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useQuery } from "urql";
import { Keycloak } from "../libs/keycloak";
import { createUrqlClient, ssrCache } from "../libs/urql";

const GET_ITEMS = `
  query {
    items {
      name
    }
  }
`;

export default function Home() {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const [result] = useQuery({
    query: GET_ITEMS,
  });
  const { fetching, error, data } = result;

  if (fetching) {
    return "Loading...";
  }
  return (
    <div>
      <div>
        <button onClick={() => keycloak.logout()}>Logout</button>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const keycloak = Keycloak(ctx.req);
  const urqlClient = createUrqlClient(keycloak.token);

  await urqlClient.query(GET_ITEMS).toPromise();
  return { props: { urqlState: ssrCache.extractData() } };
}
