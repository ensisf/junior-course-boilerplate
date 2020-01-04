import React, { Component } from "react";
import { FormControl } from "components/shared/form/form-control";
import { FormField } from "components/shared/form/form-field";
import { Button } from "components/shared/button";
import PropTypes from "prop-types";
import styled from "./index.module.scss";
import { withLogger } from "hoc";

class BaseFilter extends Component {
  state = { from: 0, to: 0 };

  componentDidUpdate() {
    const { defaultFrom, defaultTo } = this.props;

    if (defaultFrom === this.state.from || defaultTo === this.state.to) return;

    this.setState({ from: defaultFrom, to: defaultTo });
  }

  onInputChange = evt => {
    const {
      target: { name, value }
    } = evt;

    if (value <= 0) return;

    this.setState({
      [name]: Number(value)
    });
  };

  onFormSubmit = evt => {
    evt.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    const {
      onSubmit,
      className = "",
      defaultFrom,
      defaultTo,
      ...attrs
    } = this.props;
    const { from, to } = this.state;
    return (
      <form
        onSubmit={this.onFormSubmit}
        className={`${styled.priceFilter} ${className}`}
        {...attrs}
      >
        <FormControl isHorizontal label="От">
          <FormField
            type="number"
            onChange={this.onInputChange}
            step="1000"
            min={defaultFrom}
            max={defaultTo}
            name="from"
            value={from}
          />
        </FormControl>
        <FormControl isHorizontal label="До">
          <FormField
            type="number"
            onChange={this.onInputChange}
            name="to"
            min={defaultFrom}
            max={defaultTo}
            step="1000"
            value={to}
          />
        </FormControl>
        <Button type="submit" isFull className={styled.priceFilter__submit}>
          Применить
        </Button>
      </form>
    );
  }
}

BaseFilter.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultFrom: PropTypes.number.isRequired,
  defaultTo: PropTypes.number.isRequired
};

const PriceFilter = withLogger(BaseFilter, "PriceFilter");

export { PriceFilter };
