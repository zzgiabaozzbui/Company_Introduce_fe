import QueryString from "qs"
import {
  apiGetAccount,
  apiUpdateByAccountID,
  apiInsertAccount,
  apiDeleteAccount,
  apiGetAccountFather,
  apiGetGroupAccount,
  apiInsertGroupAccount,
  apiUpdateGroupAccount,
  apiDeleteGroupAccount,
  apiGetAllMember,
  apiInsertMember,
  apiUpdateMember,
  apiDeleteMember,
  apiGetListMemberForGroup,
  apiInsertMemberToGroup,
  apiDeleteMemberGroup,
  apiUpdateSortOrder,
  apiExportUser,
  apiResetPassword,
} from "./urls"
import http from "../index"

const updateSortOrder = data => http.post(apiUpdateSortOrder, data)
// Đơn vị
const getAccount = body => http.post(apiGetAccount, body)
const updateByAccountID = body => http.post(apiUpdateByAccountID, body)
const insertAccount = body => http.post(apiInsertAccount, body)
const deleteAccount = data => http.post(apiDeleteAccount, data)
const getAccountFather = data => http.post(apiGetAccountFather, data)
const exportUser = body =>
  http.post(apiExportUser, body, {
    responseType: "blob",
  })
//Nhóm đơn vị
const getGroupAccount = body => http.post(apiGetGroupAccount, body)
const insertGroupAccount = body => http.post(apiInsertGroupAccount, body)
const updateGroupAccount = body => http.post(apiUpdateGroupAccount, body)
const deleteGroupAccount = data => http.post(apiDeleteGroupAccount, data)
//Thành viên
const getAllMember = body => http.post(apiGetAllMember, body)
const insertMember = body => http.post(apiInsertMember, body)
const updateMember = body => http.post(apiUpdateMember, body)
const deleteMember = data => http.post(apiDeleteMember, data)
const resetPassword = params =>
  http.patch(`${apiResetPassword}?${QueryString.stringify(params)}`)
//Nhóm thành viên
const getListMemberForGroup = body => http.post(apiGetListMemberForGroup, body)
const insertMemberToGroup = data => http.post(apiInsertMemberToGroup, data)
const deleteMemberGroup = data => http.post(apiDeleteMemberGroup, data)

const CategoryPostApi = {
  updateSortOrder,
  getAccount,
  updateByAccountID,
  insertAccount,
  deleteAccount,
  exportUser,
  getAccountFather,
  getGroupAccount,
  insertGroupAccount,
  updateGroupAccount,
  deleteGroupAccount,
  getAllMember,
  insertMember,
  updateMember,
  deleteMember,
  resetPassword,
  getListMemberForGroup,
  insertMemberToGroup,
  deleteMemberGroup,
}
export default CategoryPostApi
