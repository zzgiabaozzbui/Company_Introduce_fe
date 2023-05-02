import QueryString from "qs"
import { apiGetListStaticNavbar } from "./apiRouter"
import http from "./index"
const getStaticNav = params =>
  http.get(`${apiGetListStaticNavbar}?${QueryString.stringify(params)}`)

const GuestServices = {
  getStaticNav,
}
export default GuestServices
