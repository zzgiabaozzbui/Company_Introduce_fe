import QueryString from "qs"
import {
  apiDeleteTopicPostById,
  apiExportDocumentText,
  apiGetAllOrBySearch,
  apiGetListTopic,
  apiGetTopicByType,
  apiInsertTopicPost,
  apiUpdateTopicPost,
} from "./apiRouter"
import http from "./index"

const getListTopicPost = body => http.post(apiGetAllOrBySearch, body)
const insertTopicPost = body => http.post(apiInsertTopicPost, body)
const updateTopicPost = body => http.put(apiUpdateTopicPost, body)
const getTopicByType = params => http.get(apiGetTopicByType, { params })
const deleteTopic = body => http.patch(apiDeleteTopicPostById, body)

const getListTopic = params => http.get(apiGetListTopic, { params })
const exportDocumentText = body =>
  http.patch(apiExportDocumentText, body, {
    responseType: "blob",
  })

const TopicPostServices = {
  getListTopicPost,
  getTopicByType,
  insertTopicPost,
  updateTopicPost,
  deleteTopic,
  getListTopic,
  exportDocumentText,
}
export default TopicPostServices
