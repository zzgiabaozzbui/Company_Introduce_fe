// import QueryString from "qs"
import { apiGetList, apiExport } from "./urls"
import http from "../index"

const getList = body => http.post(apiGetList, body)

const exportList = body =>
  http.post(apiExport, body, {
    responseType: "blob",
  })

const ActivityApi = {
  getList,
  exportList,
}
export default ActivityApi
