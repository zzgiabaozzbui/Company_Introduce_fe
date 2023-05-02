import http from "./index"
import {
  apiGetAccountByToken,
  apiGetUnitInformation,
  apiUpdateByAccountID,
  apiUpdateUnitInformation,
} from "./apiRouter"

const getAccountByToken = () => http.get(apiGetAccountByToken)
const updateByAccountID = body => http.post(apiUpdateByAccountID, body)

const getUnitInformation = () => http.get(apiGetUnitInformation)
const updateUnitInformation = body => http.post(apiUpdateUnitInformation, body)

const Account = {
  getAccountByToken,
  updateByAccountID,
  getUnitInformation,
  updateUnitInformation,
}
export default Account
