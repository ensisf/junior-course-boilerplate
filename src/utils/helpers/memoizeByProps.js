import { shallowEqual } from "recompose";

const memoizeByProps = fn => {
  const cache = {
    args: []
  };

  return (...args) => {
    let equal = true;

    equal = args.every((arg, idx) => shallowEqual(arg, cache.args[idx]));

    if (!equal) {
      cache.result = fn(...args);
      cache.args = args;
    }

    return cache.result;
  };
};

export { memoizeByProps };
