import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/components/App/App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "react-oidc-context";
import {oidcConfig} from "./utils/IDS4"
import { BrowserRouter as Router } from 'react-router-dom';
import {ApolloProvider} from '@apollo/client'
import client from "./apollo/client"





const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
  <AuthProvider {...oidcConfig}>
  <Router>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </Router>
  </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
