import { Basket } from "components/shared/basket";
import { connect } from "react-redux";
import { saveBasket, clearBasket } from "rdx/basket";

const mapStateToProps = (state) => {
  const { productsIds, isSaving, isSaved, error } = state.basket;

  return {
    isSaving,
    error,
    isSaved,
    count: productsIds.length,
  };
};

const mapActionsToProps = { onSave: saveBasket, onClear: clearBasket };

const BasketContainer = connect(mapStateToProps, mapActionsToProps)(Basket);

export { BasketContainer };
