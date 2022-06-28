import { observer } from 'mobx-react'
import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import Layout from './components/Layout/Layout'
import NotFound from './pages/NotFound/NotFound'
import RegistrationForm from './pages/RegistrationForm/RegistrationForm'
import RequestsList from './pages/RequestsList/RequestsList'
import SuccessRequest from './pages/SuccessRequest/SuccessRequest'

export const App: FC = observer(() => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RequestsList />} />
        <Route path="registration" element={<RegistrationForm />} />
        <Route path="request/:id/success" element={<SuccessRequest />} />
        <Route path="request/:id" element={<RegistrationForm />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
})
