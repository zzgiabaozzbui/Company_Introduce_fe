import React from "react"
import CustomModal from "src/components/Modal/CustomModal"
import UploadCustom from "src/components/Upload"
import { apiImportUser } from "src/services/apiRouter"
import UserService from "src/services/UserService"
import { useSelector } from "react-redux"
import SvgIcon from "src/components/SvgIcon"
import { Col, Row, Spin } from "antd"
import { ImportStyled } from "../styled"
import { downloadFile, downloadFileBlob } from "src/lib/base64"
import { useState } from "react"

const ImportUser = ({ open, onCancel, onOk, department }) => {
  const { importLoading } = useSelector(state => state.common)
  const [loading, setLoading] = useState(false)
  const getTemplateUpload = () => {
    setLoading(true)
    UserService.templateImportGuest()
      .then(res => {
        if (res?.isError) return
        downloadFileBlob(res, "Mẫu danh sách nhân viên.xlsx")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <CustomModal
      title="Nhập file danh sách nhân viên"
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      <Spin spinning={loading}>
        <ImportStyled>
          <Spin spinning={!!importLoading}>
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
              Phòng ban:{" "}
              <span className="fw-600">{department?.DepartmentName}</span>
            </div>
            <UploadCustom
              accept=".xlsx, .xls"
              isDragger
              api={`${apiImportUser}?DepartmentID=${department?.DepartmentID}`}
              onOk={() => {
                onOk()
                onCancel()
              }}
              nameFileUpload="file"
            >
              <Row gutter={[16, 16]} className="justify-content-center">
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
                Lưu ý: Tải lên file danh sách nhân viên theo từng phòng ban đã
                chọn
              </Col>
            </Row>
          </Spin>{" "}
        </ImportStyled>
      </Spin>
    </CustomModal>
  )
}

export default ImportUser
