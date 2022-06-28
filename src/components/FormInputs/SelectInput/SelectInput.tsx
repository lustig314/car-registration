import React from 'react'
import { Controller, FieldValues, Path } from 'react-hook-form'
import { Control } from 'react-hook-form/dist/types/form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'

import { IRegForm, ISelectOption } from '../../../types/types'
import SelectField from '../../UI/SelectField/SelectField'

type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>

interface ISelectInputProps {
  control: Control<IRegForm>
  name: FieldPath<IRegForm>
  rules?: Omit<
    RegisterOptions,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >
  className?: string | undefined
  options: ISelectOption[]
  firstValue: string
}

const SelectInput = ({
  control,
  name,
  options,
  firstValue,
  className,
  rules,
}: ISelectInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue=""
      render={({ field }) => (
        <SelectField
          onChange={field.onChange}
          value={field.value || ''}
          options={options}
          name={name}
          firstValue={firstValue}
          className={className}
        />
      )}
    />
  )
}

export default SelectInput
