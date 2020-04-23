import React from "react";

import { PageLayout } from "components/shared/page-layout";
import { Grid } from "components/shared/grid";

import { ProductCardContainer } from "containers/product-card";
import { BasketCardContainer } from "containers/basket-card";

import styled from "./index.module.scss";

const Basket = ({ products }) => {
  return (
    <PageLayout title="Корзина">
      <div className={styled.basket}>
        <Grid
          className={styled.basket__list}
          columnsCount={3}
          items={products}
          emptyListPlaceholder="Корзина пуста"
          render={(props) => <ProductCardContainer {...props} />}
        />
        <BasketCardContainer />
      </div>
    </PageLayout>
  );
};

export { Basket };
