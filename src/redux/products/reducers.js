import {
  UPDATE,
  START_LOADING,
  END_LOADING,
  SET_PRICE_RANGE,
  SET_ERROR
} from "rdx/products/types";

const INITIAL_STATE = {
  products: [],
  priceRange: {
    min: 0,
    max: 0
  },
  error: null,
  isLoading: false
};

const productsReducer = (
  state = INITIAL_STATE,
  { type, products, error, priceRange }
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

    default:
      return state;
  }
};

export default productsReducer;
