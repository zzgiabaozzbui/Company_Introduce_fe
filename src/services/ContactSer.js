import QueryString from "qs"
import {
  apiSearchGetSupportListRequet,
  apiStatusSupport,
  apiGetDetailContact,
  apiSendContact,
} from "./apiRouter"
import http from "./index"

const getList = body => http.post(apiSearchGetSupportListRequet, body)
const confirmSupport = body => http.post(apiStatusSupport, body)
const getDetailContact = body =>
  http.patch(`${apiGetDetailContact}?${QueryString.stringify(body)}`)
const sendContact = body => http.post(apiSendContact, body)

const ContactSer = {
  getList,
  confirmSupport,
  getDetailContact,
  sendContact,
}
export default ContactSer
