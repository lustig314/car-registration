import { useNavigate } from 'react-router-dom'

import { requestsStore } from '../../store'

export const useReqList = () => {
  const navigate = useNavigate()

  const reqCreateHandler = async (): Promise<void> => {
    await requestsStore.fetchRequests()
    await requestsStore.fetchProcessingStatus()
    if (requestsStore.receivedStatus.isProcessing) {
      await navigate(`/request/${requestsStore.receivedStatus.reqId}`)
    }
  }

  return { reqCreateHandler }
}
