import React from "react";
import PropTypes from "prop-types";
import styled from "./index.module.scss";
import cn from "classnames/bind";
import { Spinner } from "components/shared/spinner";
import { withLogger } from "hoc";
import { BUTTON_SIZES, BUTTON_TYPES, BUTTON_VARIANTS } from "constants";
import { Link } from "react-router-dom";

const stylesCx = cn.bind(styled);

const BUTTON_COMPONENTS = {
  routerLink: Link,
  button: "button",
};

const BaseButton = ({
  onClick,
  type = BUTTON_TYPES.button,
  component,
  size,
  pill,
  variant,
  disabled,
  isFull,
  isSpinnerShown,
  className = "",
  children,
  ...attrs
}) => {
  const classNames = stylesCx({
    btn: true,
    "btn--lg": size === BUTTON_SIZES.lg,
    "btn--full": isFull,
    "btn--light": variant === BUTTON_VARIANTS.light,
    "btn--primary": variant === BUTTON_VARIANTS.primary,
    "btn--pill": pill,
  });

  const Component = BUTTON_COMPONENTS[component] || "button";

  return (
    <Component
      type={type}
      disabled={disabled}
      className={`${classNames} ${className}`}
      onClick={onClick}
      {...attrs}
    >
      {children}
      {isSpinnerShown && <Spinner className={styled.btn__spinner} />}
    </Component>
  );
};

BaseButton.propTypes = {
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(BUTTON_SIZES)),
  variant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
};

const Button = withLogger(BaseButton, "Button");

export { Button };
