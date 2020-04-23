import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "rdx";

import styled from "./App.module.scss";

import { HomeContainer } from "containers/home";
import { ProductContainer } from "containers/product";
import { BasketContainer } from "containers/basket";
import { Page404 } from "pages/page-404";

const App = () => {
  return (
    <div className={`container ${styled.app}`}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route
            exact
            path="/products/:productId"
            component={ProductContainer}
          />
          <Route exact path="/basket" component={BasketContainer} />
          <Route path="*" component={Page404} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

export { App };
