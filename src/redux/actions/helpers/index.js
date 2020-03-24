const _activeCategoriesReducer = (acc, { value, name }) => {
  return value ? [...acc, name] : acc;
};

export const getActiveCategiriesNames = categories =>
  categories.reduce(_activeCategoriesReducer, []);
