import { Col, Form, Row, Upload } from "antd"
import React from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import SvgIcon from "src/components/SvgIcon"
import { normFile } from "src/lib/utils"
import styled from "styled-components"

const Styled = styled.div`
  .here {
    color: #154398;
    cursor: pointer;
  }
  .ant-upload.ant-upload-drag {
    border: 1px dashed #154398;
    background: #edf6fc;
  }
`
const ModalUploadListDirectory = ({ open, onCancel, onOk }) => {
  const [form] = Form.useForm()
  const onSubmit = async () => {
    const value = await form.validateFields()
  }
  const footer = (
    <div className="d-flex justify-content-flex-end">
      <Button onClick={onSubmit} btnType="primary">
        Nhập
      </Button>
    </div>
  )
  return (
    <CustomModal
      open={!!open}
      title="Nhập file danh sách khách hàng"
      onCancel={onCancel}
      width={600}
      footer={footer}
    >
      <Styled>
        <Form form={form}>
          <span>
            Tải file mẫu <span className="here">Tại đây</span>
          </span>
          <Form.Item
            className="mt-24"
            valuePropName="fileList"
            name="FileList"
            getValueFromEvent={normFile}
            rules={[
              { required: true, message: "Thông tin không được để trống" },
            ]}
          >
            <Upload.Dragger
              multiple={false}
              maxCount={1}
              beforeUpload={() => false}
              className="pointer"
            >
              <Row gutter={16} className="justify-content-center">
                <Col>
                  <SvgIcon name="cloud" />
                </Col>
                <Col>
                  <span>
                    Kéo thả file đính kèm hoặc{" "}
                    <span style={{ color: "#154398" }}>Chọn File</span>
                  </span>
                </Col>
              </Row>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Styled>
    </CustomModal>
  )
}

export default ModalUploadListDirectory
