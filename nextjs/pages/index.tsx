import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";

import { gql, useQuery } from "@apollo/client";

const GET_ITEMS = gql`
  query {
    items {
      name
    }
  }
`;

export default function Home() {
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) {
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
