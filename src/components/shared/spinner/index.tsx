import React, { FC, SVGAttributes } from "react";
import styles from "./styles.module.scss";
import { withLogger } from "hoc";

type Props = {
  size?: string;
  className?: string;
} & SVGAttributes<SVGElement>;

const BaseSpinner: FC<Props> = ({
  size = "1em",
  className = "",
  children,
  ...attrs
}) => {
  return (
    <svg
      width={size}
      height={size}
      className={`${styles.spinner} ${className}`}
      viewBox="0 0 100 100"
      {...attrs}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        strokeLinecap="round"
        r="40"
        strokeWidth="4"
        stroke="currentColor"
        strokeDasharray="62.83185307179586 62.83185307179586"
        transform="rotate(264.014 50 50)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="linear"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
    </svg>
  );
};

const Spinner = withLogger<Props>(BaseSpinner, "Spinner");

export { Spinner };
