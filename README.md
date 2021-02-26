This is a boilerplate for Hasura, Keycloak and Next.js.

## Keycloak

### Realm

Realm is imported from docker-setup/keycloak/imports/realm-export.json when the containers are built. Therefore, you can modify the file for your needs. Alternatively, you can modify the realm then export a new realm from keycloak container after you login as an admin.

### Add User

## Hasura

## Next.js

The directory libs/ contains all the configurations & helper methods for Hasura, Keycloak and Apollo Client.
