import React, { useEffect } from "react";
import ProductCard from "csssr-school-product-card";
import { useParams } from "react-router-dom";

import styled from "./index.module.scss";
import Placeholder from "assets/img/placeholder.svg";

import { PageLayout } from "components/shared/page-layout";
import { Rating } from "components/shared/rating";
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
        <ProductCard ratingComponent={Rating} {...product} />
      </div>
    </PageLayout>
  );
};

export { Product };
