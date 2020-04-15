import {
  UPDATE,
  RESET,
  START_LOADING,
  END_LOADING,
} from "rdx/productById/types";

export const resetProductId = () => ({
  type: RESET,
});

export const setProductId = (id) => ({
  type: UPDATE,
  id,
  meta: {
    requireProductsToBeLoaded: true,
  },
});

export const startLoading = () => ({
  type: START_LOADING,
});

export const endLoading = () => ({
  type: END_LOADING,
});
