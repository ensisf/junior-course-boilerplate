import {
  ADD_PRODUCTS,
  START_LOADING,
  END_LOADING,
  SET_PRICE_RANGE,
  SET_ERROR
} from "rdx/action-types";

const INITIAL_STATE = {
  products: [],
  priceRange: {
    min: 0,
    max: 0
  },
  error: null,
  isLoading: false
};

export const products = (
  state = INITIAL_STATE,
  { type, products, error, priceRange }
) => {
  switch (type) {
    case ADD_PRODUCTS:
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
