import { RESET_FILTER, SET_FILTER } from "rdx/action-types";
import { getActiveCategiriesNames } from "rdx/actions/helpers";
import { setToHistory } from "helpers";
import { isEmpty, clone } from "ramda";
import { CATEGORIES } from "constants";

export const resetFilter = payload => ({
  type: RESET_FILTER,
  payload
});

export const setFilter = payload => ({
  type: SET_FILTER,
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
    categories: categories && getActiveCategiriesNames(categories)
  });
};

export const filterChange = payload => dispatch => {
  console.log(payload);

  dispatch(setFilter(payload));

  if (isEmpty(payload)) return;

  dispatch(saveFilterToUrl());
};
