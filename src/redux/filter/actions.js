import { UPDATE } from "rdx/filter/types";
import { normalizeObjForFilter } from "helpers";

export const setFilter = (payload) => ({
  type: UPDATE,
  payload,
});

export const resetFilter = () => (dispatch, getState) => {
  const {
    products: { priceRange },
  } = getState();

  const payload = {
    from: priceRange.min,
    to: priceRange.max,
    sale: 0,
  };

  dispatch(setFilter(payload));
};

export const filterChange = (payload) => (dispatch) => {
  dispatch(setFilter(normalizeObjForFilter(payload)));
};
