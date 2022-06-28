import React from 'react'

import { spinner } from '../../images'
import classes from './Loader.module.css'

const Loader = () => {
  return (
    <div>
      <div className={classes.loader}></div>
      <div className={classes.spinnerWrapper}>
        <img className={classes.spinner} src={spinner} alt="" />
      </div>
    </div>
  )
}

export default Loader
