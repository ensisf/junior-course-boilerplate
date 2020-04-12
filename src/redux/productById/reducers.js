import {
  UPDATE,
  RESET,
  START_LOADING,
  END_LOADING,
  SET_ERROR,
} from "rdx/productById/types";

const INITIAL_STATE = {
  product: null,
  error: null,
  isLoading: false,
};

const productByIdReducer = (
  state = INITIAL_STATE,
  { type, product, error }
) => {
  switch (type) {
    case UPDATE:
      return { ...state, product };

    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case SET_ERROR:
      return { ...state, error };

    case RESET:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export default productByIdReducer;
