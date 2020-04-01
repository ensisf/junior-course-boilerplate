import {
  UPDATE,
  START_LOADING,
  END_LOADING,
  SET_PRICE_RANGE,
  SET_PAGE,
  SET_ERROR
} from "rdx/products/types";
import { saveFilterToUrl } from "rdx/filter";

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

export const setCurrentPage = page => ({
  type: SET_PAGE,
  page
});

export const updateCurrentPage = page => dispatch => {
  dispatch(setCurrentPage(page));
  dispatch(saveFilterToUrl());
};
