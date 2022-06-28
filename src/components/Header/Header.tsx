import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import logo from '../../images/logo.png'
import classes from './Header.module.css'

const Header: FC = () => {
  return (
    <header className={classes.header}>
      <div className={classes.headerContainer}>
        <Link to="/">
          <div className={classes.logoGroup}>
            <img src={logo} alt="logo" />
            <p>Бронирование Автомобилей</p>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Header
