import React from "react";
import styled from "./index.module.scss";
import PropTypes from "prop-types";
import { withLogger } from "hoc";

const BaseGrid = ({
  children,
  className = "",
  keyValue = "id",
  items,
  render,
  columnsCount = 1,
  emptyListPlaceholder = "",
  ...attrs
}) => {
  const style = {
    "--grid-columns-count": columnsCount
  };

  const columns = items.map(item => (
    <li key={item[keyValue]}>{render(item)}</li>
  ));

  return (
    <ul className={`${styled.grid} ${className}`} style={style} {...attrs}>
      {Array.isArray(columns) && columns.length ? (
        columns
      ) : (
        <li className={styled.grid__placeholder}>{emptyListPlaceholder}</li>
      )}
    </ul>
  );
};

BaseGrid.propTypes = {
  keyValue: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
  columnsCount: PropTypes.number
};
const Grid = withLogger(BaseGrid, "Grid");
export { Grid };
