import classNames from 'classnames'
import React from 'react'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types/form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import InputMask from 'react-input-mask'

import { IRegForm } from '../../../types/types'
import classes from './MaskInput.module.css'

type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>

interface IMaskInputProps {
  control: Control<IRegForm>
  name: FieldPath<IRegForm>
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  className?: string | undefined
  placeholder?: string
  mask: string
}

const MaskInput = ({
  control,
  name,
  placeholder,
  className,
  mask,
  rules,
}: IMaskInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue=""
      render={({ field }) => (
        <InputMask
          placeholder={placeholder}
          className={classNames(className, classes.maskInput)}
          mask={mask}
          name={name}
          onChange={field.onChange}
          value={field.value || ''}
        />
      )}
    />
  )
}

export default MaskInput
