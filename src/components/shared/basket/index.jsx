import React from "react";
import PropTypes from "prop-types";
import styled from "./index.module.scss";
import { Button } from "components/shared/button";
import { BUTTON_VARIANTS } from "constants";
import cn from "classnames/bind";

const stylesCx = cn.bind(styled);

const Basket = ({
  className = "",
  count,
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
          <div className={styled.basket__title}>
            Корзина
            <span
              className={stylesCx({
                basket__count: true,
                isSaved,
              })}
            >
              {count}
            </span>
          </div>
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

Basket.propTypes = {
  className: PropTypes.string,
  isSaving: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
  isSaved: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export { Basket };
