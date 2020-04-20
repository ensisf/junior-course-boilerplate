import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "./index.module.scss";
import Placeholder from "assets/img/placeholder.svg";

import { ProductCardContainer } from "containers/product-card";

import { PageLayout } from "components/shared/page-layout";
import { NotFound } from "pages/not-found";

const Product = ({
  setProductId,
  resetProductbyId: resetProductId,
  product,
  areProductsLoading,
  isProductLoading,
}) => {
  const { productId } = useParams();

  useEffect(() => {
    setProductId(productId && Number(productId));
    return resetProductId;
  }, [resetProductId, setProductId, productId]);

  if (areProductsLoading || isProductLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <img src={Placeholder} alt="Loading..." />
      </div>
    );
  }

  return product === undefined ? (
    <NotFound />
  ) : (
    <PageLayout title={product.title}>
      <div className={styled.card}>
        <ProductCardContainer className={styled.card__product} {...product} />
      </div>
    </PageLayout>
  );
};

export { Product };
