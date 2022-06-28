export interface IRegForm {
  lastName: string
  firstName: string
  secondName: string
  email: string
  driverLicense: string
  cities: string
  brands: string
  models: string
  consent: string
  createDate?: null | string | undefined
}

export enum StatusCode {
  DRAFT = 'DRAFT',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
}

export interface ICity {
  code: string
  name: string
}

export interface IModel {
  id: string | null
  name: string
}

export interface IStatus {
  code: StatusCode
}

export interface IPerson {
  lastName: string
  firstName: string
  secondName: string
  driverLicense: string
  email: string
}

export interface IAuto {
  brand: string
  model: IModel
}

export interface IRequest {
  id: string | null
  status: IStatus
  person: IPerson
  auto: IAuto
  city: ICity
  createDate?: string | null | undefined
}

export interface ISelectOption {
  label: string
  value: string
}

export interface IProcessingStatus {
  isProcessing: boolean
  reqId: string | null
}

export interface IAutoModel {
  id: string
  models: []
}
