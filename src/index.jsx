import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

import "./assets/styles/index.scss";

import { Heading } from "components/shared/heading";
import { Grid } from "components/shared/grid";
import { PriceFilter } from "components/price-filter";
import ProductCard from "csssr-school-product-card";
import styled from "./index.module.scss";
import { formatPrice, getMaxMinPrice, memoizeByProps } from "helpers";
import { withLogger } from "hoc";
import { clone } from "ramda";
import { FilterContext } from "context";
import { getFromHistory, setToHistory } from "helpers";

const Rating = ({ isFilled }) => (isFilled ? "★" : "☆");

const ProductCardWithLogger = withLogger(ProductCard, "ProductCard");

const BASE_STATE = {
  sale: 0,
  categories: [
    { value: false, name: "clothes", label: "Clothes" },
    { value: false, name: "books", label: "Books" }
  ]
};

class App extends PureComponent {
  state = {
    from: 0,
    to: 0,
    min: 0,
    max: 0,
    products: [],
    ...clone(BASE_STATE)
  };

  async componentDidMount() {
    try {
      window.addEventListener("popstate", this.setStateFromURL);

      const data = await import("./products.json");
      const products = data.default;
      const { min, max } = getMaxMinPrice(products);

      const {
        from = min,
        to = max,
        sale = 0,
        ...rest
      } = this.getStateFromUrl();
      this.setState({
        products,
        min,
        max,
        from: Number(from),
        to: Number(to),
        sale: Number(sale),
        ...rest
      });
    } catch (err) {
      console.log(err);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.setStateFromURL);
  }

  handleCategory({ name, value }) {
    const categories = this.state.categories.map(cat => {
      if (name === cat.name) {
        return {
          ...cat,
          value
        };
      }

      return cat;
    });

    this.setState(
      () => ({
        categories
      }),
      this.setStateToURL
    );
  }

  getActiveCategiriesNames() {
    const names = [];
    this.state.categories.forEach(({ value, name }) => {
      if (value) {
        names.push(name);
      }
    });

    return names;
  }

  getStateFromUrl = () => {
    const { categories, ...rest } = getFromHistory();

    const state = {
      ...rest
    };

    if (categories) {
      const selectedCategories = this.state.categories.map(cat => {
        const isEnabled =
          cat.name === categories ||
          (Array.isArray(categories) &&
            categories.some(name => name === cat.name));

        if (isEnabled) {
          return {
            ...cat,
            value: true
          };
        }

        return cat;
      });

      state.categories = selectedCategories;
    }

    return state;
  };

  setStateFromURL = () => {
    const newState = this.getStateFromUrl();

    this.setState(newState);
  };

  setStateToURL() {
    const { from, to, sale } = this.state;

    setToHistory({
      categories: this.getActiveCategiriesNames(),
      from,
      to,
      sale
    });
  }

  onFilterChange = ({ name, value, type }) => {
    if (type === "checkbox") {
      this.handleCategory({ name, value });
      return;
    }

    this.setState(
      () => ({
        [name]: Number(value)
      }),
      this.setStateToURL
    );
  };

  onFilterReset = () => {
    const { min, max } = this.state;
    this.setState(
      () => ({
        from: min,
        to: max,
        ...BASE_STATE
      }),
      () => {
        window.history.pushState(null, null, "/");
      }
    );
  };

  getProducts = memoizeByProps((products, from, to, sale, categoriesNames) => {
    const filteredProducts = products.filter(
      ({ price, discount, categories }) => {
        const satisfyCategory = categoriesNames.length
          ? categoriesNames.every(cat => categories.includes(cat))
          : true;

        return (
          price >= from &&
          price <= to &&
          discount >= sale / 100 &&
          satisfyCategory
        );
      }
    );

    const formattedProducts = filteredProducts.map(({ price, ...rest }) => ({
      price: formatPrice(price),
      ...rest
    }));

    return formattedProducts;
  });

  render() {
    const { products, ...filterProps } = this.state;

    const { from, to, sale, categories } = filterProps;

    const selectedCategories = categories
      .filter(({ value }) => value)
      .map(({ name }) => name);

    const items = this.getProducts(
      products,
      from,
      to,
      sale,
      selectedCategories
    );

    const contextValue = {
      onChange: this.onFilterChange,
      onReset: this.onFilterReset,
      ...filterProps
    };

    return (
      <div className="app">
        <div className={styled.products}>
          <Heading className={styled.products__title}>Список товаров</Heading>
          <FilterContext.Provider value={contextValue}>
            <PriceFilter />
          </FilterContext.Provider>
          <Grid
            columnsCount={3}
            items={items}
            emptyListPlaceholder="По заданным параметрам ничего не найдено."
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
