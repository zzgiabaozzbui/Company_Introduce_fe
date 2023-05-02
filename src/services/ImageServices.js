import QueryString from "qs"
import {
  apiDeleteImage,
  apiExportImage,
  apiGetDetailImage,
  apiGetListImage,
  apiInsertImage,
  apiUpdateImage,
  apiUpdateStatusImage,
} from "./apiRouter"
import http from "./index"

const insertImage = body => http.post(apiInsertImage, body)
const updateImage = body => http.post(apiUpdateImage, body)
const deleteImage = body => http.post(apiDeleteImage, body)
// const deleteImage = body => {
//   const params = QueryString.stringify(body)
//   return http.patch(`${apiDeleteImage}?${params}`)
// }
const updateStatusImage = body => {
  const params = QueryString.stringify(body)
  return http.patch(`${apiUpdateStatusImage}?${params}`)
}
const getListImage = body => http.post(apiGetListImage, body)
const getDetailImage = body =>
  http.get(`${apiGetDetailImage}?${QueryString.stringify(body)}`)
const exportImg = body =>
  http.post(apiExportImage, body, {
    responseType: "blob",
  })

const ImageServices = {
  insertImage,
  updateImage,
  deleteImage,
  updateStatusImage,
  getListImage,
  getDetailImage,
  exportImg,
}
export default ImageServices
