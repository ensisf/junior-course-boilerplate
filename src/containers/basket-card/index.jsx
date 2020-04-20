import { BasketCard } from "components/shared/basket-card";
import { connect } from "react-redux";
import { saveBasket, clearBasket, getBasketData } from "rdx/basket";

const mapStateToProps = (state) => {
  const { productsIds, isSaving, isSaved, error } = state.basket;
  const { totalPrice } = getBasketData(state);
  return {
    isSaving,
    error,
    isSaved,
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
