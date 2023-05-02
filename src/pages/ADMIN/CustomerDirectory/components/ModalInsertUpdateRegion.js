import { useEffect } from "react"
import { Modal, Spin, Space, Form } from "antd"
import { useSelector, useDispatch } from "react-redux"
import Button from "src/components/MyButton/Button"
import FlInput from "src/components/FloatingLabel/Input"
import Notice from "src/components/Notice"
import RegionService from "src/services/RegionService"
import { setLoading } from "src/redux/customerDirectory"

const ModalInsertUpdateRegion = ({ visible, onCancel, onOk, isUpdate }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { loading, AddressSelect } = useSelector(
    state => state.customerDirectory,
  )

  useEffect(() => {
    if (isUpdate) {
      form.setFieldsValue({
        RegionName: AddressSelect.RegionName,
      })
    }
  }, [isUpdate, visible])

  const handleFinish = () => {
    form.validateFields().then(values => {
      const body = {
        RegionName: values.RegionName,
      }
      dispatch(setLoading(true))
      if (isUpdate) {
        RegionService.updateRegion({
          ...body,
          ParentID: AddressSelect.ParentID,
          RegionID: AddressSelect.RegionID,
        })
          .then(res => {
            if (res.isOk) {
              onOk()
              Notice({
                msg: "Cập nhật thành công.",
                isSuccess: true,
              })
            }
          })
          .finally(() => dispatch(setLoading(false)))
      } else {
        RegionService.insertRegion({
          ...body,
          ParentID: AddressSelect.RegionID,
        })
          .then(res => {
            if (res.isOk) {
              onOk()
              Notice({
                msg: "Thêm mới thành công.",
                isSuccess: true,
              })
            }
          })
          .finally(() => dispatch(setLoading(false)))
      }
    })
  }

  const renderFooter = () => (
    <Space>
      <Button btnType="third" className="btn-hover-shadow" onClick={onCancel}>
        Đóng
      </Button>
      <Button
        btnType="primary"
        className="btn-hover-shadow"
        onClick={handleFinish}
      >
        Ghi lại
      </Button>
    </Space>
  )
  return (
    <Modal
      title={
        <div className="" style={{ marginBottom: 0 }}>
          {isUpdate
            ? `Cập nhật thông tin địa điểm`
            : `Thêm địa điểm trực thuộc ${AddressSelect.RegionName}`}
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      // style={{ top: TOP_MODAL }}
      footer={renderFooter()}
      width={800}
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <Form.Item
            name="RegionName"
            rules={[
              { required: true, message: "Thông tin không được để trống" },
            ]}
          >
            <FlInput isRequired label="Tên địa điểm" />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}

export default ModalInsertUpdateRegion
