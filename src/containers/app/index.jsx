import React from "react";
import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "rdx";

import styled from "./index.module.scss";

import { Home } from "pages/home";
import { Product } from "pages/product";
import { NotFound } from "pages/not-found";

const App = () => {
  return (
    <div className={`container ${styled.app}`}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:productId" component={Product} />
          <Route path="*" component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

export { App };
