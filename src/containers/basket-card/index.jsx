import { BasketCard } from "components/shared/basket-card";
import { connect } from "react-redux";
import {
  saveBasket,
  clearBasket,
  getBasketData,
  getProductsIdsInBasket,
  isBasketSaving,
  isBasketSaved,
  getBasketError,
} from "rdx/basket";

const mapStateToProps = (state) => {
  const productsIds = getProductsIdsInBasket(state);
  const { totalPrice } = getBasketData(state);
  return {
    isSaving: isBasketSaving(state),
    error: getBasketError(state),
    isSaved: isBasketSaved(state),
    totalPrice,
    count: productsIds.length,
  };
};

const mapActionsToProps = { onSave: saveBasket, onClear: clearBasket };

const BasketCardContainer = connect(
  mapStateToProps,
  mapActionsToProps
)(BasketCard);

export { BasketCardContainer };
