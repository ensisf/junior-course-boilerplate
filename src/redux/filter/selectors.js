import { createSelector } from "reselect";

export const getFilters = state => state.filter;

export const getPriceRange = state => state.products.priceRange;

export const getFilterProps = createSelector(
  [getFilters, getPriceRange],
  (filter, priceRange) => ({
    ...filter,
    ...priceRange
  })
);
