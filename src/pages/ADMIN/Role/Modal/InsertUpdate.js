/* eslint-disable react/prop-types */
import { Form, Modal, Select } from "antd"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import Button from "src/components/MyButton/Button"
import { TOP_MODAL } from "src/constants/constants"
import RoleServices from "src/services/RoleServices"

import { useEffect } from "react"
import Notice from "src/components/Notice"
import { FooterModal } from "../styled"

const { Option } = Select

function InsertUpdateRole({
  visible,
  onCancel,
  onOk,
  dataInfo,
  listFunctions,
}) {
  const [form] = Form.useForm()
  const getRoleById = () => {
    RoleServices.getRoleById({ roleId: dataInfo.roleId }).then(res => {
      if (res?.isError) return
      form.setFieldsValue({
        listFuntionIds: res?.object?.function?.map(i => i?.functionId),
      })
    })
  }

  const onFinish = () => {
    form.validateFields().then(values => {
      RoleServices.insertOrUpdate({
        ...values,
        roleId: dataInfo?.roleId || 0,
      }).then(res => {
        if (res?.isError) return
        onOk()
        Notice({
          msg: !dataInfo
            ? "Tạo Nhóm quyền thành công !"
            : "Cập nhật Nhóm quyền thành công",
          isSuccess: true,
        })
        onCancel()
      })
    })
  }
  const renderFooter = () => (
    <FooterModal>
      <Button
        type="linear"
        className="btn-hover-shadow"
        style={{ marginLeft: 10 }}
        onClick={onFinish}
      >
        Ghi lại
      </Button>
    </FooterModal>
  )

  useEffect(() => {
    if (visible && dataInfo) {
      form.setFieldsValue({ ...dataInfo })
      getRoleById()
    }
    if (!visible) form.resetFields()
  }, [visible, dataInfo])

  return (
    <Modal
      title={dataInfo ? "Cập nhật Nhóm quyền" : "Tạo Nhóm quyền"}
      open={visible}
      onCancel={onCancel}
      footer={renderFooter()}
      width={700}
      style={{ top: TOP_MODAL }}
    >
      <Form form={form}>
        <Form.Item
          name="roleName"
          rules={[{ required: true, message: "Thông tin không được để trống" }]}
        >
          <FlInput isRequired label="Tên nhóm quyền" />
        </Form.Item>

        <Form.Item name="description">
          <FlInput textArea label="Ghi chú" rows={5} />
        </Form.Item>

        <Form.Item
          name="listFuntionIds"
          rules={[{ required: true, message: "Thông tin không được để trống" }]}
        >
          <FlSelect
            mode="multiple"
            showArrow
            isRequired
            label="Quyền nguyên tố"
          >
            {listFunctions?.map(item => (
              <Option value={item.functionId} key={item.functionId}>
                {item?.description}
              </Option>
            ))}
          </FlSelect>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default InsertUpdateRole
