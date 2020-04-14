import cleanDeep from "clean-deep";

const FILTER_KEYS = ["from", "to", "sale"];

const normalizeObjForFilter = (obj) => {
  const filterData = cleanDeep(obj);

  return Object.keys(filterData).reduce((acc, curr) => {
    const value = filterData[curr];
    return {
      ...acc,
      [curr]: FILTER_KEYS.includes(curr) ? Number(value) : value,
    };
  }, {});
};

export { normalizeObjForFilter };
