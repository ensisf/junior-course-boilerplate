import { UPDATE } from "rdx/filter/types";

const INITIAL_STATE = {
  from: 0,
  to: 0,
  sale: 0,
};

const filterReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UPDATE:
      return { ...state, ...payload };

    default:
      return state;
  }
};

export default filterReducer;
