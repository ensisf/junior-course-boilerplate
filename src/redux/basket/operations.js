import {
  startSaving,
  endSaving,
  setError,
  setSavedOn,
  setSavedOf,
} from "rdx/basket/actions.js";
import { apiClient } from "api";
import { RESPONSE_RESULTS } from "constants";

export const saveBasket = () => async (dispatch, getState) => {
  try {
    dispatch(startSaving());

    const {
      basket: { productsIds, isSaved },
    } = getState();

    if (isSaved) return;

    const { result, message } = await apiClient.post({
      url: "/save",
      options: {
        body: JSON.stringify(productsIds),
      },
    });

    if (result === RESPONSE_RESULTS.ERROR) throw Error(message);

    dispatch(setSavedOn());
  } catch (error) {
    dispatch(setError(error));
    dispatch(setSavedOf());
  } finally {
    dispatch(endSaving());
  }
};
