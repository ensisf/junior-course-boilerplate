import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "rdx";

import styled from "./App.module.scss";

import { Home } from "containers/home";
import { Product } from "containers/product";
import { Page404 } from "pages/page-404";

const App = () => {
  return (
    <div className={`container ${styled.app}`}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:productId" component={Product} />
          <Route path="*" component={Page404} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

export { App };
