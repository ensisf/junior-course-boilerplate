import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames/bind";
import { START_PAGE_NUMBER } from "constants";

const stylesCx = cn.bind(styles);

const BASE_LINK_CLASSNAMES = {
  pagination__link: true
};

const Pagination = ({
  className = "",
  currentPage = START_PAGE_NUMBER,
  totalPages,
  onPageChange,
  ...attrs
}) => {
  const getLinkClassNames = pageNumber => {
    return stylesCx({
      ...BASE_LINK_CLASSNAMES,
      isActive: currentPage === pageNumber
    });
  };

  const onLinkClick = evt => {
    evt.preventDefault();
    const { page } = evt.target.dataset;
    onPageChange(Number(page));
  };

  const getLinkHref = pageNumber => `/?page=${pageNumber}`;

  const links = Array.from({ length: totalPages }, (_, i) => i + 1).map(
    page => (
      <li key={page} className={styles.pagination__item}>
        <a
          href={getLinkHref(page)}
          onClick={onLinkClick}
          data-page={page}
          className={getLinkClassNames(page)}
        >
          {page}
        </a>
      </li>
    )
  );

  const prevLinkClassNames = stylesCx({
    ...BASE_LINK_CLASSNAMES,
    isDisabled: currentPage === 1
  });

  const nextLinkClassNames = stylesCx({
    ...BASE_LINK_CLASSNAMES,
    isDisabled: currentPage === totalPages
  });

  const prevLinkNumber = currentPage === 1 ? 1 : currentPage - 1;

  const nextLinkNumber =
    currentPage + 1 === totalPages ? totalPages : currentPage + 1;

  return (
    <div>
      <ul className={styles.pagination} {...attrs}>
        <li className={styles.pagination__item}>
          <a
            href={getLinkHref(prevLinkNumber)}
            data-page={prevLinkNumber}
            onClick={onLinkClick}
            className={prevLinkClassNames}
          >
            Назад
          </a>
        </li>
        {links}
        <li className={styles.pagination__item}>
          <a
            href={getLinkHref(nextLinkNumber)}
            data-page={nextLinkNumber}
            onClick={onLinkClick}
            className={nextLinkClassNames}
          >
            Вперед
          </a>
        </li>
      </ul>
    </div>
  );
};

export { Pagination };
