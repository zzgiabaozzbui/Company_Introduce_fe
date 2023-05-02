import { apiUploadFile, apiUploadFileList } from "./apiRouter"
import http from "./index"

const uploadFile = body => http.post(apiUploadFile, body)
const uploadFileList = body => http.post(apiUploadFileList, body)

const FileService = { uploadFileList, uploadFile }
export default FileService
