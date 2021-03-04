import {
  createClient,
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from "urql";

const isServerSide = typeof window === "undefined";
export const ssrCache = ssrExchange({ isClient: !isServerSide });

export const createUrqlClient = (token) => {
  return createClient({
    url: "http://localhost:8080/v1/graphql",
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    fetchOptions: () => {
      return {
        headers: { authorization: `Bearer ${token}` },
      };
    },
  });
};
