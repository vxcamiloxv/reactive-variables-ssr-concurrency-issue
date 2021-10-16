import NextApp, { AppProps } from 'next/app'
import { ApolloProvider, useReactiveVar, makeVar } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { configureClient } from '../lib/apollo';
import '../styles/globals.css'

export const randomTestIndexVar = makeVar<number | null>(null);

/**
 * This set a apollo reactive variable random number on SSR
 * due is creaing a apollo cient each render/request is should have
 * a random number each time but is's keepeng the same value
 * across all the request as a global variable
 */
function MyApp({ Component, pageProps, initialState }: AppProps) {
  const apolloClient = configureClient({ initialState });
  const randomTestIndex = useReactiveVar(randomTestIndexVar);

  if (typeof window === 'undefined') {
    if (!randomTestIndex) {
      // If is null (the initial values) set a random number
      // this should be null always on each request
      randomTestIndexVar(Math.floor(Math.random() * 10));
    }
    // Try to clean value
    apolloClient.resetStore();
    // Will be the same always after the first request
    console.log('pre', randomTestIndex, initialState);
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} currentNumber={initialState?.currentNumber} />
    </ApolloProvider>
  )
}

/**
 * This create an apollo client on SSR each request,
 * removing the client creation from here or removing
 * getDataFromTree have the same result
 */
MyApp.getInitialProps = async(context) => {
  const { AppTree } = context;
  const apolloClient = configureClient(context);
  const initialProps = await NextApp.getInitialProps(context);

  await getDataFromTree(<AppTree {...initialProps} />);
  const initialState = apolloClient.extract();
  apolloClient.resetStore();
  apolloClient.stop();

  return {
    ...initialProps,
    initialState: {
      ...initialState,
      // this part is not relevant, even without this the error is the same
      // this is just to show the value in client-side
      currentNumber: randomTestIndexVar(),
    },
  };
};

export default MyApp
