import { RESET, UPDATE } from "rdx/filter/types";
import { getActiveCategoriesNames } from "rdx/helpers";
import { setToHistory } from "helpers";
import { isEmpty, clone } from "ramda";
import { CATEGORIES } from "constants";

export const resetFilter = payload => ({
  type: RESET,
  payload
});

export const setFilter = payload => ({
  type: UPDATE,
  payload
});

export const restoreFilter = () => (dispatch, getState) => {
  const {
    products: { priceRange }
  } = getState();

  const payload = {
    from: priceRange.min,
    to: priceRange.max,
    sale: 0,
    categories: clone(CATEGORIES)
  };

  dispatch(setFilter(payload));
};

export const saveFilterToUrl = () => (_dispatch, getState) => {
  const {
    filter: { from, to, sale, categories }
  } = getState();

  setToHistory({
    from,
    to,
    sale,
    categories: categories && getActiveCategoriesNames(categories)
  });
};

export const filterChange = payload => dispatch => {
  dispatch(setFilter(payload));

  if (isEmpty(payload)) return;

  dispatch(saveFilterToUrl());
};
