import {
  apiGetListTags,
  apiDeleteTags,
  apiInsertTags,
  apiUpdateTags,
  apiGetAllTags,
} from "./apiRouter"
import http from "./index"

const getListTags = params => http.post(apiGetListTags, params)
const insertTags = params => http.post(apiInsertTags, params)
const updateTags = params => http.post(apiUpdateTags, params)
const deleteTags = TagsID => http.post(`${apiDeleteTags}?TagsID=${TagsID}`)
const getAllTags = () => http.get(apiGetAllTags)

const TagsService = {
  getListTags,
  insertTags,
  updateTags,
  deleteTags,
  getAllTags,
}
export default TagsService
