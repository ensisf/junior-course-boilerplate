import React, { PureComponent, ComponentType, ChangeEvent } from "react";

const ONLY_NUMBERS_REGEXP: RegExp = /[^0-9]+/g;

type OnInputChange = (e: ChangeEvent<HTMLInputElement>) => void;

type Props = {
  onChange: OnFilterChange;
};

const withNumber = <P extends Props>(WrappedComponent: ComponentType<P>) =>
  class WithNumber extends PureComponent<P> {
    private onInputChange: OnInputChange = e => {
      const {
        currentTarget: { name, value }
      } = e;

      this.props.onChange({
        name,
        value: Number(value.replace(ONLY_NUMBERS_REGEXP, ""))
      });
    };

    render() {
      const { onChange, ...restProps } = this.props;

      return (
        <WrappedComponent onChange={this.onInputChange} {...(restProps as P)} />
      );
    }
  };

export { withNumber };
