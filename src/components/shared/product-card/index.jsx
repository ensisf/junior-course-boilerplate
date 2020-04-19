import React from "react";
import PropTypes from "prop-types";
import ProductItem from "csssr-school-product-card";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

import { withLogger } from "hoc";
import { Rating } from "components/shared/rating";
import { BUTTON_VARIANTS } from "constants";
import { Button } from "components/shared/button";

const BaseProductCard = ({
  className = "",
  id,
  isInBasket,
  addToBasket,
  isInStock,
  removeFromBasket,
  ...restProps
}) => {
  const onToggleBasket = (id, isInBasket) =>
    isInBasket ? removeFromBasket(id) : addToBasket(id);

  return (
    <div className={`${styles.productCard} ${className}`}>
      <Link to={`/products/${id}`} className={styles.productCard__link}>
        <ProductItem
          ratingComponent={Rating}
          {...restProps}
          isInStock={isInStock}
          id={id}
        />
      </Link>
      <Button
        className={styles.productCard__basketBtn}
        isFull
        variant={BUTTON_VARIANTS.light}
        onClick={() => onToggleBasket(id, isInBasket)}
        disabled={!isInStock}
      >
        {isInBasket ? "Удалить" : "Добавить"}
      </Button>
    </div>
  );
};

BaseProductCard.propTypes = {
  isInBasket: PropTypes.bool.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  addToBasket: PropTypes.func.isRequired,
  removeFromBasket: PropTypes.func.isRequired,
};

const ProductWithLogger = withLogger(BaseProductCard, "ProductCard");

export { ProductWithLogger as ProductCard };
