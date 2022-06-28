import { makeAutoObservable, runInAction } from 'mobx'

import {
  getAllRequests,
  getDictionaryById,
  getProcessingStatus,
  getRequestById,
  postRequest,
  putRequest,
} from '../api'
import { DICT_ID } from '../api/config'
import {
  IAutoModel,
  ICity,
  IModel,
  IProcessingStatus,
  IRegForm,
  IRequest,
  ISelectOption,
  StatusCode,
} from '../types/types'

export class RequestsStore {
  requests: IRequest[] = []
  brands: ISelectOption[] = []
  autos: any = []
  foundRequestStatus = null
  cities = []
  filteredModels: ISelectOption[] = []
  statusPostReq: StatusCode = StatusCode.PROCESSING
  receivedStatus: IProcessingStatus = {
    isProcessing: false,
    reqId: null,
  }
  isProcessing = false
  loadingStatus = {
    error: false,
    pending: false,
  }

  foundRequest: IRegForm | undefined

  constructor() {
    makeAutoObservable(this)
  }

  getModelName = (modelId: string, brand: string) => {
    const modelsArr = this.autos.find((auto: IAutoModel) => auto.id === brand)
    const desiredModel: ISelectOption = modelsArr?.models.find(
      (el: ISelectOption) => el.value.toString() === modelId
    )
    return desiredModel.label
  }

  conversionRequestData = ({ person, auto, city, createDate }: IRequest) => {
    return {
      lastName: person.lastName,
      firstName: person.firstName,
      secondName: person.secondName,
      email: person.email,
      driverLicense: person.driverLicense,
      cities: city.code,
      brands: auto.brand,
      models: auto.model.name,
      consent: 'false',
      createDate: createDate,
    }
  }

  conversionFormData = (request: IRegForm, id: string | null) => {
    return {
      id: id,
      status: {
        code: this.statusPostReq,
      },
      person: {
        lastName: request.lastName,
        firstName: request.firstName,
        secondName: request.secondName,
        driverLicense: request.driverLicense,
        email: request.email,
      },
      auto: {
        brand: request.brands,
        model: {
          id: null,
          name: this.getModelName(request.models, request.brands),
        },
      },
      city: {
        code: request.cities,
        name: request.cities,
      },
    }
  }

  getModels(brand: string) {
    if (brand) {
      const desiredAuto = this.autos.find(
        (auto: IAutoModel) => auto.id === brand
      )
      this.filteredModels = desiredAuto!.models
    } else {
      this.filteredModels = []
    }
  }

  getModelsForSelect = (autos: { [x: string]: IModel[] }) => {
    const autosKeys = Object.keys(autos)
    return autosKeys.map((el) => {
      const modelsArr = autos[el].map((model: IModel) => ({
        value: model.id,
        label: model.name,
      }))
      return {
        id: el,
        models: [...modelsArr],
      }
    })
  }

  async fetchAutos() {
    try {
      const data = await getDictionaryById(DICT_ID.AUTO)
      const brandsForSelect = Object.keys(data).map((el) => ({
        value: el,
        label: el,
      }))
      const modelsForSelect = this.getModelsForSelect(data)
      runInAction(() => {
        this.brands = brandsForSelect ?? []
        this.autos = modelsForSelect ?? []
      })
    } catch (e) {
      console.error(e)
    }
  }

  async fetchCities() {
    try {
      const data = await getDictionaryById(DICT_ID.CITIES)
      const dataForSelect = data.map((el: ICity) => ({
        value: el.code,
        label: el.name,
      }))
      runInAction(() => {
        this.cities = dataForSelect ?? []
      })
    } catch (e) {
      console.error(e)
    }
  }

  async fetchRequest(id: string | undefined) {
    this.loadingStatus.pending = true
    this.loadingStatus.error = false
    try {
      const data = await getRequestById(id)
      runInAction(() => {
        this.foundRequest = this.conversionRequestData(data)
      })
      this.loadingStatus.pending = false
    } catch (e) {
      console.error(e)
      this.loadingStatus.error = true
    }
  }

  async fetchRequests() {
    this.loadingStatus.pending = true
    this.loadingStatus.error = false
    try {
      const data = await getAllRequests()
      runInAction(() => {
        this.requests = data ?? []
      })
      this.loadingStatus.pending = false
    } catch (e) {
      console.error(e)
      this.loadingStatus.error = true
    }
  }

  async fetchProcessingStatus() {
    try {
      const data = await getProcessingStatus()
      runInAction(() => {
        const status = data
        this.receivedStatus.isProcessing = status.isProcessing
        this.receivedStatus.reqId = status.reqId
      })
    } catch (e) {
      console.error(e)
      this.isProcessing = false
    }
  }

  async addRequestToProcessing(request: IRegForm) {
    const data = await postRequest(this.conversionFormData(request, null))
    runInAction(() => {
      this.requests.push(data ?? [])
    })
  }

  async updateRequest(request: IRegForm, id: string) {
    const data = await putRequest(this.conversionFormData(request, id))
    runInAction(() => {
      const updateRequests = this.requests.map((el) => {
        if (el.id === data.id) {
          return data
        }
        return el
      })
      this.requests.splice(0, this.requests.length)
      this.requests.push(...updateRequests)
    })
  }
}
