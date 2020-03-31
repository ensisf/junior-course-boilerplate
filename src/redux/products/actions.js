import {
  UPDATE,
  START_LOADING,
  END_LOADING,
  SET_PRICE_RANGE,
  SET_ERROR
} from "rdx/products/types";

export const addProducts = products => ({
  type: UPDATE,
  products
});

export const startLoading = () => ({
  type: START_LOADING
});

export const endLoading = () => ({
  type: END_LOADING
});

export const setError = error => ({
  type: SET_ERROR,
  error
});

export const setPriceRange = priceRange => ({
  type: SET_PRICE_RANGE,
  priceRange
});
