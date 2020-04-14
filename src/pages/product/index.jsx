import React, { useEffect } from "react";
import ProductCard from "csssr-school-product-card";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchProductById, resetProduct } from "rdx/productById";

import { ERROR_CODES } from "constants";

import styled from "./index.module.scss";

import { PageLayout } from "components/shared/page-layout";
import { Spinner } from "components/shared/spinner";
import { Rating } from "components/shared/rating";
import { NotFound } from "pages/not-found";

const Product = ({
  fetchProductById,
  resetProduct,
  product,
  error,
  isLoading,
}) => {
  const { productId } = useParams();

  useEffect(() => {
    fetchProductById(productId);

    return resetProduct;
  }, [fetchProductById, productId, resetProduct]);

  if (error !== null) {
    return error.code === ERROR_CODES.notFound ? (
      <NotFound />
    ) : (
      "Something unexpected happened."
    );
  }

  return isLoading ? (
    <div className={styled.loader}>
      <Spinner size="3em" />
    </div>
  ) : (
    product && (
      <PageLayout title={product.title}>
        <div className={styled.card}>
          <ProductCard ratingComponent={Rating} {...product} />
        </div>
      </PageLayout>
    )
  );
};

const mapStateToProps = ({ productById }) => ({
  ...productById,
});

const mapActionsToProps = {
  fetchProductById,
  resetProduct,
};

const withStore = connect(mapStateToProps, mapActionsToProps)(Product);

export { withStore as Product };
