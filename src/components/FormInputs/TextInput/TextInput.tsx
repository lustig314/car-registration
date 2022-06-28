import React from 'react'
import { FieldValues, Path, useController } from 'react-hook-form'
// eslint-disable-next-line import/no-unresolved
import { Control } from 'react-hook-form/dist/types/form'
// eslint-disable-next-line import/no-unresolved
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

import { IRegForm } from '../../../types/types'
import TextField from '../../UI/TextField/TextField'

type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>

interface ITextInputProps {
  control: Control<IRegForm>
  name: FieldPath<IRegForm>
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  placeholder?: string
  className?: string
}

const TextInput = ({
  control,
  name,
  placeholder,
  className,
  rules,
}: ITextInputProps) => {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  })

  return (
    <TextField
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value || ''}
      className={className}
      placeholder={placeholder}
    />
  )
}

export default TextInput
