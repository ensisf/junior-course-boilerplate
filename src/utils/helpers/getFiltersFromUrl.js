import { CATEGORIES } from "constants";
import { getFromHistory } from "helpers";

const normalizeFilterValues = obj =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    return { ...acc, [key]: Number(value) };
  }, {});

export const getFiltersFromUrl = () => {
  const { categories, ...rest } = getFromHistory();
  const filters = { ...normalizeFilterValues(rest || {}) };

  if (categories) {
    const selectedCategories = CATEGORIES.map(cat => {
      const isEnabled =
        cat.name === categories ||
        (Array.isArray(categories) &&
          categories.some(name => name === cat.name));

      if (isEnabled) {
        return {
          ...cat,
          value: true
        };
      }

      return cat;
    });

    filters.categories = selectedCategories;
  }

  return filters;
};
