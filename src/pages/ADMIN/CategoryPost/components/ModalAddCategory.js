import { Col, Form, Input, InputNumber, Row, Select, Spin } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import categoryPost from "src/services/categoryPost"

const ModalAddCategory = ({ open, onCancel, onOk, type, text, isEdit }) => {
  const [form] = Form.useForm()
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    form.validateFields().then(values => {
      setLoading(true)
      categoryPost[isEdit ? "updateCategory" : "insertCategory"]({
        ...values,
        CategoryPostID: isEdit && isEdit.CategoryPostID,
        Type: type,
      })
        .then(res => {
          if (res.isOk) {
            Notice({ msg: `${isEdit ? "Cập nhật" : "Thêm mới"} thành công.` })
            onCancel()
            onOk()
          }
        })
        .finally(() => setLoading(false))
    })
  }

  useEffect(() => {
    if (isEdit)
      return form.setFieldsValue({
        ...isEdit,
      })
    form.setFieldsValue({
      Language: 1,
      Status: 1,
    })
  }, [isEdit, form])

  const renderFooter = () => (
    <div className="d-flex-end">
      <Button
        btnType="primary"
        className="btn-hover-shadow"
        onClick={handleSubmit}
      >
        Ghi lại
      </Button>
    </div>
  )

  return (
    <CustomModal
      title={`${isEdit ? "Cập nhật" : "Thêm"} ${text}`}
      open={open}
      width="900px"
      onCancel={onCancel}
      footer={renderFooter()}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label={`Tên ${text}`}
                name="CategoryPostName"
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]}
              >
                <Input placeholder={`Nhập tên ${text}`} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Ngôn ngữ" name="Language">
                <Select placeholder="chọn ngôn ngữ">
                  {getListComboByKey(SYSTEM_KEY?.LANGUAGE, listSystemKey)?.map(
                    i => (
                      <Select.Option key={+i.CodeValue} value={+i.CodeValue}>
                        {i?.Description}
                      </Select.Option>
                    ),
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Trạng thái" name="Status">
                <Select placeholder="chọn ">
                  {getListComboByKey(SYSTEM_KEY?.STATUS, listSystemKey)?.map(
                    i => (
                      <Select.Option key={+i.CodeValue} value={+i.CodeValue}>
                        {i?.Description}
                      </Select.Option>
                    ),
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Thứ tự" name="NumericalOrder">
                <InputNumber placeholder="Nhập số" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </CustomModal>
  )
}

export default ModalAddCategory
