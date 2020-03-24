import {
  ADD_PRODUCTS,
  START_LOADING,
  END_LOADING,
  SET_PRICE_RANGE,
  SET_ERROR
} from "rdx/action-types";
import { getMaxMinPrice } from "helpers";

export const addProducts = products => ({
  type: ADD_PRODUCTS,
  products
});

const startLoading = () => ({
  type: START_LOADING
});

const endLoading = () => ({
  type: END_LOADING
});

const setError = error => ({
  type: SET_ERROR,
  error
});

const setPriceRange = priceRange => ({
  type: SET_PRICE_RANGE,
  priceRange
});

export const fetchProducts = () => async dispatch => {
  try {
    dispatch(startLoading());

    const data = await import("data/products.json");
    const products = data.default;
    const priceRange = getMaxMinPrice(products);

    dispatch(setPriceRange(priceRange));

    dispatch(addProducts(products));

    dispatch(endLoading());
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};
