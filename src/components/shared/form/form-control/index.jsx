import React from "react";
import PropTypes from "prop-types";
import styled from "./index.module.scss";
import cn from "classnames/bind";
import { withLogger } from "hoc";

const stylesCx = cn.bind(styled);

const BaseFormControl = ({
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

BaseFormControl.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  isHorizontal: PropTypes.bool
};

const FormControl = withLogger(BaseFormControl, "FormControl");

export { FormControl };
