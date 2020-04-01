import {
  addProducts,
  startLoading,
  endLoading,
  setError,
  setPriceRange
} from "rdx/products/actions.js";
import { setFilter } from "rdx/filter";
import { getMaxMinPrice } from "helpers";

export const fetchProducts = () => async dispatch => {
  try {
    dispatch(startLoading());

    const data = await import("data/products.json");
    const products = data.default;
    const priceRange = getMaxMinPrice(products);

    dispatch(setPriceRange(priceRange));

    dispatch(
      setFilter({
        from: priceRange.min,
        to: priceRange.max
      })
    );

    dispatch(addProducts(products));

    dispatch(endLoading());
  } catch (error) {
    dispatch(setError(error));
    throw error;
  }
};
