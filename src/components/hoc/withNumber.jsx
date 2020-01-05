import React, { PureComponent } from "react";

const ONLY_NUMBERS_REGEXP = /[^0-9]+/g;

const withNumber = WrappedComponent =>
  class extends PureComponent {
    onInputChange = e => {
      const {
        target: { name, value }
      } = e;

      this.props.onChange({
        name,
        value: Number(value.replace(ONLY_NUMBERS_REGEXP, ""))
      });
    };

    render() {
      const { onChange, ...restProps } = this.props;

      return <WrappedComponent onChange={this.onInputChange} {...restProps} />;
    }
  };

export { withNumber };
