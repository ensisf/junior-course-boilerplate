import { createSelector } from "reselect";
import { formatProduct } from "helpers";
import { getProducts } from "rdx/products";
import { getProductsIdsInBasket } from "rdx/basket";

export const isProductLoading = (state) => state.productById.isLoading;

export const getId = (state) => state.productById.id;

export const getProductById = createSelector(
  [getProducts, getId, getProductsIdsInBasket],
  (products, id, productsIdsInBasket) => {
    const product = products[id];
    return product && formatProduct(productsIdsInBasket)(products[id]);
  }
);
