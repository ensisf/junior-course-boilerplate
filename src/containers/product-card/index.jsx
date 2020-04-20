import { connect } from "react-redux";

import { addToBasket, removeFromBasket } from "rdx/basket";

import { ProductCard } from "components/shared/product-card";

const mapActionsToProps = {
  addToBasket,
  removeFromBasket,
};

const withStore = connect(null, mapActionsToProps)(ProductCard);

export { withStore as ProductCardContainer };
