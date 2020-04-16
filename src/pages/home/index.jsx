import React, { useEffect } from "react";
import ProductCard from "csssr-school-product-card";
import { Link, useHistory } from "react-router-dom";

import { useQuery, useRoute } from "hooks";
import { BUTTON_VARIANTS } from "constants";

import { Heading } from "components/shared/heading";
import { Grid } from "components/shared/grid";
import { Pagination } from "components/shared/pagination";
import { Filter } from "components/filter";
import { Rating } from "components/shared/rating";
import { Button } from "components/shared/button";
import { BasketContainer } from "containers/basket";
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
  addToBasket,
  removeFromBasket,
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

  const toggleProductInBasket = (id, isInBasket) => {
    if (isInBasket) {
      removeFromBasket(id);
    } else {
      addToBasket(id);
    }
  };

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
            render={(props) => (
              <div>
                <Link to={`/p/${props.id}`} className={styled.products__link}>
                  <ProductCardWithLogger ratingComponent={Rating} {...props} />
                </Link>
                <br />
                <Button
                  isFull
                  variant={BUTTON_VARIANTS.light}
                  onClick={() =>
                    toggleProductInBasket(props.id, props.isInBasket)
                  }
                >
                  {" "}
                  {props.isInBasket ? "Удалить" : "Добавить"}{" "}
                </Button>
              </div>
            )}
          />
          {products.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>
      )}
      <BasketContainer />
    </div>
  );
};

export { Home };
