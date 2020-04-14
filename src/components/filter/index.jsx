import React from "react";
import { withLogger } from "hoc";
import { FormControl } from "components/shared/form/form-control";
import { FormNumberField } from "components/shared/form/form-number-field";
import { Button } from "components/shared/button";
import Discount from "csssr-school-input-discount";
import PropTypes from "prop-types";
import styled from "./index.module.scss";
import { Heading } from "components/shared/heading";
import { withNumber } from "hoc";
import { BUTTON_VARIANTS } from "constants";
import { useRoute, useQuery } from "hooks";

const DiscountWithNumber = withNumber(Discount);

const BaseFilter = ({
  onSubmit = (e) => e.preventDefault(),
  from = 0,
  to = 0,
  min = 0,
  max = 0,
  sale = 0,
  categories,
  onChange,
  onCategoryClick = () => {},
  onReset = () => {},
  className = "",
  ...attrs
}) => {
  const createRoute = useRoute();

  const getRoute = (categoryName) =>
    createRoute({ category: categoryName, page: 1 });

  const { category } = useQuery();

  const getBtnVariant = (categoryName) => {
    const { primary, light } = BUTTON_VARIANTS;

    if (!Array.isArray(category)) {
      return categoryName === category ? primary : light;
    }

    return category.some((cat) => cat === categoryName);
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`${styled.filter} ${className}`}
      {...attrs}
    >
      <Heading level={3} className={styled.filter__title}>
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
      <div className={styled.filter__box}>
        <DiscountWithNumber
          onChange={onChange}
          title="Скидка"
          name="sale"
          value={sale}
        />
      </div>
      {categories && categories.length && (
        <>
          <Heading level={3} className={styled.filter__title}>
            Категории
          </Heading>
          <div className={styled.filter__box}>
            {categories.map(({ label, name }) => (
              <Button
                key={name}
                onClick={onCategoryClick}
                data-category={name}
                component="routerLink"
                variant={getBtnVariant(name)}
                pill
                to={getRoute(name)}
                className={styled.filter__category}
              >
                {label}
              </Button>
            ))}
          </div>
        </>
      )}
      <Button
        variant={BUTTON_VARIANTS.light}
        component="routerLink"
        to="/"
        className={styled.filter__box}
        onClick={onReset}
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
  onCategoryClick: PropTypes.func,
  onReset: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

const Filter = withLogger(BaseFilter, "Filter");

export { Filter };
