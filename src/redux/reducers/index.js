import { combineReducers } from "redux";
import { products } from "./products";
import { filter } from "./filter";

const rootReducer = combineReducers({ products, filter });

export { rootReducer };
