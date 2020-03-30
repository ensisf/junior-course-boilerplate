import React from "react";
import { withLogger } from "hoc";
import { FormControl } from "components/shared/form/form-control";
import { FormNumberField } from "components/shared/form/form-number-field";
import { Checkbox } from "components/shared/form/checkbox";
import { Button } from "components/shared/button";
import Discount from "csssr-school-input-discount";
import PropTypes from "prop-types";
import styled from "./index.module.scss";
import { Heading } from "components/shared/heading";
import { withNumber } from "hoc";

const DiscountWithNumber = withNumber(Discount);

const onCheckboxChange = fn => {
  return e => {
    const {
      target: { name, type, checked }
    } = e;

    fn({
      name,
      value: checked,
      type
    });
  };
};

const BaseFilter = ({
  onSubmit = e => e.preventDefault(),
  from = 0,
  to = 0,
  min = 0,
  max = 0,
  sale = 0,
  categories,
  onChange,
  onReset,
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
      <div className={styled.priceFilter__box}>
        <DiscountWithNumber
          onChange={onChange}
          title="Скидка"
          name="sale"
          value={sale}
        />
      </div>
      {categories && categories.length && (
        <>
          <Heading level={3} className={styled.priceFilter__title}>
            Категории
          </Heading>
          <div className={styled.priceFilter__box}>
            {categories.map(({ value, label, name }) => (
              <Checkbox
                className={styled.priceFilter__category}
                key={label}
                checked={value}
                name={name}
                onChange={onCheckboxChange(onChange)}
              >
                {label}
              </Checkbox>
            ))}
          </div>
        </>
      )}
      <Button
        type="reset"
        variant="light"
        onClick={onReset}
        className={styled.priceFilter__box}
      >
        Сбросить фильтры
      </Button>
    </form>
  );
};

BaseFilter.propTypes = {
  className: PropTypes.string,
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  sale: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

const PriceFilter = withLogger(BaseFilter, "PriceFilter");

export { PriceFilter };
