// import QueryString from "qs"
import {
  apiGetCategoryPostByID,
  apiInsert,
  apiUpdate,
  apiDelete,
  apiGetListPostGroup,
  apiGetListDocumentType,
  apiGetListField,
  apiGetListFile,
  apiGetListAgencyIssued,
  apiGetListImg,
  apiSortCategories,
  apiUpdateSortOrder,
} from "./urls"
import http from "../index"

const getCategoryPostByID = params =>
  http.get(apiGetCategoryPostByID, { params })
const insertCategory = body => http.post(apiInsert, body)
const updateCategory = body => http.put(apiUpdate, body)
const deleteCategory = listID => http.post(apiDelete, listID)
const updateSortOrder = data => http.post(apiUpdateSortOrder, data)
const getListPostGroup = params => http.get(apiGetListPostGroup, { params })
const getListDocumentType = params =>
  http.get(apiGetListDocumentType, { params })
const getListField = params => http.get(apiGetListField, { params })
const getListFile = params => http.get(apiGetListFile, { params })
const getListAgencyIssued = params =>
  http.get(apiGetListAgencyIssued, { params })
const getListImg = params => http.get(apiGetListImg, { params })
const sortCategories = body => http.post(apiSortCategories, body)

const CategoryPostApi = {
  getCategoryPostByID,
  insertCategory,
  updateCategory,
  deleteCategory,
  updateSortOrder,
  getListPostGroup,
  getListDocumentType,
  getListField,
  getListFile,
  getListAgencyIssued,
  getListImg,
  sortCategories,
}
export default CategoryPostApi
