import { connect } from "react-redux";

import { filterChange, resetFilter, getFilterProps } from "rdx/filter";
import { addToBasket, removeFromBasket } from "rdx/basket";

import {
  fetchProducts,
  getPaginationData,
  getCurrentPageProducts,
} from "rdx/products";

import { Home } from "pages/home";

const mapStateToProps = (state) => {
  const {
    filter,
    products: { isLoading, error },
  } = state;

  const { page, totalPages } = getPaginationData(state);

  return {
    isLoading,
    error,
    totalPages,
    currentPage: page,
    filterProps: getFilterProps(state),
    products: getCurrentPageProducts(state),
    filter,
  };
};

const mapActionsToProps = {
  addToBasket,
  removeFromBasket,
  fetchProducts,
  filterChange,
  resetFilter,
};

const HomeContainer = connect(mapStateToProps, mapActionsToProps)(Home);

export { HomeContainer };
