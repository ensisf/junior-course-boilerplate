import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useQuery, useRoute } from "hooks";

import { Heading } from "components/shared/heading";
import { Grid } from "components/shared/grid";
import { Pagination } from "components/shared/pagination";
import { Filter } from "components/filter";

import { ProductCardContainer } from "containers/product-card";
import { BasketCardContainer } from "containers/basket-card";

import EmptyListPlaceholder from "assets/img/ill-planet.svg";
import Placeholder from "assets/img/placeholder.svg";
import styled from "./index.module.scss";

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
      const selected = query.category.split(",");

      if (selected.some((cat) => cat === newCategory)) {
        payload.category = selected.filter((cat) => cat !== newCategory);
      } else {
        payload.category = [...new Set([...selected, newCategory])].join(",");
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

  const pageTitle =
    !isLoading && products.length === 0
      ? "Товары не найдены"
      : "Список товаров";

  return (
    <div className={styled.products}>
      <Heading className={styled.products__title}>{pageTitle}</Heading>
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
            render={(props) => <ProductCardContainer {...props} />}
          />
          {products.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>
      )}
      <BasketCardContainer />
    </div>
  );
};

export { Home };
