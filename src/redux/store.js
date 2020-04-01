import { createStore, compose, applyMiddleware } from "redux";
import { thunk } from "rdx/middlewares";
import { combineReducers } from "redux";
import products from "rdx/products";
import filter from "rdx/filter";

const rootReducer = combineReducers({
  products,
  filter
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export { store };
