import { formatPrice } from "helpers";
import { createSelector } from "reselect";

export const getFilters = state => state.filter;

export const getProducts = state => state.products.products;

export const getSelectedCategories = state =>
  state.filter.categories.filter(({ value }) => value).map(({ name }) => name);

export const getFilteredProducts = createSelector(
  [getProducts, getFilters, getSelectedCategories],
  (products, filter, selectedCategories) => {
    const { from, to, sale } = filter;

    const filteredProducts = products
      .filter(({ price, discount, categories }) => {
        const satisfyCategory = selectedCategories.length
          ? selectedCategories.every(cat => categories.includes(cat))
          : true;

        return (
          price >= from &&
          price <= to &&
          discount >= sale / 100 &&
          satisfyCategory
        );
      })
      .map(({ price, ...rest }) => ({
        price: formatPrice(price),
        ...rest
      }));

    return filteredProducts;
  }
);
