import queryString from "query-string";

export const getFromHistory = () => {
  const { search } = window.location;

  if (!search) return {};

  return queryString.parse(search);
};

export const setToHistory = state => {
  window.history.pushState(null, null, `?${queryString.stringify(state)}`);
};
