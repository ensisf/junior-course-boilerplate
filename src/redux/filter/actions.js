import { UPDATE } from "rdx/filter/types";
import { getActiveCategoriesNames } from "rdx/helpers";
import { updateCurrentPage } from "rdx/products";
import { setToHistory } from "helpers";
import { isEmpty, clone } from "ramda";
import { CATEGORIES, START_PAGE_NUMBER } from "constants";
import { setCurrentPage } from "rdx/products";

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

  dispatch(updateCurrentPage(START_PAGE_NUMBER));

  dispatch(setFilter(payload));
};

export const saveFilterToUrl = () => (_dispatch, getState) => {
  const {
    filter: { from, to, sale, categories },
    products: { page }
  } = getState();

  setToHistory({
    from,
    to,
    page,
    sale,
    categories: categories && getActiveCategoriesNames(categories)
  });
};

export const filterChange = payload => dispatch => {
  dispatch(setCurrentPage(payload.page || START_PAGE_NUMBER));

  dispatch(setFilter(payload));

  if (isEmpty(payload)) return;

  dispatch(saveFilterToUrl());
};
