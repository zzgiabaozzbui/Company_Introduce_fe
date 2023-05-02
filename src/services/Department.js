import {
  apiGetList,
  apiGetListUserByDept,
  apiDeleteDept,
  apiInsertUpdate,
  apiGetAllDept,
} from "./apiRouter"
import http from "./index"
import QueryString from "qs"

const getListDept = params => http.get(apiGetList, { params })
const deleteDept = body =>
  http.patch(apiDeleteDept + `?${QueryString.stringify(body)}`)
const insertOrUpdate = body => http.post(apiInsertUpdate, body)
const getListUserByDept = params => http.post(apiGetListUserByDept, params)
const getAllDept = params => http.get(apiGetAllDept, { params })

const Department = {
  getListDept,
  deleteDept,
  insertOrUpdate,
  getListUserByDept,
  getAllDept,
}
export default Department
