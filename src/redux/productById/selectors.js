import { createSelector } from "reselect";
import { formatProduct } from "helpers";
import { getProducts } from "rdx/products";

export const getId = (state) => state.productById.id;

export const getProductById = createSelector(
  [getProducts, getId],
  (products, id) => {
    const product = products.find((product) => product.id === id);
    return product && formatProduct(product);
  }
);
