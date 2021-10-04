import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getNavMenuByUser } from '../routes/navMenus';
import ThemeSwitcher from './TheThemeSwitcher';

export default function TheNavbarCsp() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const navMenuLinks = user
    ? getNavMenuByUser(user).map((item) => {
        return (
          <li className='nav-item' key={item.to}>
            <NavLink exact to={item.to} className={`nav-link ${pathname === item.to ? 'active' : ''}`}>
              {item.title}
            </NavLink>
          </li>
        );
      })
    : null;

  return (
    <div>
      <nav className='subnav'>
        <ul className='nav'>{navMenuLinks}</ul>
        <ThemeSwitcher />
      </nav>
    </div>
  );
}
