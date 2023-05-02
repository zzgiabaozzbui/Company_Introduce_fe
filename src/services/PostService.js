import QueryString from "qs"
import {
  apiGetListPost,
  apiGetListCategoryPost,
  apiInsertCategory,
  apiUpdateCategory,
  apiDeleteCategory,
  apiInsertPost,
  apiGetDetailPost,
  apiUpdatePost,
  apiDeletePost,
  apiRePost,
  apiCancelPost,
  apiGetCategoryPostCate,
  apiSortCategories,
  apiSortPost,
  apiKhoiPhuc,
  apiGetListHistory,
  apiGetDetailHistory,
  apiUpdateStatusPost,
  apiExportPost,
} from "./apiRouter"
import http from "./index"

const getListCategoryPost = params =>
  http.patch(`${apiGetListCategoryPost}?${QueryString.stringify(params)}`)
const insertCategory = body => http.post(apiInsertCategory, body)
const updateCategory = body => http.put(apiUpdateCategory, body)
const deleteCategory = body => http.post(apiDeleteCategory, body)

const getListPost = body => http.post(apiGetListPost, body)
const insertPost = body => http.post(apiInsertPost, body)
const updatePost = body => http.put(apiUpdatePost, body)
const getPost = params => http.get(apiGetDetailPost, { params })
const deletePost = PostID => http.patch(`${apiDeletePost}?PostID=${PostID}`)
const rePost = PostID => http.patch(`${apiRePost}?PostID=${PostID}`)
const cancelPost = PostID => http.patch(`${apiCancelPost}?PostID=${PostID}`)
const getCategoryPostCate = params =>
  http.get(apiGetCategoryPostCate, { params })
const sortCategories = body => http.post(apiSortCategories, body)
const sortPost = body => http.patch(apiSortPost, body)
const khoiPhuc = body =>
  http.patch(`${apiKhoiPhuc}?${QueryString.stringify(body)}`)
const getListHistory = body => http.patch(apiGetListHistory, body)
const getDetailHistory = body =>
  http.patch(`${apiGetDetailHistory}?${QueryString.stringify(body)}`)
const updateStatusPost = body => http.patch(apiUpdateStatusPost, body)
const exportPost = body =>
  http.post(apiExportPost, body, {
    responseType: "blob",
  })
const PostService = {
  getListPost,
  getListCategoryPost,
  insertCategory,
  updateCategory,
  deleteCategory,
  insertPost,
  updatePost,
  getPost,
  deletePost,
  rePost,
  cancelPost,
  getCategoryPostCate,
  sortCategories,
  sortPost,
  khoiPhuc,
  getListHistory,
  getDetailHistory,
  updateStatusPost,
  exportPost,
}
export default PostService
