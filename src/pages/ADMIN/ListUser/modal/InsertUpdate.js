import {
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  TreeSelect,
  Upload,
} from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import SvgIcon from "src/components/SvgIcon"
import { GUIDE_EMPTY, SYSTEM_KEY } from "src/constants/constants"
import {
  getRegexEmail,
  getRegexMobile,
  getRegexPassword,
  getRegexUsername,
} from "src/lib/stringsUtils"
import { getListComboByKey, nest, normFile } from "src/lib/utils"
import Department from "src/services/Department"
import FileService from "src/services/FileService"
import PositionService from "src/services/PositionService"
import RoleService from "src/services/RoleService"
import UserService from "src/services/UserService"
import styled from "styled-components"
import { ButtonUploadStyle } from "../styled"
const { Option } = Select
const Styled = styled.div`
  .ant-upload.ant-upload-select-picture-card {
    width: unset;
    height: unset;
    background-color: unset;
    border: unset;
  }
  .ant-upload-list {
    align-items: center;
    display: flex;
  }
`
const ModalInsertUpdate = ({ onOk, detailInfo, ...props }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [form] = Form.useForm()

  const [listDept, setListDept] = useState([])
  const [listPosition, setListPosition] = useState([])
  const [listTitle, setListTitle] = useState([])
  const [listRole, setListRole] = useState([])

  const [loading, setLoading] = useState(false)
  const listStatus = getListComboByKey("ACCOUNT_STATUS", listSystemKey)?.map(
    i => ({ ...i, label: i?.Description, value: i?.CodeValue }),
  )
  const defaultPass = listSystemKey?.find(
    i => i?.CodeKey === "DEFAULT_PASSWORD",
  )
  useEffect(() => {
    if (detailInfo && props?.open) getUserDetail()
  }, [detailInfo, props?.open])

  useEffect(() => {
    getListSelect()
  }, [])

  const getUserDetail = async () => {
    try {
      setLoading(true)
      const res = await UserService.detailUser({ UserID: detailInfo?.UserID })
      if (res?.isError) return
      form.setFieldsValue({
        ...res?.Object,
        Birthday: !!res?.Object?.Birthday && moment(res?.Object?.Birthday),
        RoleID: res?.Object?.ListRole[0]?.RoleID || undefined,
        Avatar: !!res?.Object?.Avatar ? [{ url: res?.Object?.Avatar }] : [],
        Sex: !!res?.Object?.Sex ? res?.Object?.Sex : undefined,
      })
    } finally {
      setLoading(false)
    }
  }
  const getListSelect = async () => {
    try {
      setLoading(true)
      const resPostion = await PositionService.getAllPosition()
      const resDept = await Department.getAllDept()
      const resRole = await RoleService.getAllForCombobox()
      const resTitle = await PositionService.getAllTitle()
      if (!resRole?.isError) setListRole(resRole?.Object)
      if (!resPostion?.isError) setListPosition(resPostion?.Object)
      if (!resTitle?.isError) setListTitle(resTitle?.Object)

      if (!resDept?.isError)
        setListDept(nest(resDept?.Object, GUIDE_EMPTY, "DepartmentParentID"))
    } finally {
      setLoading(false)
    }
  }

  const onContinue = async () => {
    try {
      setLoading(true)

      const values = await form.validateFields()
      let urlAvatar = ""
      if (values?.Avatar?.length && values?.Avatar[0]?.name) {
        const formData = new FormData()
        values?.Avatar?.map(img => formData.append("file", img?.originFileObj))
        const resUpload = await FileService.uploadFile(formData)
        urlAvatar = resUpload?.Object
      } else {
        if (!!values?.Avatar) urlAvatar = values?.Avatar[0]?.url
      }

      const res = await UserService[detailInfo ? "updateUser" : "insertUser"]({
        ...values,
        AccountType: 1,
        Avatar: urlAvatar,
        Birthday: values?.Birthday
          ? moment(values?.Birthday).format()
          : undefined,
        UserID: detailInfo?.UserID,
        UserCode: values?.UserName,
      })

      if (res?.isError) return
      onOk && onOk()
      Notice({
        msg: `${detailInfo ? "Cập nhật" : "Thêm"} nhân viên thành công !`,
      })
      props?.onCancel()
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button
        btnType="primary"
        className="btn-hover-shadow"
        onClick={onContinue}
      >
        Ghi lại
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={!!detailInfo ? "Cập nhật nhân viên" : "Thêm nhân viên"}
      footer={renderFooter()}
      width={1024}
      {...props}
    >
      <Spin spinning={loading}>
        <Styled>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              Password: defaultPass?.Description,
              ListUserManager: [
                { PositionID: undefined, DepartmentID: undefined },
              ],
            }}
          >
            <div className="form-list-custom">
              <Form.List name="ListUserManager">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, idx) => (
                      <Row
                        gutter={[16, 16]}
                        className="mt-16"
                        key={`form-list${idx}`}
                      >
                        <Col flex="auto" style={{ width: 0 }}>
                          <Row gutter={[16, 16]}>
                            <Col span={24} style={{}}>
                              <Form.Item
                                {...restField}
                                name={[name, "DepartmentID"]}
                                label={!idx ? "Phòng ban" : undefined}
                                required
                                rules={[
                                  {
                                    required: true,
                                    message: "Thông tin không được để trống",
                                  },
                                ]}
                              >
                                <TreeSelect
                                  placeholder="Chọn"
                                  treeData={listDept}
                                />
                              </Form.Item>
                            </Col>
                            {/* <Col span={12}>
                              <Form.Item
                                {...restField}
                                name={[name, "PositionID"]}
                                label={!idx ? "Chức vụ" : undefined}
                                // required
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: "Thông tin không được để trống",
                                //   },
                                // ]}
                              >
                                <Select placeholder="Chọn">
                                  {listPosition?.map(i => (
                                    <Option
                                      key={i?.PositionID}
                                      value={i?.PositionID}
                                      title={i?.PositionName}
                                    >
                                      {i?.PositionName}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col> */}
                          </Row>
                        </Col>
                        <Col style={{ marginTop: !idx ? 30 : 0 }}>
                          <ButtonCircle
                            iconName={!idx ? "plus-circle" : "bin"}
                            title={!idx ? "Thêm" : "Xóa"}
                            onClick={() => (!idx ? add() : remove(name))}
                            style={{ background: !idx ? "#EDF6FC" : "#F7F7F7" }}
                          />
                        </Col>
                      </Row>
                    ))}
                  </>
                )}
              </Form.List>
            </div>
            <Row gutter={[16]}>
              <Col span={24}>
                <Form.Item
                  label="Hình đại diện"
                  name="Avatar"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
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
                    accept="image/*"
                    multiple={false}
                    maxCount={1}
                    beforeUpload={() => false}
                    listType="picture-card"
                  >
                    <Row className="align-items-center">
                      <ButtonUploadStyle>
                        <Button className="account-button-upload ">
                          <Row className="account-background-upload d-flex align-items-center">
                            <SvgIcon name="add-media-video" />
                            <div className="account-text-upload ml-16">
                              Chọn ảnh
                            </div>
                          </Row>
                        </Button>
                      </ButtonUploadStyle>
                      <div className="sub-color fs-12 ml-16">
                        Dung lượng file tối đa 5MB, định dạng: .JPG, .JPEG,
                        .PNG, .SVG
                      </div>
                    </Row>
                  </Upload>
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Họ và tên"
                  required
                  name="FullName"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>

              <Col md={detailInfo?.UserID ? 6 : 12} xs={24}>
                <Form.Item
                  label="Tên tài khoản"
                  required
                  name="UserName"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                    {
                      pattern: getRegexUsername(),
                      message:
                        "Tài khoản phải nhiều hơn 6 kí tự, bao gồm chữ số hoặc chữ cái hoặc kí tự _ và không chứa khoảng trắng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên" />
                </Form.Item>
              </Col>
              {!!detailInfo?.UserID && (
                <Col md={6} xs={24}>
                  <Form.Item
                    label="Trạng thái"
                    name="Status"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Chọn trạng thái"
                      options={listStatus}
                    />
                  </Form.Item>
                </Col>
              )}
              {!detailInfo?.UserID && (
                <>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label="Mật khẩu"
                      required
                      name="Password"
                      rules={[
                        {
                          required: true,
                          message: "Thông tin không được để trống",
                        },
                        {
                          pattern: getRegexPassword(),
                          message:
                            "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Nhập"
                        autoComplete="new-password"
                      />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label="Nhập lại mật khẩu"
                      required
                      name="PasswordConfirm"
                      rules={[
                        {
                          required: true,
                          message: "Thông tin không được để trống",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("Password") === value) {
                              return Promise.resolve()
                            }
                            return Promise.reject(
                              new Error("Mật khẩu xác nhận không đúng!"),
                            )
                          },
                        }),
                      ]}
                    >
                      <Input.Password placeholder="Nhập" />
                    </Form.Item>
                  </Col>
                </>
              )}

              <Col md={12} xs={24}>
                <Form.Item
                  label="Số điện thoại"
                  name="PhoneNumber"
                  rules={[
                    {
                      pattern: getRegexMobile(),
                      message:
                        "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                    },
                  ]}
                >
                  <Input placeholder="Nhập" />
                </Form.Item>
              </Col>
              <Col md={12} xs={24}>
                <Form.Item
                  label="Email"
                  name="Email"
                  rules={[
                    {
                      pattern: getRegexEmail(),
                      message: "Email sai định dạng",
                    },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
              </Col>
              <Col md={6} xs={24}>
                <Form.Item label="Giới tính" name="Sex">
                  <Select placeholder="Chọn">
                    {getListComboByKey(
                      SYSTEM_KEY?.SEX_TYPE,
                      listSystemKey,
                    )?.map(i => (
                      <Option key={+i?.CodeValue} value={+i?.CodeValue}>
                        {i?.Description}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={6} xs={24}>
                <Form.Item label="Ngày sinh" name="Birthday">
                  <DatePicker placeholder="Chọn" format="DD/MM/YYYY" />
                </Form.Item>
              </Col>

              <Col md={12} xs={24}>
                <Form.Item
                  label="Nhóm quyền"
                  required
                  name="ListRoleID"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <Select
                    placeholder="Chọn"
                    mode="multiple"
                    maxTagCount="responsive"
                  >
                    {listRole?.map((i, idx) => (
                      <Option
                        key={i?.RoleID}
                        value={i?.RoleID}
                        title={i?.RoleName}
                      >
                        {i?.RoleName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Địa chỉ" name="Address">
                  <Input placeholder="Nhập" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Styled>
      </Spin>
    </CustomModal>
  )
}

export default ModalInsertUpdate
