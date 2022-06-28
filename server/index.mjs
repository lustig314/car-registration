import express from 'express'
import { autos } from "./mockData/autos.mjs";
import { cities } from "./mockData/cities.mjs";
import { requests } from "./mockData/requests.mjs";
import { format } from "date-fns";

const PORT = 4001
const app = express()
let countId = 1
const date = format(new Date(), 'dd.MM.yyyy')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const changeStatus = (id) => {
  const mutableRequest = requests.find(request => request.id === id)
  setTimeout(() => {
    mutableRequest.status.code = 'SUCCESS'
  }, 5000)
}


const getAllAutos = (req, res) => {
  res.status(200).json(autos)
}
const getAllCities = (req, res) => {
  res.status(200).json(cities)
}
const getAllRequests = (req, res) => {
  res.status(200).json(requests)
}

const getRequestById = (req, res) => {
  const requestId = req.params.id
  const desiredRequest = requests.find(request => request.id === requestId)

  res.status(200).json(desiredRequest)
}
const getRequestStatusById = (req, res) => {
  const requestId = req.params.id
  const desiredRequest = requests.find(request => request.id === requestId)
  res.status(200).json(desiredRequest.status.code)
}

const getProcessingStatus = (req, res) => {
  const processingStatus = {
    isProcessing: false,
    reqId: null
  }
  requests.forEach(request => {
    if (request.status.code === 'PROCESSING') {
      processingStatus.isProcessing = true
      processingStatus.reqId = request.id
      return res.status(200).json(processingStatus)
    }
  })
  res.status(200).json(processingStatus)
}

const addRequest = (req, res) => {
  countId++
  const newRequest = {
    ...req.body,
    id: countId.toString(),
    createDate: date,
  }
  newRequest.auto.model.id = countId.toString()
  requests.push(newRequest)
  res.status(201).json(newRequest)
  if (newRequest.status.code === 'PROCESSING') {
    changeStatus(newRequest.id)
  }
}

const updateRequest = (req, res) => {
  const requestId = req.body.id
  let desiredRequest = requests.find(request => request.id === requestId)
  let updReq = {
    ...desiredRequest,
    ...req.body,
  }
  let updateRequests = requests.map((el) => {
    if (el.id === updReq.id) {
      return updReq;
    }
    return el;
  });
  requests.splice(0, requests.length);
  requests.push(...updateRequests)
  if (updReq.status.code === 'PROCESSING') {
    changeStatus(updReq.id)
    res.status(201).json(updReq)
  } else {
    res.status(201).json(updReq)
  }
}

app.get('/api/v1/dictionary/DICT_AUTO', getAllAutos)

app.get('/api/v1/dictionary/DICT_CITIES', getAllCities)

app.get('/api/v1/requests', getAllRequests)
app.get('/api/v1/request/:id', getRequestById)
app.get('/api/v1/request/status/:id', getRequestStatusById)
app.get('/api/v1/requests/processing', getProcessingStatus)


app.post('/api/v1/request/registration', addRequest)

app.put('/api/v1/request/', updateRequest)

app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
