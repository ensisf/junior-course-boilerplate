import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductCard from "csssr-school-product-card";

import { restoreFilter, filterChange, getFilterProps } from "rdx/filter";
import {
  fetchProducts,
  updateCurrentPage,
  getTotalPages,
  getCurrentPageProducts
} from "rdx/products";

import { Heading } from "components/shared/heading";
import { Grid } from "components/shared/grid";
import { Pagination } from "components/shared/pagination";
import { PriceFilter } from "components/price-filter";
import { Spinner } from "components/shared/spinner";
import { withLogger } from "hoc";
import { getFiltersFromUrl } from "helpers";
import { CATEGORIES } from "constants";
import { isEmpty } from "ramda";

import styled from "./index.module.scss";

const Rating = ({ isFilled }) => (isFilled ? "★" : "☆");

const ProductCardWithLogger = withLogger(ProductCard, "ProductCard");

const App = props => {
  const {
    isLoading,
    error,
    products,
    updateCurrentPage,
    currentPage,
    priceRange,
    totalPages,
    filterProps,
    fetchProducts,
    filterChange,
    restoreFilter
  } = props;

  const applyFiltersFromUrl = () => {
    const filters = getFiltersFromUrl();
    if (isEmpty(filters)) return;
    filterChange({ ...priceRange, ...filters });
  };

  const onCategoryChange = ({ name, value }) => {
    const categories = CATEGORIES.map(cat => {
      if (name === cat.name) {
        return {
          ...cat,
          value
        };
      }

      return cat;
    });

    filterChange({ categories });
  };

  const onFilterChange = ({ name, value, type }) => {
    if (type === "checkbox") {
      onCategoryChange({ name, value });
      return;
    }

    filterChange({
      [name]: Number(value)
    });
  };

  const onFilterReset = () => {
    window.history.pushState(null, null, "/");
    restoreFilter();
  };

  const onProdutsFetch = async () => {
    await fetchProducts();
    applyFiltersFromUrl();
  };

  useEffect(() => {
    window.addEventListener("popstate", applyFiltersFromUrl);

    onProdutsFetch();

    return function cleanup() {
      window.removeEventListener("popstate", applyFiltersFromUrl);
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="app">
      <div className={styled.products}>
        <Heading className={styled.products__title}>Список товаров</Heading>
        <PriceFilter
          onChange={onFilterChange}
          onReset={onFilterReset}
          {...filterProps}
        />
        {error ? (
          "Something unexpected happened."
        ) : isLoading ? (
          <div className={styled.products__loading}>
            <Spinner size="3em" />
          </div>
        ) : (
          <div>
            <Grid
              columnsCount={3}
              className={styled.products__list}
              items={products}
              emptyListPlaceholder="По заданным параметрам ничего не найдено."
              render={props => (
                <ProductCardWithLogger ratingComponent={Rating} {...props} />
              )}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={updateCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const {
    filter,
    products: { isLoading, error, priceRange, page }
  } = state;

  return {
    priceRange,
    isLoading,
    error,
    totalPages: getTotalPages(state),
    currentPage: page,
    filterProps: getFilterProps(state),
    products: getCurrentPageProducts(state),
    filter
  };
};

const mapActionsToProps = {
  fetchProducts,
  restoreFilter,
  filterChange,
  updateCurrentPage
};

const withStore = connect(mapStateToProps, mapActionsToProps)(App);

export { withStore as App };
