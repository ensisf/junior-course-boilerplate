import { connect } from "react-redux";
import { getBasketData } from "rdx/basket";

import { Basket } from "pages/basket";

const mapStateToProps = (state) => {
  const { products } = getBasketData(state);
  return {
    products,
  };
};

const BasketContainer = connect(mapStateToProps)(Basket);

export { BasketContainer };
