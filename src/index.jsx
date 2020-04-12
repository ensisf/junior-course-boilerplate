import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "rdx";
import { App } from "containers/app";
import "assets/styles/index.scss";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
