import { formatProduct } from "helpers";
import { createSelector } from "reselect";
import { compose, slice, filter, map, pathOr } from "ramda";
import { ITEMS_PER_PAGE } from "constants";
import { getProductsIdsInBasket } from "rdx/basket";

export const getFilters = (state) => state.filter;

export const getQuery = (state) => state.router.location.query;

export const areProductsLoading = (state) => state.products.isLoading;

export const getProducts = (state) => state.products.products;

export const getProductsIds = (state) => state.products.productsIds;

export const getFilteredProducts = createSelector(
  [getProducts, getProductsIds, getFilters, getQuery, getProductsIdsInBasket],
  (products, productsIds, filterData, query, productsIdsInBasket) => {
    const { from, to, sale } = filterData;

    const categories = query.category ? query.category.split(",") : [];

    const filterProducts = (productid) => {
      const { price, discount, category } = products[productid];
      const satisfyCategory = categories.length
        ? categories.some((cat) => cat === category)
        : true;

      return (
        price >= from && price <= to && discount >= sale && satisfyCategory
      );
    };

    const getProduct = (id) => formatProduct(productsIdsInBasket)(products[id]);

    return compose(map(getProduct), filter(filterProducts))(productsIds);
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

    return compose(
      slice(page * itemsPerPage - itemsPerPage, itemsPerPage * page)
    )(products);
  }
);
