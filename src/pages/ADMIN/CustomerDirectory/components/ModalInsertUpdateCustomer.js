import { Col, Form, Input, Row, Select, Spin } from "antd"
import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import SelectAddress from "src/components/SelectAddress"
import {
  getRegexEmail,
  getRegexMobile,
  getRegexPassword,
  getRegexUsername,
} from "src/lib/stringsUtils"
import { getListComboByKey } from "src/lib/utils"
import DirectoryService from "src/services/DirectoryService"

const ModalInsertUpdateCustomer = ({ open, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [initAddress, setInitAddress] = useState()

  const listStatus = getListComboByKey("ACCOUNT_STATUS", listSystemKey)?.map(
    i => ({ ...i, label: i?.Description, value: i?.CodeValue }),
  )

  useEffect(() => {
    if (open?.UserID) {
      form.setFieldsValue({
        ...open,
        districtId: !!open?.DistrictID ? open?.DistrictID : undefined,
        provinceId: !!open?.ProvinceID ? open?.ProvinceID : undefined,
        wardId: !!open?.WardID ? open?.WardID : undefined,
      })
      setInitAddress({
        districtId: !!open?.DistrictID ? open?.DistrictID : undefined,
        provinceId: !!open?.ProvinceID ? open?.ProvinceID : undefined,
        wardId: !!open?.WardID ? open?.WardID : undefined,
      })
    }
  }, [open])

  const onSubmit = async () => {
    try {
      setLoading(true)
      const values = await form?.validateFields()
      const res = await DirectoryService[open?.UserID ? "update" : "insert"]({
        ...values,
        UserID: open?.UserID,
        DistrictID: !!values?.districtId ? values?.districtId : undefined,
        ProvinceID: !!values?.provinceId ? values?.provinceId : undefined,
        WardID: !!values?.wardId ? values?.wardId : undefined,
      })
      if (res?.isError) return
      Notice({
        msg: open?.UserID
          ? `Cập nhật thông tin khách hàng thành công!`
          : `Thêm khách hàng mới thành công!`,
      })
      onOk && onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  const renderFooter = (
    <div className="d-flex justify-content-flex-end">
      <Button
        btnType="primary"
        className="btn-hover-shadow"
        disabled={loading}
        onClick={onSubmit}
      >
        Ghi lại
      </Button>
    </div>
  )

  return (
    <CustomModal
      title={
        open?.UserID ? `Cập nhật thông tin khách hàng ` : `Thêm khách hàng mới`
      }
      open={!!open}
      onCancel={onCancel}
      footer={renderFooter}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="UserName"
                label="Tên đăng nhập"
                required
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                  {
                    pattern: getRegexUsername(),
                    message:
                      "Tài khoản phải nhiều hơn 6 kí tự, bao gồm chữ số hoặc chữ cái hoặc kí tự _ và không chứa khoảng trắng",
                  },
                ]}
              >
                <Input placeholder="Nhập tên đăng nhập" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="FullName"
                label="Tên khách hàng"
                required
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                ]}
              >
                <Input placeholder="Nhập tên khách hàng" />
              </Form.Item>
            </Col>
            <Col span={open?.UserID ? 8 : 12}>
              <Form.Item
                name="PhoneNumber"
                label="Số điện thoại"
                required
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                  {
                    pattern: getRegexMobile(),
                    message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                  },
                ]}
              >
                <Input placeholder="Nhập Số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={open?.UserID ? 8 : 12}>
              <Form.Item
                name="Email"
                label="Email"
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                  {
                    pattern: getRegexEmail(),
                    message: "Email sai định dạng",
                  },
                ]}
              >
                <Input placeholder="Nhập Email" />
              </Form.Item>
            </Col>

            {!!open?.UserID && (
              <Col span={8}>
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
                  <Select placeholder="Chọn trạng thái" options={listStatus} />
                </Form.Item>
              </Col>
            )}

            <Col span={24}>
              <SelectAddress
                floating={false}
                form={form}
                required
                initValue={initAddress}
              />
            </Col>
            <Col span={24}>
              <Form.Item
                name="Address"
                label="Địa chỉ"
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                ]}
              >
                <Input placeholder="Nhập Số nhà/tổ/thôn/xóm..." />
              </Form.Item>
            </Col>

            {!open?.UserID && (
              <>
                <Col span={12}>
                  <Form.Item
                    name="Password"
                    label="Mật khẩu"
                    required
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
                      placeholder="Nhập mật khẩu"
                      autoComplete="new-password"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="RePassword"
                    label="Nhập lại mật khẩu"
                    required
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
                            new Error("Mật khẩu không khớp!"),
                          )
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Nhập lại mật khẩu" />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </Spin>
    </CustomModal>
  )
}

export default ModalInsertUpdateCustomer
