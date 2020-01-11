import React, { FC, SyntheticEvent, FormHTMLAttributes } from "react";
import { withLogger } from "hoc";
import { FormControl } from "components/shared/form/form-control";
import { FormNumberField } from "components/shared/form/form-number-field";
import Discount from "csssr-school-input-discount";
import styled from "./index.module.scss";
import { Heading } from "components/shared/heading";
import { withNumber } from "hoc";

type DiscountProps = {
  onChange: (payload: { name: string; value: number }) => void;
  name: string;
  title: string;
  value: number;
};

const DiscountWithNumber = withNumber<DiscountProps>(Discount);

type Props = {
  from: number;
  to: number;
  min: number;
  max: number;
  sale: number;
  onChange: OnFilterChange;
  onSubmit?: () => void;
  className?: string;
} & FormHTMLAttributes<HTMLFormElement>;

const BaseFilter: FC<Props> = ({
  from = 0,
  to = 0,
  min = 0,
  max = 0,
  sale = 0,
  onChange,
  onSubmit = (e: SyntheticEvent) => e.preventDefault(),
  className = "",
  children,
  ...attrs
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`${styled.priceFilter} ${className}`}
      {...attrs}
    >
      <Heading level={5} className={styled.priceFilter__title}>
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

const PriceFilter = withLogger<Props>(BaseFilter, "PriceFilter");

export { PriceFilter };
