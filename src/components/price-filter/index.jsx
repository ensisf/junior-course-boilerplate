import React from "react";
import { withLogger } from "hoc";
import { FormControl } from "components/shared/form/form-control";
import { FormNumberField } from "components/shared/form/form-number-field";
import Discount from "csssr-school-input-discount";
import PropTypes from "prop-types";
import styled from "./index.module.scss";
import { Heading } from "components/shared/heading";
import { withNumber } from "hoc";

const DiscountWithNumber = withNumber(Discount);

const BaseFilter = ({
  from = 0,
  to = 0,
  min = 0,
  max = 0,
  sale = 0,
  onChange,
  onSubmit = e => e.preventDefault(),
  className = "",
  ...attrs
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`${styled.priceFilter} ${className}`}
      {...attrs}
    >
      <Heading level={3} className={styled.priceFilter__title}>
        Список товаров
      </Heading>
      <FormControl isHorizontal label="От">
        <FormNumberField
          type="number"
          step="1000"
          onChange={onChange}
          name="from"
          min={min}
          max={max}
          value={from}
        />
      </FormControl>
      <FormControl isHorizontal label="До">
        <FormNumberField
          type="number"
          step="1000"
          onChange={onChange}
          name="to"
          min={min}
          max={max}
          value={to}
        />
      </FormControl>
      <div className={styled.priceFilter__discount}>
        <DiscountWithNumber
          onChange={onChange}
          title="Скидка"
          name="sale"
          value={sale}
        />
      </div>
    </form>
  );
};

BaseFilter.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  sale: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};

const PriceFilter = withLogger(BaseFilter, "PriceFilter");

export { PriceFilter };
