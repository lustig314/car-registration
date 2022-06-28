import React, { ButtonHTMLAttributes, FC } from 'react'

import classes from './Button.module.css'

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  type,
  ...props
}) => {
  return (
    <button className={classes.btn} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
