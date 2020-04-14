import { createStore, compose, applyMiddleware } from "redux";
import { thunk } from "rdx/middlewares";
import { combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import products from "rdx/products";
import filter from "rdx/filter";
import productById from "rdx/productById";

const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  products,
  filter,
  productById,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
);

export { store, history };
