import React from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import styled from "./styles.module.scss";
import Arrow from "assets/img/arrow.svg";

import { Heading } from "components/shared/heading";

const PageLayout = ({ className = "", title, children, ...attrs }) => {
  const history = useHistory();

  const onHistoryBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className={`${styled.pageLayout} ${className}`} {...attrs}>
      <Heading className={styled.pageLayout__title}>
        <Link
          to="/"
          className={styled.pageLayout__backLink}
          onClick={onHistoryBack}
        >
          <img src={Arrow} alt="Back" />
        </Link>
        {title}
      </Heading>
      {children}
    </div>
  );
};

PageLayout.propTypes = {
  title: PropTypes.string.isRequired,
};

export { PageLayout };
