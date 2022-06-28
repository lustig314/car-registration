import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import classes from './Layout.module.css'

const Layout = () => {
  return (
    <>
      <Header />
      <main className={classes.mainContainer}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
