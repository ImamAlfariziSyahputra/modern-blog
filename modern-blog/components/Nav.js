import React from 'react';
import NavItem from './NavItem';
import classNames from 'classnames';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Nav({ dir = 'horizontal' }) {
  const directions = {
    vertical: 'flex flex-col space-y-5 text-2xl',
    horizontal: 'flex items-center space-x-6 md:space-x-6 lg:space-x-8',
  };

  const choosedDirection = directions[dir];

  return (
    <ul className={classNames(choosedDirection, 'mr-5')}>
      <NavItem name="UI Design" className="transition hover:opacity-75" />
      <NavItem name="Front End" className="transition hover:opacity-75" />
      <NavItem name="Back End" className="transition hover:opacity-75" />
      <li className="transition hover:opacity-75">
        <a href="#" className="flex items-center">
          <span className="mr-1">Lainnya</span>
          <ExpandMoreIcon className='!h-5' />
        </a>
      </li>
    </ul>
  );
}
