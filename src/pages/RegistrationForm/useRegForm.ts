import { useNavigate } from 'react-router-dom'

import { requestsStore } from '../../store'
import { IRegForm, StatusCode } from '../../types/types'

export const useRegForm = () => {
  const navigate = useNavigate()

  const repeatRequestStatus = async (
    isExistRequest: boolean,
    id: string | null
  ): Promise<void> => {
    const timerId = setInterval(async () => {
      await requestsStore.fetchProcessingStatus()
      if (!requestsStore.receivedStatus.isProcessing) {
        clearInterval(timerId)
        await navigate(isExistRequest ? 'success' : `/request/${id}/success`)
      }
    }, 3000)
  }

  const statusCheck = async (isExistRequest: boolean): Promise<void> => {
    await requestsStore.fetchProcessingStatus()
    if (requestsStore.receivedStatus.isProcessing) {
      const reqId: string | null = await requestsStore.receivedStatus.reqId
      await repeatRequestStatus(isExistRequest, reqId)
    }
  }

  const handleProcessingBtn = (isExistRequest: boolean): void => {
    requestsStore.statusPostReq = StatusCode.PROCESSING
    statusCheck(isExistRequest)
  }

  const handleSubmitStatus = (id: string | undefined, data: IRegForm): void => {
    if (id) {
      switch (requestsStore.statusPostReq) {
        case StatusCode.DRAFT:
          requestsStore.updateRequest(data, id).then(() => navigate('/'))
          break
        case StatusCode.PROCESSING:
          requestsStore.updateRequest(data, id).then(() => statusCheck(true))
          break
      }
    } else {
      switch (requestsStore.statusPostReq) {
        case StatusCode.DRAFT:
          requestsStore.addRequestToProcessing(data).then(() => navigate('/'))
          break
        case StatusCode.PROCESSING:
          requestsStore
            .addRequestToProcessing(data)
            .then(() => statusCheck(false))
          break
      }
    }
  }

  return { statusCheck, handleProcessingBtn, handleSubmitStatus }
}
