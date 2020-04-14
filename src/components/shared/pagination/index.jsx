import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames/bind";
import { START_PAGE_NUMBER } from "constants";
import { Link, NavLink } from "react-router-dom";
import { useRoute } from "hooks";

const stylesCx = cn.bind(styles);

const BASE_LINK_CLASSNAMES = {
  pagination__link: true,
};

const Pagination = ({
  className = "",
  currentPage = START_PAGE_NUMBER,
  totalPages,
  ...attrs
}) => {
  const createRoute = useRoute();

  const getRoute = (page) => createRoute(page);

  const links = Array.from({ length: totalPages }, (_, i) => i + 1).map(
    (page) => (
      <li key={page} className={styles.pagination__item}>
        <NavLink
          activeClassName={stylesCx({ isActive: currentPage === page })}
          isActive={() => page === currentPage}
          to={getRoute({ page })}
          className={styles.pagination__link}
        >
          {page}
        </NavLink>
      </li>
    )
  );

  const prevLinkClassNames = stylesCx({
    ...BASE_LINK_CLASSNAMES,
    isDisabled: currentPage === 1,
  });

  const nextLinkClassNames = stylesCx({
    ...BASE_LINK_CLASSNAMES,
    isDisabled: currentPage === totalPages,
  });

  const prevLinkNumber = currentPage === 1 ? 1 : currentPage - 1;

  const nextLinkNumber =
    currentPage + 1 === totalPages ? totalPages : currentPage + 1;

  return (
    <ul className={styles.pagination} {...attrs}>
      <li className={styles.pagination__item}>
        <Link
          to={getRoute({ page: prevLinkNumber })}
          className={prevLinkClassNames}
        >
          Назад
        </Link>
      </li>
      {links}
      <li className={styles.pagination__item}>
        <Link
          to={getRoute({ page: nextLinkNumber })}
          className={nextLinkClassNames}
        >
          Вперед
        </Link>
      </li>
    </ul>
  );
};

export { Pagination };
