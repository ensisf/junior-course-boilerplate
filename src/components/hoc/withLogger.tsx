import React, { Component, ComponentType } from "react";
import { logger } from "csssr-school-utils";
import { shallowEqual } from "recompose";

const withLogger = <P extends {}, S = any>(
  WrappedComponent: ComponentType<P>,
  name: string
): ComponentType<P> =>
  class WithLogger extends Component<P> {
    shouldComponentUpdate(nextProps: P, nextState: S) {
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
