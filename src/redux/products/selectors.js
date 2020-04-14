import { formatPrice } from "helpers";
import { createSelector } from "reselect";
import { compose, slice, filter, map, pathOr } from "ramda";
import { ITEMS_PER_PAGE } from "constants";

export const getFilters = (state) => state.filter;

export const getQuery = (state) => state.router.location.query;

export const getProducts = (state) => state.products.products;

export const getFilteredProducts = createSelector(
  [getProducts, getFilters, getQuery],
  (products, filterData, query) => {
    const { category } = query;

    const { from, to, sale } = filterData;

    const filterProducts = ({ price, discount, categories }) => {
      const satisfyCategory = category
        ? categories.some((cat) => category === cat)
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
      ...rest,
    });

    return compose(map(formatProducts), filter(filterProducts))(products);
  }
);

export const getPageData = (state) => {
  const { itemsPerPage } = state.products;
  const page = pathOr(1, ["router", "location", "query", "page"], state);

  return {
    itemsPerPage,
    page: Number(page),
  };
};

export const getPaginationData = createSelector(
  [getPageData, getFilteredProducts],
  ({ itemsPerPage, page }, filteredProducts) => {
    let totalPages = 1;

    const { length } = filteredProducts;

    if (length) {
      totalPages = Math.ceil(length / ITEMS_PER_PAGE);
    }

    return {
      itemsPerPage,
      page,
      totalPages,
    };
  }
);

export const getCurrentPageProducts = createSelector(
  [getFilteredProducts, getPaginationData],
  (products, pageData) => {
    const { itemsPerPage, page } = pageData;
    return slice(
      page * itemsPerPage - itemsPerPage,
      itemsPerPage * page
    )(products);
  }
);
