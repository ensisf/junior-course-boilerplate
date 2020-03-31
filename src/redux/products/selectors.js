import { formatPrice } from "helpers";
import { createSelector } from "reselect";
import { compose, slice, filter, map } from "ramda";
import { ITEMS_PER_PAGE } from "constants";

export const getFilters = state => state.filter;

export const getProducts = state => state.products.products;

export const getPageData = state => {
  const { itemsPerPage, page } = state.products;

  return {
    itemsPerPage,
    page
  };
};

export const getSelectedCategories = state =>
  state.filter.categories.filter(({ value }) => value).map(({ name }) => name);

export const getFilteredProducts = createSelector(
  [getProducts, getFilters, getSelectedCategories],
  (products, filterData, selectedCategories) => {
    const { from, to, sale } = filterData;

    const filterProducts = ({ price, discount, categories }) => {
      const satisfyCategory = selectedCategories.length
        ? selectedCategories.every(cat => categories.includes(cat))
        : true;

      return (
        price >= from &&
        price <= to &&
        discount >= sale / 100 &&
        satisfyCategory
      );
    };

    const formatProducts = ({ price, ...rest }) => ({
      price: formatPrice(price),
      ...rest
    });

    return compose(map(formatProducts), filter(filterProducts))(products);
  }
);

export const getCurrentPageProducts = createSelector(
  [getFilteredProducts, getPageData],
  (products, pageData) => {
    const { itemsPerPage, page } = pageData;
    return slice(
      page * itemsPerPage - itemsPerPage,
      itemsPerPage * page
    )(products);
  }
);

export const getTotalPages = createSelector(
  [getFilteredProducts],
  filteredProducts => {
    const { length } = filteredProducts;
    if (!length) return 1;
    return Math.ceil(length / ITEMS_PER_PAGE);
  }
);
