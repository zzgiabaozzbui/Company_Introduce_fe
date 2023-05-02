import QueryString from "qs"
import {
  apiGetAllCheckRegister,
  apiApproveRegister,
  apiGetDetailCheclRegister,
} from "./apiRouter"
import http from "./index"

const getAllCheckRegister = body => http.post(apiGetAllCheckRegister, body)
const getDetailCheclRegister = body =>
  http.patch(`${apiGetDetailCheclRegister}?${QueryString.stringify(body)}`)
const approve = body => http.post(apiApproveRegister, body)

const CheckRegister = {
  getAllCheckRegister,
  approve,
  getDetailCheclRegister,
}
export default CheckRegister
