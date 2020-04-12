import {
  addProduct,
  startLoading,
  endLoading,
  setError,
} from "rdx/productById/actions.js";

import { ERROR_CODES } from "constants";

export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());

    // Here just emulation of API-call
    const data = await import("data/products.json");
    const product = data.default.find((product) => product.id === +id);

    // if product with such id is absent
    if (product === undefined) {
      const error = new Error("Not found");
      error.code = ERROR_CODES.notFound;
      throw error;
    }

    dispatch(addProduct(product));

    dispatch(endLoading());
  } catch (error) {
    dispatch(setError(error));
  }
};
