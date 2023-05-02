import QueryString from "qs"
import {
  apiCreateTopicCategory,
  apiDeleteTopicCategory,
  apiGetListTopic,
  apiUpdateTopicCategory,
} from "./apiRouter"
import http from "./index"

const getListTopic = params => http.get(apiGetListTopic, { params })
const createTopic = body => http.post(apiCreateTopicCategory, body)
const updateTopic = body => http.put(apiUpdateTopicCategory, body)
const deleteTopic = body => {
  const params = QueryString.stringify(body)
  return http.patch(`${apiDeleteTopicCategory}?${params}`)
}

const TopicServices = { getListTopic, deleteTopic, createTopic, updateTopic }
export default TopicServices
