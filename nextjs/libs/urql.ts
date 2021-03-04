import { createClient } from "urql";

export const createUrqlClient = (token) => {
  return createClient({
    url: "http://localhost:8080/v1/graphql",
    fetchOptions: () => {
      return {
        headers: { authorization: `Bearer ${token}` },
      };
    },
  });
};
