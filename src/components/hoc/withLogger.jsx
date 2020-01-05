import React, { Component } from "react";
import { logger } from "csssr-school-utils";
import { shallowEqual } from "recompose";

const withLogger = (WrappedComponent, name) =>
  class extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      const isRenderUseless =
        shallowEqual(this.state, nextState) &&
        shallowEqual(this.props, nextProps);

      if (isRenderUseless) {
        return false;
      }

      logger.call(WrappedComponent, name, nextProps, nextState);

      return true;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export { withLogger };
