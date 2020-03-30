import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "rdx/reducers";
import { thunk } from "rdx/middlewares";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export { store };
