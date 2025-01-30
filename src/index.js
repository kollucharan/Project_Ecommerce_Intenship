import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Reduxstore/store";
import { Provider } from "react-redux";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink, 
} from "@apollo/client";
import "./index.css";
import Cookies from "js-cookie";
import reportWebVitals from "./reportWebVitals";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: 'https://coherent-skink-69.hasura.app/v1/graphql', 
});
const authLink = setContext((_, { headers }) => {
 
  const token = Cookies.get('jwt_token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

 export const client = new ApolloClient({
  link: authLink.concat(httpLink),  
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
