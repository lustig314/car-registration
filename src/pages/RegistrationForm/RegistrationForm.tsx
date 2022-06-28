import { observer } from 'mobx-react'
import React, { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import MaskInput from '../../components/FormInputs/MaskInput/MaskInput'
import SelectInput from '../../components/FormInputs/SelectInput/SelectInput'
import TextInput from '../../components/FormInputs/TextInput/TextInput'
import Loader from '../../components/Loader/Loader'
import Button from '../../components/UI/Button/Button'
import { requestsStore } from '../../store'
import { IRegForm, StatusCode } from '../../types/types'
import {
  consentValidation,
  emailValidation,
  fullNameValidation,
  requiredValidation,
} from '../../validation'
import classes from './RegistrationForm.module.css'
import { useRegForm } from './useRegForm'

const notifyOfAbsence = () =>
  toast.error('Заявка не найдена', {
    toastId: '',
  })

const RegistrationForm: FC = () => {
  const { id } = useParams()
  const { statusCheck, handleProcessingBtn, handleSubmitStatus } = useRegForm()

  const {
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
    watch,
    register,
    control,
  } = useForm<IRegForm>({
    mode: 'onBlur',
  })
  const currentBrand = watch('brands', '')

  const onSubmit: SubmitHandler<IRegForm> = (data: IRegForm): void => {
    handleSubmitStatus(id, data)
    console.log(data)
    reset()
  }

  useEffect(() => {
    requestsStore.autos && requestsStore.getModels(currentBrand)
    setValue('models', '')
  }, [currentBrand, setValue])

  useEffect(() => {
    if (id) {
      ;(async (): Promise<void> => {
        await requestsStore.fetchRequest(id)
        await reset(requestsStore.foundRequest)
      })()
    } else reset()
  }, [id, reset])

  useEffect(() => {
    ;(async (): Promise<void> => {
      await requestsStore.fetchAutos()
      await requestsStore.fetchCities()
      await statusCheck(true)
    })()
    return () => {
      requestsStore.foundRequestStatus = null
    }
  }, [id])

  return (
    <div className={classes.regFormContainer}>
      {requestsStore.receivedStatus.isProcessing && <Loader />}
      <h1>Оставить заявку </h1>
      <p className={classes.regDesc}>Заполните данные формы</p>
      {requestsStore.loadingStatus.error && notifyOfAbsence()}
      <ToastContainer />
      {requestsStore.loadingStatus.pending ? (
        <Loader />
      ) : (
        <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            control={control}
            name="lastName"
            placeholder="Фамилия"
            rules={fullNameValidation}
            className={errors?.lastName && classes.regInputError}
          />
          {errors?.lastName && (
            <p className={classes.regError}>
              {errors?.lastName.message || 'Error!'}
            </p>
          )}
          <TextInput
            control={control}
            name="firstName"
            placeholder="Имя"
            rules={fullNameValidation}
            className={errors?.firstName && classes.regInputError}
          />
          {errors?.firstName && (
            <p className={classes.regError}>
              {errors?.firstName.message || 'Error!'}
            </p>
          )}
          <TextInput
            control={control}
            name="secondName"
            placeholder="Отчество"
            rules={fullNameValidation}
            className={errors?.secondName && classes.regInputError}
          />
          {errors?.secondName && (
            <p className={classes.regError}>
              {errors?.secondName.message || 'Error!'}
            </p>
          )}
          <TextInput
            control={control}
            name="email"
            placeholder="Email"
            rules={emailValidation}
            className={errors?.email && classes.regInputError}
          />
          {errors?.email && (
            <p className={classes.regError}>
              {errors?.email.message || 'Error!'}
            </p>
          )}

          <div className={classes.regInputGroup}>
            <div className={classes.regLicense}>
              <MaskInput
                control={control}
                name="driverLicense"
                rules={requiredValidation}
                mask="9999 999999"
                placeholder="Водительское удостоверение"
                className={errors?.driverLicense && classes.regInputError}
              />
              {errors?.driverLicense && (
                <p className={classes.regError}>
                  {errors?.driverLicense.message || 'Error!'}
                </p>
              )}
            </div>
            <div className={classes.regSelect}>
              <SelectInput
                control={control}
                name="cities"
                rules={requiredValidation}
                options={requestsStore.cities}
                className={errors?.cities && classes.regInputError}
                firstValue="Город"
              />

              {errors?.cities && (
                <p className={classes.regError}>
                  {errors?.cities.message || 'Error!'}
                </p>
              )}
            </div>
          </div>
          <div className={classes.regInputGroup}>
            <div className={classes.regSelect}>
              <SelectInput
                control={control}
                name="brands"
                rules={requiredValidation}
                options={requestsStore.brands}
                className={errors?.brands && classes.regInputError}
                firstValue="Марка автомобиля"
              />
              {errors?.brands && (
                <p className={classes.regError}>
                  {errors?.brands.message || 'Error!'}
                </p>
              )}
            </div>
            <div className={classes.regSelect}>
              <SelectInput
                control={control}
                name="models"
                rules={requiredValidation}
                options={requestsStore.filteredModels}
                className={errors?.models && classes.regInputError}
                firstValue="Модель"
              />
              {errors?.models && (
                <p className={classes.regError}>
                  {errors?.models.message || 'Error!'}
                </p>
              )}
            </div>
          </div>
          <div className={classes.regCheck}>
            <input
              id="reg-checkbox"
              type="checkbox"
              {...register('consent', consentValidation)}
            />
            <label htmlFor="reg-checkbox">
              Согласен на обработку персональных данных
            </label>
            {errors?.consent && (
              <p className={classes.regError}>
                {errors?.consent.message || 'Error!'}
              </p>
            )}
          </div>

          <div className={classes.regBtnGroup}>
            <Button
              type="submit"
              onClick={() => (requestsStore.statusPostReq = StatusCode.DRAFT)}
            >
              Сохранить
            </Button>
            <Button type="submit" onClick={() => handleProcessingBtn(false)}>
              Отправить на регистрацию
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default observer(RegistrationForm)
