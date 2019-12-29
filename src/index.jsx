import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./assets/styles/index.scss";

import { Heading } from "components/shared/heading";
import { Grid } from "components/shared/grid";
import { PriceFilter } from "components/price-filter";
import ProductCard from "csssr-school-product-card";
import styled from "./index.module.scss";
import { formatPrice, getMaxMinPrice } from "helpers";
import { logRender } from "hoc";

const Rating = ({ isFilled }) => (isFilled ? "★" : "☆");

const ProductCardWithLogger = logRender(ProductCard, "ProductCard");

const App = () => {
  const [currentRange, setCurrentRange] = useState({
    from: 0,
    to: 0
  });

  const [range, setRange] = useState({
    min: 0,
    max: 0
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await import("./products.json");
      const products = data.default;
      const { min, max } = getMaxMinPrice(products);

      setProducts(products);
      setRange({ min, max });
      setCurrentRange({ from: min, to: max });
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = ({ from, to }) => {
    if (from === currentRange.from && to === currentRange.to) return;
    setCurrentRange({ from, to });
  };

  const { from, to } = currentRange;

  const { min, max } = range;

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
        <PriceFilter onSubmit={onSubmit} defaultFrom={min} defaultTo={max} />
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
};

const rootElement = document.getElementById("root");

ReactDOM.render(<App />, rootElement);
