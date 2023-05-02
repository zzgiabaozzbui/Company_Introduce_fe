import { Checkbox, Col, Form, Input, InputNumber, Row } from "antd"
import { useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import PostService from "src/services/PostService"

const InsertCategory = ({ open, onCancel, onOk, reload }) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const isEdit = open?.isEdit
  useEffect(() => {
    if (!!isEdit) {
      form.setFieldsValue({
        CategoryPostName: open?.CategoryPostName,
        Status: !!(open?.Status === 1),
        IsShowHome: !!(open?.IsShowHome === 1),
        NumericalOrder: open?.NumericalOrder,
      })
    } else {
      form.setFieldsValue({
        Status: true,
      })
    }
  }, [open])
  // useEffect(() => {
  //   if (!isEdit) {
  //   }
  // }, [])

  const onSubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      let res
      if (isEdit) {
        res = await PostService.updateCategory({
          ...values,
          CategoryPostID: open?.key,
          type: 1,
          Status: !!values?.Status ? 1 : 2,
          IsShowHome: !!values?.IsShowHome ? 1 : 0,
        })
      } else {
        res = await PostService.insertCategory({
          ...values,
          ParentID: open?.key,
          type: 1,
          Status: !!values?.Status ? 1 : 2,
          IsShowHome: !!values?.IsShowHome ? 1 : 0,
        })
      }
      if (res?.isError) return
      Notice({ msg: `${isEdit ? "Cập nhật" : "Thêm"} danh mục thành công !` })
      onOk()
      reload()
      onCancel()
    } finally {
      setLoading(false)
    }
  }
  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button btnType="primary" onClick={onSubmit} loading={loading}>
        {isEdit ? "Cập nhật" : "Thêm"}
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={isEdit ? "Cập nhật danh mục" : "Thêm danh mục"}
      footer={renderFooter()}
      width={1024}
      open={!!open}
      onCancel={onCancel}
    >
      {!isEdit && (
        <span>
          Danh mục cha: <span className="fw-600">{open?.CategoryPostName}</span>
        </span>
      )}
      <div className="mb-16" />
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item
              name="CategoryPostName"
              label="Tên danh mục"
              required
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <Input placeholder="Nhập tên danh mục" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="NumericalOrder" label="Thứ tự">
              <InputNumber defaultValue={0} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <div>
              <Form.Item name="Status" valuePropName="checked">
                <Checkbox>Kích hoạt</Checkbox>
              </Form.Item>
            </div>
          </Col>
          <Col span={12}>
            <div>
              <Form.Item name="IsShowHome" valuePropName="checked">
                <Checkbox>Show home</Checkbox>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </CustomModal>
  )
}

export default InsertCategory
