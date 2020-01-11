import React, { FC, AllHTMLAttributes } from "react";
import styled from "./index.module.scss";
import { withLogger } from "hoc";

type Props = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
} & AllHTMLAttributes<HTMLHeadingElement>;

const BaseHeading: FC<Props> = ({
  level = 1,
  className = "",
  children,
  ...attrs
}) => {
  const Tag = `h${level}`;

  const styles = {
    "--heading-size": level
  };

  return (
    // @ts-ignore
    <Tag className={`${styled.title} ${className}`} style={styles} {...attrs}>
      {children}
    </Tag>
  );
};

const Heading = withLogger<Props>(BaseHeading, "Heading");

export { Heading };
