import {
  UPDATE,
  START_LOADING,
  END_LOADING,
  SET_PRICE_RANGE,
  SET_ERROR,
} from "rdx/products/types";
import { ITEMS_PER_PAGE } from "constants";

const INITIAL_STATE = {
  productsIds: [],
  products: [],
  itemsPerPage: ITEMS_PER_PAGE,
  priceRange: {
    min: 0,
    max: 0,
  },
  error: null,
  isLoading: true,
};

const productsReducer = (
  state = INITIAL_STATE,
  { type, products, error, priceRange }
) => {
  switch (type) {
    case UPDATE:
      const { entities, result } = products;
      return {
        ...state,
        products: entities.products,
        productsIds: result,
      };

    case SET_PRICE_RANGE:
      return { ...state, priceRange };

    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case SET_ERROR:
      return { ...state, error };

    default:
      return state;
  }
};

export default productsReducer;
