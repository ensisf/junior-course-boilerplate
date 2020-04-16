import {
  ADD,
  REMOVE,
  START_SAVING,
  END_SAVING,
  SET_ERROR,
  SET_SAVED_ON,
  SET_SAVED_OFF,
  CLEAR,
} from "rdx/basket/types";

const INITIAL_STATE = {
  error: null,
  isSaving: false,
  isSaved: false,
  productsIds: [],
};

const basketReducer = (state = INITIAL_STATE, { type, productId, error }) => {
  switch (type) {
    case ADD:
      return {
        ...state,
        productsIds: [...state.productsIds, productId],
        isSaved: false,
      };

    case REMOVE:
      const productsIds = state.productsIds.filter((id) => id !== productId);
      return { ...state, productsIds, isSaved: false };

    case CLEAR:
      return { ...state, productsIds: [], isSaved: false };

    case START_SAVING:
      return { ...state, isSaving: true };

    case END_SAVING:
      return { ...state, isSaving: false };

    case SET_SAVED_ON:
      return { ...state, isSaved: true };

    case SET_SAVED_OFF:
      return { ...state, isSaved: false };

    case SET_ERROR:
      return { ...state, error };

    default:
      return state;
  }
};

export default basketReducer;
