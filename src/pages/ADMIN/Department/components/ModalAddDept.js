import { Col, Form, Row, Spin } from "antd"
import React, { useEffect } from "react"
import { useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import { GUIDE_EMPTY } from "src/constants/constants"
import Department from "src/services/Department"

function ModalAddDept(props) {
  const [form] = Form.useForm()
  const { visible, dataInfo, onCancel, onOk, isEdit } = props
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (dataInfo?.DepartmentID && isEdit)
      form.setFieldsValue({ DepartmentName: dataInfo.DepartmentName })
  }, [dataInfo, isEdit])

  const handleSubmit = () => {
    form.validateFields().then(values => {
      setLoading(true)
      Department.insertOrUpdate({
        DepartmentID: isEdit ? dataInfo.DepartmentID : GUIDE_EMPTY,
        DepartmentParentID: isEdit
          ? dataInfo.DepartmentParentID
          : dataInfo.DepartmentID,
        DepartmentName: values.DepartmentName,
      })
        .then(res => {
          if (res.isOk) {
            onCancel()
            onOk()
          } else {
            onCancel()
          }
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

  return (
    <CustomModal
      title={isEdit ? "Sửa thông tin" : "Thêm phòng ban"}
      visible={visible}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button btnType="third" onClick={onCancel}>
            Đóng
          </Button>
          <Button btnType="primary" onClick={() => handleSubmit()}>
            Gửi
          </Button>
        </div>
      }
      width={970}
      onCancel={onCancel}
    >
      {!isEdit && (
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <div>Đơn vị cha:&nbsp;</div>
          <b>{dataInfo?.DepartmentName}</b>
        </div>
      )}
      <Spin spinning={loading}>
        <Form form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="DepartmentName"
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống!",
                  },
                ]}
              >
                <FlInput label="Tên phòng ban" isRequired />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </CustomModal>
  )
}

export default ModalAddDept
