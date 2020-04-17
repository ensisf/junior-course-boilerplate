import { formatProduct } from "helpers";
import { createSelector } from "reselect";
import { compose, slice, filter, map, pathOr } from "ramda";
import { ITEMS_PER_PAGE } from "constants";

export const getFilters = (state) => state.filter;

export const getProductsIdsInBasket = (state) => state.basket.productsIds;

export const getQuery = (state) => state.router.location.query;

export const getProducts = (state) => state.products.products;

export const getFilteredProducts = createSelector(
  [getProducts, getFilters, getQuery],
  (products, filterData, query) => {
    const { from, to, sale } = filterData;

    const categories = query.category ? query.category.split(",") : [];

    const filterProducts = ({ price, discount, category }) => {
      const satisfyCategory = categories.length
        ? categories.some((cat) => cat === category)
        : true;

      return (
        price >= from && price <= to && discount >= sale && satisfyCategory
      );
    };

    return compose(map(formatProduct), filter(filterProducts))(products);
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
  [getFilteredProducts, getPaginationData, getProductsIdsInBasket],
  (products, pageData, productsIdsInBasket) => {
    const { itemsPerPage, page } = pageData;
    const addBasketFlag = (product) => ({
      isInBasket: productsIdsInBasket.some((id) => id === product.id),
      ...product,
    });

    return compose(
      map(addBasketFlag),
      slice(page * itemsPerPage - itemsPerPage, itemsPerPage * page)
    )(products);
  }
);
