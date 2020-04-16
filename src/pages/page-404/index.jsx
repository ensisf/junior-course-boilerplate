import React from "react";
import styled from "./index.module.scss";
import Island from "assets/img/island.svg";

const Page404 = () => {
  return (
    <div className={styled.page404}>
      <img
        src={Island}
        className={styled.page404__img}
        alt="Page not found"
      ></img>
      <p className={styled.page404__text}>404</p>
    </div>
  );
};

export { Page404 };
