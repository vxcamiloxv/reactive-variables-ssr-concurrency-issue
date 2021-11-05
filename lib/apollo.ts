import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export function configureClient({ initialState }: { initialState: NormalizedCacheObject }) {
  const cache = new InMemoryCache();
  const httpLink = new HttpLink({
    uri: 'https://localhost:8080/api/graphql',
  });

  const ssrMode = typeof window === 'undefined';

  return new ApolloClient({
    ssrMode,
    link: ApolloLink.from([httpLink]),
    cache: cache.restore(initialState || {}),
  });
}
