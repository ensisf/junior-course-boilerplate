import {
  UPDATE,
  RESET,
  START_LOADING,
  END_LOADING,
  SET_ERROR,
} from "rdx/productById/types";

export const addProduct = (product) => ({
  type: UPDATE,
  product,
});
export const resetProduct = () => ({
  type: RESET,
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});

export const setError = (error) => ({
  type: SET_ERROR,
  error,
});
