import React from "react";

import styled from "./index.module.scss";
import Img from "assets/img/ill-planet.svg";

import { PageLayout } from "components/shared/page-layout";

const NotFound = () => {
  return (
    <PageLayout className={styled.notFound} title="Товар не найден">
      <img src={Img} alt="Not found" />
    </PageLayout>
  );
};

export { NotFound };
