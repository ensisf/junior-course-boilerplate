import { connect } from "react-redux";

import {
  setProductId,
  resetProductbyId,
  getProductById,
  isProductLoading,
} from "rdx/productById";
import { fetchProducts, areProductsLoading } from "rdx/products";

import { Product } from "pages/product";

const mapStateToProps = (state) => ({
  product: getProductById(state),
  areProductsLoading: areProductsLoading(state),
  isProductLoading: isProductLoading(state),
});

const mapActionsToProps = {
  setProductId,
  resetProductbyId,
  fetchProducts,
};

const withStore = connect(mapStateToProps, mapActionsToProps)(Product);

export { withStore as Product };
