import {
  apiCreate,
  apiDelete,
  apiGetAllPosition,
  apiGetListPosition,
  apiGetAllTitle,
  apiUpdate,
} from "./apiRouter"
import http from "./index"
const getAllTitle = () => http.get(apiGetAllTitle)
const getAllPosition = () => http.get(apiGetAllPosition)
const deletePos = PositionID =>
  http.patch(apiDelete + `?PositionID=${PositionID}`)
const create = body => http.post(apiCreate, body)
const update = body => http.put(apiUpdate, body)
const getListPosition = body => http.post(apiGetListPosition, body)

const PositionService = {
  getAllPosition,
  create,
  getListPosition,
  deletePos,
  update,
  getAllTitle,
}
export default PositionService
