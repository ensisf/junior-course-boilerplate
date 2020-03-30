import { createSelector } from "reselect";

export const getFilters = state => state.filter;

export const getPriceRange = state => state.products.priceRange;

export const filterProps = createSelector(
  [getFilters, getPriceRange],
  (filter, priceRange) => ({
    ...filter,
    ...priceRange
  })
);
