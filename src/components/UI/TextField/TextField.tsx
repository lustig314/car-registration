import classNames from 'classnames'
import React, { FC, InputHTMLAttributes } from 'react'

import classes from './TextField.module.css'

const TextField: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={classNames(className, classes.textField)}
      {...props}
      type="text"
    />
  )
}

export default TextField
