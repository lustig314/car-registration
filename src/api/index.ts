import axios from '../axiosInstance'
import { IProcessingStatus, IRequest } from '../types/types'

const getDictionaryById = async (id: string) => {
  const response = await axios.get(`dictionary/${id}`)
  return response.data
}

const getAllRequests = async () => {
  const response = await axios.get<IRequest[]>(`requests`)
  return response.data
}

const getRequestById = async (id: string | undefined) => {
  const response = await axios.get<IRequest>(`request/${id}`)
  return response.data
}

const getProcessingStatus = async () => {
  const response = await axios.get<IProcessingStatus>('requests/processing')
  return response.data
}

const postRequest = async (request: IRequest) => {
  const response = await axios.post<IRequest>('request/registration', request)
  return response.data
}
const putRequest = async (request: IRequest) => {
  const response = await axios.put<IRequest>('request', request)
  return response.data
}

export {
  getDictionaryById,
  getAllRequests,
  postRequest,
  getRequestById,
  getProcessingStatus,
  putRequest,
}
