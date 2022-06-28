import React from 'react'

import classes from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <p>Copyright 2014, Бронирование автомобилей</p>
      </div>
    </footer>
  )
}
export default Footer
