import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import Button from '../../components/UI/Button/Button'

const NotFound: FC = () => {
  return (
    <div>
      <h1>Страница не найдена =(</h1>
      <Link to="/">
        <Button>Вернуться к списку заявок</Button>
      </Link>
    </div>
  )
}

export default NotFound
