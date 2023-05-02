import QueryString from "qs"
import {
  apiDeleteUserDirectory,
  apiGetAllUserDirectory,
  apiInsertUserDirectory,
  apiResetPasswordByUserID,
  apiUpdateUserDirectory,
} from "./apiRouter"
import http from "./index"

const getAll = body => http.post(apiGetAllUserDirectory, body)
const insert = body => http.post(apiInsertUserDirectory, body)
const update = body => http.post(apiUpdateUserDirectory, body)
const del = body =>
  http.patch(apiDeleteUserDirectory + `?${QueryString.stringify(body)}`)
const resetPass = body => http.patch(apiResetPasswordByUserID, body)

const DirectoryService = {
  getAll,
  insert,
  update,
  del,
  resetPass,
}
export default DirectoryService
