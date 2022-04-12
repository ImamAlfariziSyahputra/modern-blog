import React from 'react';
import classNames from 'classnames';

export default function NavItem({ name, className }) {
  return (
    <>
      <li className={classNames(className)}>
        <a href="#">{name}</a>
      </li>
    </>
  );
}
