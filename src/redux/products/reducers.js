import {
  UPDATE,
  START_LOADING,
  END_LOADING,
  SET_PRICE_RANGE,
  SET_ERROR,
  SET_PAGE
} from "rdx/products/types";
import { ITEMS_PER_PAGE } from "constants";

const INITIAL_STATE = {
  products: [],
  itemsPerPage: ITEMS_PER_PAGE,
  page: 1,
  priceRange: {
    min: 0,
    max: 0
  },
  error: null,
  isLoading: false
};

const productsReducer = (
  state = INITIAL_STATE,
  { type, products, error, priceRange, page }
) => {
  switch (type) {
    case UPDATE:
      return { ...state, products };

    case SET_PRICE_RANGE:
      return { ...state, priceRange };

    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case SET_ERROR:
      return { ...state, error };

    case SET_PAGE:
      return { ...state, page };

    default:
      return state;
  }
};

export default productsReducer;
