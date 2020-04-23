import {
  addProducts,
  startLoading,
  endLoading,
  setError,
  setPriceRange,
} from "rdx/products/actions.js";
import { setFilter } from "rdx/filter";
import { getMaxMinPrice } from "helpers";
import { apiClient } from "api";
import { RESPONSE_RESULTS } from "constants";

import { normalize, schema } from "normalizr";

const productsSchema = [new schema.Entity("products")];

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(startLoading());

    const { result, products, message } = await apiClient.get({
      url: "/products",
    });

    if (result === RESPONSE_RESULTS.ERROR) throw Error(message);

    const priceRange = getMaxMinPrice(products);

    dispatch(setPriceRange(priceRange));

    dispatch(
      setFilter({
        from: priceRange.min,
        to: priceRange.max,
      })
    );

    dispatch(addProducts(normalize(products, productsSchema)));
    dispatch(endLoading());
  } catch (error) {
    dispatch(setError(error));
  }
};
