import React from 'react';
import fetch from "node-fetch";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/client";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import Cookies from "js-cookie";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";

import { Provider as ReduxProvider } from "react-redux";
import { createStore } from "redux";
import reducers from "./store/reducers";

const store = createStore(reducers);

const client = new ApolloClient({
  fetch: fetch,
  fetchOptions: {
    credentials: "include",
  },
});

const MyApp = ({ Component, pageProps }) => {
  const shopOrigin = Cookies.get("shopOrigin");
  return (
    <AppProvider i18n={translations}>
      <Provider
        config={{
          apiKey: API_KEY,
          shopOrigin: shopOrigin,
          forceRedirect: true,
        }}
      >
        <ApolloProvider client={client}>
          <ReduxProvider store={store}>
            <Component {...pageProps} />
          </ReduxProvider>
        </ApolloProvider>
      </Provider>
    </AppProvider>
  );
};

export default MyApp;
