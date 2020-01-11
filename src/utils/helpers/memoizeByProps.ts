import { shallowEqual } from "recompose";

const memoizeByProps = <R>(fn: any) => {
  const cache: {
    args: any[];
    result?: R;
  } = {
    args: []
  };

  return (...args: any) => {
    let equal = true;

    equal = args.every((arg: any, idx: number) =>
      shallowEqual(arg, cache.args[idx])
    );

    if (!equal) {
      cache.result = fn(...args);
      cache.args = args;
    }

    return cache.result as R;
  };
};

export { memoizeByProps };
