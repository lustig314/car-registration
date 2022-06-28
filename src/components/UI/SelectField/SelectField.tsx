import classNames from 'classnames'
import React from 'react'

import { ISelectOption } from '../../../types/types'
import classes from './SelectField.module.css'

interface ISelectFieldProps {
  firstValue: string
  options: ISelectOption[]
  className?: string
  onChange: () => void
  value: string
  name: string
}

const SelectField = ({
  className,
  firstValue,
  options,
  ...props
}: ISelectFieldProps) => {
  return (
    <select className={classNames(className, classes.selectField)} {...props}>
      <option hidden value="" disabled>
        {firstValue}
      </option>
      {options.map((option: ISelectOption) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default SelectField
