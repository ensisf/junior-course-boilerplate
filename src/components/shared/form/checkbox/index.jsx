import React from "react";
import PropTypes from "prop-types";
import styled from "./index.module.scss";
import { withLogger } from "hoc";

const BaseCheckbox = ({
  onChange,
  checked,
  className = "",
  children,
  ...attrs
}) => {
  return (
    <label className={`${styled.checkbox} ${className}`}>
      <input
        onChange={onChange}
        type="checkbox"
        checked={checked}
        className={styled.checkbox__field}
        {...attrs}
      />
      <span className={styled.checkbox__text}>{children}</span>
    </label>
  );
};

BaseCheckbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string
};

const Checkbox = withLogger(BaseCheckbox, "Checkbox");

export { Checkbox };
