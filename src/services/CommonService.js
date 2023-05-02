import { apiGetSystemKey } from "./apiRouter"
import http from "./index"

const getSystemKey = key => http.get(apiGetSystemKey, { params: { key } })

const CommonService = { getSystemKey }
export default CommonService
