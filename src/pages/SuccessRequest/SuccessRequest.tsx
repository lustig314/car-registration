import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import Button from '../../components/UI/Button/Button'
import * as Img from '../../images'
import { requestsStore } from '../../store'
import classes from './SuccessRequest.module.css'

const SuccessRequest = () => {
  const { id } = useParams()

  useEffect(() => {
    ;(async (): Promise<void> => {
      await requestsStore.fetchRequest(id)
    })()
  }, [id])
  return (
    <div className="successRequest">
      <div className={classes.titleGroup}>
        <div className={classes.successIcon}>
          <img src={Img.SUCCESS} alt="Success-icon" />
        </div>
        <h1 className={classes.successTitle}>Заявка №{id}</h1>
      </div>
      <p className={classes.successDescr}>
        Автомобиль:{' '}
        {requestsStore.foundRequest && requestsStore.foundRequest.brands}{' '}
        {requestsStore.foundRequest && requestsStore.foundRequest.models}
      </p>
      <p className={classes.successDescr}>
        Дата заявки:{' '}
        {requestsStore.foundRequest && requestsStore.foundRequest.createDate}
      </p>
      <Link className={classes.successLink} to="/">
        <Button>К списку заявок</Button>
      </Link>
    </div>
  )
}

export default observer(SuccessRequest)
