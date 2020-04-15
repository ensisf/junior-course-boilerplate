import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProductCard from "csssr-school-product-card";
import { Link, useHistory } from "react-router-dom";

import { filterChange, resetFilter, getFilterProps } from "rdx/filter";
import { useQuery, useRoute } from "hooks";

import {
  fetchProducts,
  getPaginationData,
  getCurrentPageProducts,
} from "rdx/products";

import { Heading } from "components/shared/heading";
import { Grid } from "components/shared/grid";
import { Pagination } from "components/shared/pagination";
import { Filter } from "components/filter";
import { Rating } from "components/shared/rating";
import { withLogger } from "hoc";

import EmptyListPlaceholder from "assets/img/ill-planet.svg";
import Placeholder from "assets/img/placeholder.svg";
import styled from "./index.module.scss";

const ProductCardWithLogger = withLogger(ProductCard, "ProductCard");

const loadingItems = Array.from({ length: 6 }).map((_, idx) => ({ idx }));

const Home = ({
  isLoading,
  error,
  products,
  currentPage,
  totalPages,
  resetFilter,
  filterProps,
  fetchProducts,
  filterChange,
}) => {
  const history = useHistory();

  const createRoute = useRoute();

  const query = useQuery();

  const applyFiltersFromUrl = () => {
    const { from, to, sale } = query;
    filterChange({ from, to, sale });
  };

  const onFilterChange = ({ name, value }) => {
    const payload = {
      [name]: Number(value),
    };

    filterChange(payload);

    history.push(createRoute(payload));
  };

  const onCategoryClick = (e) => {
    e.preventDefault();
    const newCategory = e.target.dataset.category;

    let payload = {
      category: [],
    };

    if (query.category === undefined) {
      payload.category = newCategory;
    } else {
      const selected = Array.isArray(query.category)
        ? query.category
        : [query.category];

      if (selected.some((cat) => cat === newCategory)) {
        payload.category = selected.filter((cat) => cat !== newCategory);
      } else {
        payload.category.push(...selected, newCategory);
      }
    }
    history.push(createRoute(payload));
  };

  useEffect(() => {
    (async () => {
      await fetchProducts();
      applyFiltersFromUrl();
    })();
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const title =
    !isLoading && products.length === 0
      ? "Товары не найдены"
      : "Список товаров";

  return (
    <div className={styled.products}>
      <Heading className={styled.products__title}>{title}</Heading>
      <Filter
        onChange={onFilterChange}
        onCategoryClick={onCategoryClick}
        onReset={resetFilter}
        {...filterProps}
      />
      {error ? (
        error.message || "Something unexpected happened."
      ) : isLoading ? (
        <Grid
          columnsCount={3}
          className={styled.products__list}
          items={loadingItems}
          keyValue="idx"
          emptyListPlaceholder="По заданным параметрам ничего не найдено."
          render={() => <img width="100%" src={Placeholder} alt="Loading..." />}
        />
      ) : (
        <div>
          <Grid
            columnsCount={3}
            className={styled.products__list}
            items={products}
            emptyListPlaceholder={
              <img src={EmptyListPlaceholder} alt="Nothing found" />
            }
            render={(props) => (
              <Link to={`/p/${props.id}`} className={styled.products__link}>
                <ProductCardWithLogger ratingComponent={Rating} {...props} />
              </Link>
            )}
          />
          {products.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>
      )}
    </div>
  );
};

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
  fetchProducts,
  filterChange,
  resetFilter,
};

const withStore = connect(mapStateToProps, mapActionsToProps)(Home);

export { withStore as Home };
