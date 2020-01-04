import React, { Component } from "react";
import { logger } from "csssr-school-utils";

const withLogger = (WrappedComponent, name) =>
  class extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      logger.call(WrappedComponent, name, nextProps, nextState);
      return true;
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

export { withLogger };
