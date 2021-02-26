This is a boilerplate for Hasura, Keycloak and Next.js.

## Get Started

Start the docker containers

```bash
docker-compose up -d
```

Start Next.js website

```bash
cd nextjs && npm run dev
```

## Keycloak

### Realm

Realm is imported from docker-setup/keycloak/imports/realm-export.json when the containers are built. Therefore, you can modify the file for your needs. Alternatively, you can modify the realm then export a new realm from keycloak container after you login as an admin.

### Create a new user

See here: https://www.keycloak.org/docs/latest/getting_started/#creating-a-user. Add user to the demo-user group or the name you specified. As designed, it should have x-hasura-allowed-roles & x-hasura-default-role in the access token.

## Hasura

Running on localhost:8081/console. Check the admin secret from docker-compose.yml to be able to log in to the console.

If you have changed the keycloak realm name, also change the jwt_url in HASURA_GRAPHQL_JWT_SECRET in docker-compose.yml. The format is http://keycloak:8080/auth/realms/{realm_name}/protocol/openid-connect/certs.

## Next.js

The directory libs/ contains all the configurations & helper methods for Hasura, Keycloak and Apollo Client. In pages/index.tsx, there is a graphql query requesting for items, which may return errors if items table are not migrated from my project. Remove the query or create a new items table in Hasura.
