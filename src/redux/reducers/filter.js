import { clone } from "ramda";

import { RESET_FILTER, SET_FILTER } from "rdx/action-types";
import { CATEGORIES } from "constants";

const INITIAL_STATE = {
  from: 0,
  to: 0,
  sale: 0,
  categories: clone(CATEGORIES)
};

export const filter = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_FILTER:
      return { ...state, ...payload };

    case RESET_FILTER:
      return payload;

    default:
      return state;
  }
};
