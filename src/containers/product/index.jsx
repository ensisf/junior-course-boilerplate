import { connect } from "react-redux";

import {
  setProductId,
  resetProductbyId,
  getProductById,
} from "rdx/productById";
import { fetchProducts } from "rdx/products";

import { Product } from "pages/product";

const mapStateToProps = (state) => ({
  product: getProductById(state),
  areProductsLoading: state.products.isLoading,
  isProductLoading: state.productById.isLoading,
});

const mapActionsToProps = {
  setProductId,
  resetProductbyId,
  fetchProducts,
};

const withStore = connect(mapStateToProps, mapActionsToProps)(Product);

export { withStore as Product };
