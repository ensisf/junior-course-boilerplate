import React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import { Link } from "react-router-dom";

import { Button } from "components/shared/button";
import { BUTTON_VARIANTS } from "constants";

import styled from "./index.module.scss";

const stylesCx = cn.bind(styled);

const BasketCard = ({
  className = "",
  count,
  totalPrice,
  isSaving,
  isSaved,
  onSave,
  onClear,
  error,
  children,
  ...attrs
}) => {
  const btnText = isSaved ? "Очистить корзину" : "Сохранить корзину";

  const clickHandler = (() => {
    switch (true) {
      case isSaved:
        return onClear;

      default:
        return onSave;
    }
  })();

  return (
    <div className={`${styled.basket} ${className}`} {...attrs}>
      {error ? (
        error.message || "Something wrong happened"
      ) : (
        <>
          <Link
            to="/basket"
            className={stylesCx({
              basket__title: true,
              isSaved,
            })}
          >
            Корзина
          </Link>
          <ul className={styled.basket__list}>
            <li className={styled.basket__listItem}>
              Товаров <span className={styled.basket__count}>{count}</span>
            </li>
            <li className={styled.basket__listItem}>
              Всего <span className={styled.basket__price}>{totalPrice} ₽</span>
            </li>
          </ul>
          {count > 0 && (
            <Button
              disabled={isSaving}
              isSpinnerShown={isSaving}
              variant={BUTTON_VARIANTS.light}
              isFull
              onClick={clickHandler}
            >
              {btnText}
            </Button>
          )}
          {children}
        </>
      )}
    </div>
  );
};

BasketCard.propTypes = {
  className: PropTypes.string,
  isSaving: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  isSaved: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export { BasketCard };
