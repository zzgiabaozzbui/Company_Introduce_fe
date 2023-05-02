import http from "./index"
import {
  apiInsertUser,
  apiDeleteUser,
  apiDetailUser,
  apiUpdateUser,
  apiGetListUser,
  apiGetListGuest,
  apiImportUser,
  apiExportUser,
  apiGetTemplateFileImportUser,
  apiGetAccount,
  apiUpdateAccount,
  apiImportGuest,
  apiExportGuest,
  apiGetTemplateFileImportGuest,
  apiReplacePassword,
  apiGetInforUser,
  apiChangeInfor,
  apiChangeImgUser,
} from "./apiRouter"

const updateAccount = body => http.post(apiUpdateAccount, body)

const getAccount = params => http.get(apiGetAccount, { params })
const insertUser = body => http.post(apiInsertUser, body)
const deleteUser = UserID => http.patch(`${apiDeleteUser}?UserID=${UserID}`)
const detailUser = params => http.get(apiDetailUser, { params })
const updateUser = params => http.post(apiUpdateUser, params)
const importUser = body => http.post(apiImportUser, body)
const getTemplateFileImportUser = body =>
  http.get(apiGetTemplateFileImportUser, body)
const exportUser = params => {
  http.interceptors.request.use(
    async config => {
      config.responseType = "blob"
      return config
    },
    error => Promise.reject(error),
  )
  return http.get(apiExportUser, { params })
}

const importGuest = body => http.post(apiImportGuest, body)
const exportGuest = params => http.get(apiExportGuest, { params })
const templateImportGuest = () => {
  http.interceptors.request.use(
    async config => {
      config.responseType = "blob"
      return config
    },
    error => Promise.reject(error),
  )
  return http.get(apiGetTemplateFileImportGuest)
}

const getListUser = params => http.post(apiGetListUser, params)
const GetListGuest = params => http.post(apiGetListGuest, params)
const replacePassword = params => http.post(apiReplacePassword, params)
const getInforUser = () => http.get(apiGetInforUser)
const changeInfor = body => http.post(apiChangeInfor, body)
const changeAvatar = params =>
  http.patch(apiChangeImgUser + `?Avatar=${params}`)

const UserService = {
  updateAccount,
  insertUser,
  getAccount,
  deleteUser,
  detailUser,
  updateUser,
  getListUser,
  importUser,
  getTemplateFileImportUser,
  exportUser,
  importGuest,
  exportGuest,
  templateImportGuest,
  GetListGuest,
  replacePassword,
  getInforUser,
  changeInfor,
  changeAvatar,
}
export default UserService
