import http from "./index"
import {
  apiChangePassword,
  apiForgotPassword,
  apiLogin,
  apiLogout,
  apiVerifyCode,
} from "./apiRouter"

const login = body => http.post(apiLogin, body)
const forgotPass = body => http.post(apiForgotPassword, body)
const verifyCode = body => http.post(apiVerifyCode, body)
const changePassword = body => http.post(apiChangePassword, body)

const logout = () => http.get(apiLogout)

const AuthService = {
  login,
  logout,
  forgotPass,
  verifyCode,
  changePassword,
}
export default AuthService
