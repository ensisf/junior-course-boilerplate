const _activeCategoriesReducer = (acc, { value, name }) => {
  return value ? [...acc, name] : acc;
};

export const getActiveCategoriesNames = categories =>
  categories.reduce(_activeCategoriesReducer, []);
