import { createContext } from "react";
import PropTypes from "prop-types";

const FilterContext = createContext();

FilterContext.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  sale: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

export { FilterContext };
