import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./assets/styles/index.scss";

import { Heading } from "components/shared/heading";
import { Grid } from "components/shared/grid";
import { PriceFilter } from "components/price-filter";
import ProductCard from "csssr-school-product-card";
import styled from "./index.module.scss";
import { formatPrice, getMaxMinPrice } from "helpers";
import { withLogger } from "hoc";

const Rating = ({ isFilled }) => (isFilled ? "★" : "☆");

const ProductCardWithLogger = withLogger(ProductCard, "ProductCard");

class App extends Component {
  state = {
    from: 0,
    to: 0,
    min: 0,
    max: 0,
    sale: 0,
    products: []
  };

  async componentDidMount() {
    try {
      const data = await import("./products.json");
      const products = data.default;
      const { min, max } = getMaxMinPrice(products);

      this.setState({
        products,
        min,
        max,
        from: min,
        to: max
      });
    } catch (err) {
      console.log(err);
    }
  }

  onFilterChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: Number(value)
    });
  };

  render() {
    const { products, from, to, min, max, sale } = this.state;
    const filteredProducts = products.filter(
      ({ price }) => price >= from && price <= to
    );

    const formattedProducts = filteredProducts.map(({ price, ...rest }) => ({
      price: formatPrice(price),
      ...rest
    }));

    return (
      <div className="app">
        <div className={styled.products}>
          <Heading className={styled.products__title}>Список товаров</Heading>
          <PriceFilter
            onChange={this.onFilterChange}
            min={min}
            max={max}
            from={from}
            to={to}
            sale={sale}
          />
          <Grid
            columnsCount={3}
            items={formattedProducts}
            render={props => (
              <ProductCardWithLogger ratingComponent={Rating} {...props} />
            )}
          />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
