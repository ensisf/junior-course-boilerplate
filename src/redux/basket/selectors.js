import { createSelector } from "reselect";
import { formatProduct } from "helpers";

export const getProductsIdsInBasket = (state) => state.basket.productsIds;

export const getProducts = (state) => state.products.products;

export const getBasketData = createSelector(
  [getProductsIdsInBasket, getProducts],
  (ids, products) =>
    ids.reduce(
      (acc, currId) => {
        const currentProduct = products[currId];
        return {
          totalPrice: acc.totalPrice + currentProduct.price,
          products: [...acc.products, formatProduct(ids)(currentProduct)],
        };
      },
      {
        totalPrice: 0,
        products: [],
      }
    )
);
