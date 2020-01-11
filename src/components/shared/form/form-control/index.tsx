import React, { FC, HTMLAttributes } from "react";
import styled from "./index.module.scss";
import cn from "classnames/bind";
import { withLogger } from "hoc";

const stylesCx = cn.bind(styled);

type Props = {
  className?: string;
  label?: string;
  hint?: string;
  isHorizontal?: boolean;
} & HTMLAttributes<HTMLDivElement>;

const BaseFormControl: FC<Props> = ({
  className = "",
  label,
  hint,
  isHorizontal,
  children,
  ...attrs
}) => {
  const classNames = stylesCx({
    formControl: true,
    isHorizontal
  });

  return (
    <div className={`${classNames} ${className}`} {...attrs}>
      <label className={styled.formControl__label}>
        {label && (
          <span className={styled.formControl__labelText}>{label}</span>
        )}
        {children}
      </label>
      {hint && <small className={styled.formControl__hint}>{hint}</small>}
    </div>
  );
};

const FormControl = withLogger<Props>(BaseFormControl, "FormControl");

export { FormControl };
