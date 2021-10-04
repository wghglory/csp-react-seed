// https://jfelix.info/blog/dynamic-themes-in-ant-design-how-to-change-between-light-and-dark-theme

import React from 'react';

import style from './TheThemeSwitcher.module.css';

import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme(); // 'light' | 'dark'

  function changeTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div className={`${style.themeToggle} ${theme === 'light' ? '' : style.themeToggleChecked}`} onClick={changeTheme}>
      <div className={style.themeToggleTrack}>
        <div className={style.themeToggleTrackCheck}>
          <span className={style.toggle}>🌜</span>
        </div>
        <div className={style.themeToggleTrackX}>
          <span className={style.toggle}>🌞</span>
        </div>
      </div>
      <div className={style.themeToggleThumb}></div>
      <input type='checkbox' aria-label='Dark mode toggle' className={style.themeToggleScreenReaderOnly} />
    </div>
  );
}
