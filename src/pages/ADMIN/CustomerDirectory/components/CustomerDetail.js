import { Col, Row } from "antd"
import { useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import DirectoryService from "src/services/DirectoryService"
import styled from "styled-components"
import ModalInsertUpdateCustomer from "./ModalInsertUpdateCustomer"

const Styled = styled.div`
  background: #f7f7f7;
  border: 1px solid #dddddd;
  border-radius: 8px;
  padding: 16px;
`
const CustomerDetail = ({ open, onCancel, customerInfo, onOk }) => {
  const [loading, setLoading] = useState(false)
  const [openInsert, setOpenInsert] = useState(false)
  const footer = (
    <div className="d-flex justify-content-flex-end">
      <Button
        loading={loading}
        btnType="primary"
        onClick={() => {
          setOpenInsert(customerInfo)
        }}
      >
        Sửa
      </Button>
      <Button
        loading={loading}
        onClick={() => {
          onReset(customerInfo?.UserID)
        }}
      >
        Reset mật khẩu
      </Button>
    </div>
  )

  const onReset = async UserID => {
    const res = await DirectoryService.resetPass({ UserID })
    if (res?.isError) return
    Notice({ msg: "Reset mật khẩu thàng công !" })
  }
  return (
    <CustomModal
      footer={footer}
      open={!!open}
      onCancel={onCancel}
      title="Chi tiết khách hàng"
    >
      <Styled>
        <Row gutter={[20, 8]}>
          <Col md={12} xs={24}>
            <span>
              <span className="fw-600">Tên đăng nhập:</span>{" "}
              {customerInfo?.UserName}
            </span>
          </Col>
          <Col md={12} xs={24}>
            <span>
              <span className="fw-600">Tên khách hàng:</span>{" "}
              {customerInfo?.FullName}
            </span>
          </Col>

          <Col md={12} xs={24}>
            <span>
              <span className="fw-600">Số điện thoại:</span>{" "}
              {customerInfo?.PhoneNumber}
            </span>
          </Col>

          <Col md={12} xs={24}>
            <span>
              <span className="fw-600">Email:</span> {customerInfo?.Email}
            </span>
          </Col>
          <Col md={12} xs={24}>
            <span>
              <span className="fw-600">Địa chỉ:</span> {customerInfo?.Address}
            </span>
          </Col>

          <Col md={12} xs={24}>
            <span>
              <span className="fw-600">Trạng thái:</span>{" "}
              {customerInfo?.IsActive ? "Đang hoạt động" : "Không hoạt động"}
            </span>
          </Col>
        </Row>
      </Styled>

      {!!openInsert && (
        <ModalInsertUpdateCustomer
          open={openInsert}
          onCancel={() => setOpenInsert(false)}
          onOk={onOk}
        />
      )}
    </CustomModal>
  )
}

export default CustomerDetail
