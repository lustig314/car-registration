import { observer } from 'mobx-react'
import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Button from '../../components/UI/Button/Button'
import * as Img from '../../images'
import { requestsStore } from '../../store'
import { IRequest } from '../../types/types'
import classes from './RequestsList.module.css'
import { useReqList } from './useReqList'

const reqStatus = {
  DRAFT: 'Черновик',
  PROCESSING: 'В обработке',
  SUCCESS: 'Успех',
}

const notifyOfAbsence = () =>
  toast.error('Ошибка получения заявок', {
    toastId: '',
  })

const RequestsList: FC = () => {
  const { reqCreateHandler } = useReqList()

  useEffect(() => {
    ;(async (): Promise<void> => {
      await requestsStore.fetchRequests()
    })()
  }, [])

  return (
    <div className={classes.reqContainer}>
      <h1>Список заявок</h1>
      <p className={classes.reqDescr}>Ваши заявки на покупку автомобилей</p>
      {requestsStore.loadingStatus.error && notifyOfAbsence()}
      <ToastContainer />
      <ul>
        {requestsStore.requests.length ? (
          requestsStore.requests.map((req: IRequest) => (
            <Link
              to={
                req.status.code === 'SUCCESS'
                  ? `request/${req.id}/success`
                  : `request/${req.id}`
              }
              className={classes.reqItem}
              key={req.id}
            >
              <div className={classes.reqIcon}>
                <img
                  src={Img[`${req.status.code}`]}
                  alt={`Статус: ${reqStatus[req.status.code]}`}
                />
              </div>
              <div>
                <h3 className={classes.reqItemTitle}>
                  {`Заявка №${req.id} на автомобиль ${req.auto.brand} ${req.auto.model.name}`}
                </h3>
                <p className={classes.reqItemStatus}>{`Статус: ${
                  reqStatus[req.status.code]
                }`}</p>
                <p className={classes.reqItemDate}>
                  Дата: {req.createDate ? req.createDate : 'Дата не определена'}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <li>Заявок не найдено</li>
        )}
      </ul>
      <Link to="registration">
        <Button onClick={() => reqCreateHandler()}>Создать заявку</Button>
      </Link>
    </div>
  )
}

export default observer(RequestsList)
