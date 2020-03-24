import queryString from "query-string";
import { isEmpty, isNil } from "ramda";

export const getFromHistory = () => {
  const { search } = window.location;

  if (!search) return {};

  return queryString.parse(search);
};

export const setToHistory = state => {
  if (isEmpty(state) || isNil(state)) return;
  window.history.pushState(null, null, `?${queryString.stringify(state)}`);
};
