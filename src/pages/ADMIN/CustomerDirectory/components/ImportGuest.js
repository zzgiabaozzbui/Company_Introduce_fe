import { Col, Row, Spin } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import CustomModal from "src/components/Modal/CustomModal"
import SvgIcon from "src/components/SvgIcon"
import UploadCustom from "src/components/Upload"
import { apiImportUser } from "src/services/apiRouter"
import UserService from "src/services/UserService"
import { ImportStyled } from "../../ListUser/styled"

const ImportGuest = ({ open, onCancel, onOk, department }) => {
  const [loading, setLoading] = useState(false)
  const { AddressSelect } = useSelector(state => state.customerDirectory)

  const getTemplateUpload = () => {
    setLoading(true)
    UserService.templateImportGuest()
      .then(res => {
        if (res?.isError) return
        window.open(res?.Object)
      })
      .finally(() => setLoading(false))
  }
  return (
    <CustomModal
      title="Nhập file danh sách khách hàng"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <ImportStyled>
        <Spin spinning={loading}>
          <div style={{ marginBottom: 10 }}>
            Tải file mẫu{" "}
            <span
              onKeyPress={() => {}}
              onClick={getTemplateUpload}
              style={{ color: "#154398", cursor: "pointer" }}
            >
              Tại đây
            </span>
          </div>
          <div className="mb-16">
            Phòng ban: {AddressSelect.RegionName}
            <span className="fw-600">{department?.DepartmentName}</span>
          </div>
          <UploadCustom
            accept=".xlsx, .xls"
            isDragger
            // api={`${apiImportUser}?DepartmentID=${department?.DepartmentID}`}
            onOk={() => {
              onOk()
              onCancel()
            }}
            nameFileUpload="file"
          >
            <Row gutter={20} className="justify-content-center">
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
          </UploadCustom>
          <Row className="box-note">
            <Col>
              <SvgIcon name="warningCKS" />
            </Col>
            <Col className="ml-10">
              Lưu ý: Tải lên file danh sách khách hàng theo từng khu vực đã chọn
            </Col>
          </Row>
        </Spin>{" "}
      </ImportStyled>
    </CustomModal>
  )
}

export default ImportGuest
