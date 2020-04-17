import { UPDATE } from "rdx/productById";
import { fetchProducts } from "rdx/products";
import { startLoading, endLoading } from "rdx/productById";

export const productMiddleware = (store) => (next) => (action) => {
  const { dispatch, getState } = store;

  const requireProductsToBeLoaded = action?.meta?.requireProductsToBeLoaded;

  if (!requireProductsToBeLoaded) return next(action);

  const { products } = getState();

  const shouldLoadProducts =
    action.type === UPDATE && products.products.length === 0;

  if (shouldLoadProducts) {
    dispatch(startLoading());
    dispatch(fetchProducts());
    dispatch(endLoading());
  }

  next(action);
};
