import {
  ADD,
  START_SAVING,
  REMOVE,
  END_SAVING,
  SET_ERROR,
  SET_SAVED_ON,
  SET_SAVED_OFF,
  CLEAR,
} from "rdx/basket/types";

export const addToBasket = (productId) => ({
  type: ADD,
  productId,
});

export const removeFromBasket = (productId) => ({
  type: REMOVE,
  productId,
});

export const clearBasket = () => ({
  type: CLEAR,
});

export const setError = (error) => ({
  type: SET_ERROR,
  error,
});

export const startSaving = () => ({
  type: START_SAVING,
});

export const endSaving = () => ({
  type: END_SAVING,
});

export const setSavedOn = () => ({
  type: SET_SAVED_ON,
});

export const setSavedOf = () => ({
  type: SET_SAVED_OFF,
});
