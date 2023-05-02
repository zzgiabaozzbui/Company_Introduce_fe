import { Col, Form, Radio, Row, Spin } from "antd"
import { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import PositionService from "src/services/PositionService"

function AddService({ visible, onOk, onCancel, dataInfo }) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (dataInfo) form.setFieldsValue(dataInfo)
  }, [])

  const handleSubmit = () => {
    form.validateFields().then(values => {
      setLoading(true)
      if (dataInfo) {
        PositionService.update({
          ...values,
          PositionID: dataInfo.PositionID,
        })
          .then(res => {
            if (res.isOk) {
              Notice({
                msg: "Cập nhật thành công",
                isSuccess: true,
              })
              onOk()
            }
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        PositionService.create(values)
          .then(res => {
            if (res.isOk) {
              Notice({
                msg: "Thêm mới thành công",
                isSuccess: true,
              })
              onOk()
            }
          })
          .finally(() => {
            setLoading(false)
          })
      }
    })
  }

  return (
    <CustomModal
      title={dataInfo ? "Sửa thông tin" : "Thêm chức vụ"}
      visible={visible}
      width={720}
      onCancel={onCancel}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button btnType="third" onClick={onCancel}>
            Đóng
          </Button>
          <Button btnType="primary" onClick={() => handleSubmit()}>
            Xác nhận
          </Button>
        </div>
      }
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                name="Type"
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống!",
                  },
                ]}
              >
                <Radio.Group className="w-100">
                  <Row gutter={[16, 16]}>
                    <Col md={12} xs={24}>
                      <Radio value={1}>Chức danh</Radio>
                    </Col>
                    <Col md={12} xs={24}>
                      <Radio value={2}>Chức vụ </Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="PositionName"
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống!",
                  },
                ]}
              >
                <FlInput label="Nhập" isRequired />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="Note">
                <FlInput label="Ghi chú" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </CustomModal>
  )
}

export default AddService
