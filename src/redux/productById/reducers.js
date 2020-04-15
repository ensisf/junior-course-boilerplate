import {
  UPDATE,
  RESET,
  START_LOADING,
  END_LOADING,
} from "rdx/productById/types";

const INITIAL_STATE = {
  id: null,
  isLoading: false,
};

const productByIdReducer = (state = INITIAL_STATE, { type, id }) => {
  switch (type) {
    case UPDATE:
      return { ...state, id };

    case RESET:
      return { ...INITIAL_STATE };

    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default productByIdReducer;
