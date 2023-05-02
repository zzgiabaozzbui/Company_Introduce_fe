import { UserOutlined } from "@ant-design/icons"
import { Col, Form, Row, Spin, Upload } from "antd"
import { useEffect, useState, useContext } from "react"
import LayoutCommon from "src/components/Common/Layout"
import Button from "src/components/MyButton/Button"
import SvgIcon from "src/components/SvgIcon"
import { normFile } from "src/lib/utils"
import { StoreContext } from "src/lib/store"

import STORAGE, { setStorage } from "src/lib/storage"
import FileService from "src/services/FileService"
import UserService from "src/services/UserService"
import ModalChangeInfo from "./components/ModalChangeInfo"
import { StyleMyAccount } from "./styled"

const MyAccount = () => {
  const { userStore } = useContext(StoreContext)
  const [user, setUser] = userStore
  const [form] = Form.useForm()
  const [userInfo, getUserInfo] = useState({})
  const [loading, setLoading] = useState(false)
  const [showChangeInfo, setShowChangeInfo] = useState(false)
  const [avatarUpload, setAvatarUpload] = useState("")

  const getInfo = () => {
    setLoading(true)
    UserService.getInforUser()
      .then(res => {
        if (res.isError) return
        getUserInfo(res.Object)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getInfo()
  }, [])

  const uploadImg = async file => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("file", file)
      const res = await FileService.uploadFile(formData)
      if (res.isError) return
      setAvatarUpload(res.Object)
    } finally {
      setLoading(false)
    }
  }

  const changeAvatar = () => {
    setLoading(true)
    UserService.changeAvatar(avatarUpload)
      .then(res => {
        if (res.isError) return
        getInfo()
        setStorage(STORAGE.USER_INFO, {
          ...user,
          Avatar: avatarUpload,
        })
        setUser({
          ...user,
          Avatar: avatarUpload,
        })
        setAvatarUpload("")
      })
      .finally(() => setLoading(false))
  }

  return (
    <LayoutCommon>
      <Spin spinning={loading}>
        <StyleMyAccount className="mt-24">
          <Form form={form} layout="vertical" style={{ width: "100%" }}>
            <Row gutter={[16, 24]}>
              <Col span={24} className="my-account-title">
                <span className="title-info mr-16">Thông tin tài khoản</span>{" "}
                <Button btnType="third" onClick={() => setShowChangeInfo(true)}>
                  Chỉnh sửa
                </Button>
              </Col>
              <Col span={24} style={{ color: "#666666" }}>
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </Col>
              <Col xs={24} md={12}>
                <Row gutter={[16, 24]}>
                  <Col span={8} className="field-title">
                    Họ và tên
                  </Col>
                  <Col span={16}>{userInfo.FullName}</Col>
                  <Col span={8} className="field-title">
                    Số điện thoại
                  </Col>
                  <Col span={16}>{userInfo.PhoneNumber}</Col>
                  <Col span={8} className="field-title">
                    Email
                  </Col>
                  <Col span={16}>{userInfo.Email}</Col>
                  <Col span={8} className="field-title">
                    Địa chỉ
                  </Col>
                  <Col span={16}>{userInfo.FullAddress}</Col>
                </Row>
              </Col>

              <Col xs={24} md={8}>
                <div className="div-avatar">
                  <div className="wrap-avatar">
                    {!!avatarUpload || !!userInfo.Avatar ? (
                      <img
                        className="user-avatar"
                        src={avatarUpload || userInfo.Avatar}
                        alt="avatar"
                      />
                    ) : (
                      <div
                        className="d-flex align-items-center justify-content-center user-avatar"
                        style={{ backgroundColor: "#ddd" }}
                      >
                        <UserOutlined
                          style={{ fontSize: "40px", color: "#fff" }}
                        />
                      </div>
                    )}
                  </div>
                  <Col className="sign-img" span={24}>
                    <Form.Item
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      name="Avatar"
                      rules={[
                        () => ({
                          validator(_, value) {
                            if (!!value?.find(i => i?.size > 5 * 1024 * 1024)) {
                              return Promise.reject(
                                new Error("Dung lượng file tối đa 5MB"),
                              )
                            }
                            return Promise.resolve()
                          },
                        }),
                      ]}
                    >
                      <Upload
                        beforeUpload={file => {
                          uploadImg(file)
                          return false
                        }}
                        accept="image/*"
                        multiple={false}
                        maxCount={1}
                        fileList={[]}
                      >
                        <div className="upload-avatar">
                          <div className="d-flex justify-content-center">
                            <Button className="sign-button-upload ">
                              <div className="sign-background-upload d-flex align-items-center">
                                <SvgIcon name="small-image-red" />
                                <div className="sign-text-upload ml-16">
                                  Chọn ảnh
                                </div>
                              </div>
                            </Button>
                            {avatarUpload && (
                              <Button
                                btnType="primary"
                                className="ml-16"
                                style={{ width: 120 }}
                                onClick={e => {
                                  e.stopPropagation()
                                  changeAvatar()
                                }}
                              >
                                Lưu ảnh
                              </Button>
                            )}
                          </div>
                        </div>
                        <div
                          className="sign-text"
                          onClick={e => {
                            e.stopPropagation()
                          }}
                        >
                          <div>Dung lượng file tối đa 5MB</div>
                          <div>Định dạng:.JPG, .JPEG, .PNG, .SVG</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                </div>
              </Col>
            </Row>
          </Form>
        </StyleMyAccount>
      </Spin>
      {showChangeInfo && (
        <ModalChangeInfo
          open={showChangeInfo}
          userInfo={userInfo}
          onCancel={() => setShowChangeInfo(false)}
          onOk={() => {
            setShowChangeInfo(false)
            getInfo()
          }}
        />
      )}
    </LayoutCommon>
  )
}

export default MyAccount
