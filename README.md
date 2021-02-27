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

Realm is imported from `docker-setup/keycloak/imports/realm-export.json` when the containers are built. Therefore, you can modify the file for your needs. Alternatively, you can modify the realm then export a new realm from keycloak container after you login as an admin.

### Create a new user

See here: https://www.keycloak.org/docs/latest/getting_started/#creating-a-user. Add user to the user group or the name you specified. As designed, it should have x-hasura-allowed-roles & x-hasura-default-role in the access token.

## Hasura

Instead of accessing the console on http://localhost:8080/console, you should install the hasura cli [here](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html#install-hasura-cli).

Then run,

```bash
cd hasura && hasura console
```

This will open up a new console and the migrations made in this console will be automatically applied to the docker hasura. Note that migrations are only created when using the console through the CLI.

If you have changed the keycloak realm name, also change the jwt_url in HASURA_GRAPHQL_JWT_SECRET in `docker-compose.yml`. The format is http://keycloak:8080/auth/realms/{realm_name}/protocol/openid-connect/certs.

## Next.js

The directory `libs/` contains all the configurations & helper methods for Hasura, Keycloak and Apollo Client.
