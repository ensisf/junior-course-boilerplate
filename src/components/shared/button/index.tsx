import React, { FC, ButtonHTMLAttributes } from "react";
import styled from "./index.module.scss";
import cn from "classnames/bind";
import { Spinner } from "components/shared/spinner";
import { withLogger } from "hoc";

const stylesCx = cn.bind(styled);

type Props = {
  onClick: () => void;
  type: ButtonType;
  size?: ButtonSize;
  disabled?: boolean;
  isFull?: boolean;
  isSpinnerShown?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BaseButton: FC<Props> = ({
  onClick,
  type = "button",
  size,
  disabled,
  isFull,
  isSpinnerShown,
  className = "",
  children,
  ...attrs
}) => {
  const classNames = stylesCx({
    btn: true,
    "btn--lg": size === "lg",
    "btn--full": isFull
  });

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${classNames} ${className}`}
      onClick={onClick}
      {...attrs}
    >
      {children}
      {isSpinnerShown && <Spinner className={styled.btn__spinner} />}
    </button>
  );
};

const Button = withLogger<Props>(BaseButton, "Button");

export { Button };
