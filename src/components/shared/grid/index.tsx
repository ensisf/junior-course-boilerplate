import React, { FC, HTMLAttributes, ReactNode } from "react";
import styled from "./index.module.scss";
import { withLogger } from "hoc";

type Props<T = any> = {
  className?: string;
  keyValue?: string;
  items: T[];
  render: (item: T) => ReactNode;
  columnsCount?: number;
  emptyListPlaceholder?: string;
} & HTMLAttributes<HTMLUListElement>;

const BaseGrid: FC<Props> = ({
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

const Grid = withLogger<Props>(BaseGrid, "Grid");

export { Grid };
