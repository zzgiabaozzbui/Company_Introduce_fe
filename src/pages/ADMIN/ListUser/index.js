import { Anchor, Avatar, Col, Divider, Row, Space, Spin, Tooltip } from "antd"
import { useEffect, useState } from "react"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import DirectoryService from "src/services/DirectoryService"
import UserService from "src/services/UserService"
import Search from "./components/Search"
import TreeAnchor from "./components/TreeAnchor"
import ImportUser from "./modal/ImportUser"
import ModalInsertUpdate from "./modal/InsertUpdate"

import logo from "src/assets/images/logo/logoCDVN.jpg"
import {
  MainTableData,
  MainTableHeader,
  SubTableData,
  SubTableHeader,
} from "src/components/Table/CustomTable/styled"
import UserDetail from "./modal/UserDetail"
import { ListUserStyled } from "./styled"
import { COLOR_STATUS } from "src/constants/constants"
import { FloatActionWrapper } from "src/components/FloatAction/styles"

const ListUser = () => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)
  const [openInsertUpdate, setOpenInsertUpdate] = useState(false)
  const [openImportUser, setOpenImportUser] = useState(false)
  const [detailInfo, setDetailInfo] = useState()
  const [listButtonShow, setListButtonShow] = useState()
  const [selectedNode, setSelectedNote] = useState()
  const [openModalUserDetail, setOpenModalUserDetail] = useState(false)
  const [textSearch, setTextSearch] = useState("")
  const [status, setStatus] = useState(1)
  const columns = [
    {
      title: "STT",
      dataIndex: "Index",
      key: "Index",
      width: 70,
      align: "center",
    },
    {
      title: "Ảnh",
      dataIndex: "Avatar",
      key: "Avatar",
      render: value => <Avatar src={!!value ? value : logo} size={24} />,
      width: 60,
      align: "center",
    },
    {
      title: (
        <>
          <MainTableHeader>Tài khoản</MainTableHeader>
          <SubTableHeader>Họ tên</SubTableHeader>
        </>
      ),
      dataIndex: "FullName",
      key: "FullName",
      align: "center",
      render: (val, record) => (
        <>
          <MainTableData>{record?.UserName}</MainTableData>
          <SubTableData>{val}</SubTableData>
        </>
      ),
    },
    {
      title: (
        <>
          <MainTableHeader>Email</MainTableHeader>
          <SubTableHeader>Số điện thoại</SubTableHeader>
        </>
      ),
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      align: "center",
      render: (val, record) => (
        <>
          <MainTableData>{record?.Email}</MainTableData>
          <SubTableData>{val}</SubTableData>
        </>
      ),
    },
    {
      title: "Nhóm quyền",
      dataIndex: "RoleName",
      key: "RoleName",
      width: 180,
      render: text => (
        <Tooltip
          title={
            text?.length
              ? text?.map((i, idx) => (
                  <span key={`RoleNametooltip${idx}`}>
                    {i}
                    {!!(idx > 0 && idx < text?.length - 1) && " | "}
                  </span>
                ))
              : ""
          }
        >
          <div className="max-line2">
            {text?.length &&
              text?.map((i, idx) => (
                <span key={`RoleName${idx}`}>
                  {!!(idx > 0) && " | "}
                  {i}
                </span>
              ))}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: "Status",
      width: 160,
      render: (text, record) => (
        <div className="d-flex justify-content-center align-items-center mh-36">
          <div className=" text-center">{text}</div>
          <FloatActionWrapper size="small" className="float-action__wrapper">
            {renderListButton(record)}
          </FloatActionWrapper>
        </div>
      ),
    },
  ]
  useEffect(() => {
    getAllUser()
  }, [status])
  const onReset = async UserID => {
    const res = await DirectoryService.resetPass({ UserID })
    if (res?.isError) return
    Notice({ msg: "Reset mật khẩu thàng công !" })
  }
  const renderListButton = record => (
    <Space>
      {!!listButtonShow?.IsUpdate && (
        <ButtonCircle
          title="Cập nhật"
          iconName="edit"
          onClick={() => {
            setOpenInsertUpdate(true)
            setDetailInfo(record)
          }}
        />
      )}
      {!!listButtonShow?.IsDelete && (
        <ButtonCircle
          title="Xóa"
          iconName="bin"
          onClick={() => {
            CB1({
              title: `Bạn có chắc chắn muốn xoá người dùng
              <strong> ${record?.UserName}</strong> không?`,
              icon: "warning-usb",
              okText: "Đồng ý",
              onOk: async close => {
                onDeleteUser(record?.UserID)
                close()
              },
            })
          }}
        />
      )}
      {!!listButtonShow?.IsUpdate && (
        <ButtonCircle
          title="Reset mật khẩu"
          iconName="reset-pass"
          style={{ background: "#fff" }}
          onClick={() =>
            CB1({
              title: `Bạn có chắc chắn muốn Reset mật khẩu tài khoản ${record?.UserName} không?`,
              icon: "warning-usb",
              okText: "Đồng ý",
              onOk: async close => {
                onReset(record?.UserID)
                close()
              },
            })
          }
        />
      )}
    </Space>
  )

  const onDeleteUser = async UserID => {
    try {
      const res = await UserService.deleteUser(UserID)
      if (res?.isError) return
      Notice({ msg: "Xóa người dùng thành công !" })
      getAllUser()
    } finally {
    }
  }

  const getAllUser = async () => {
    try {
      setLoading(true)
      const res = await UserService.getListUser({
        SearchText: textSearch,
        Status: status,
      })
      setListButtonShow(res?.Object?.ButtonShow)
      setDataSource(
        res?.Object?.Data?.length
          ? res?.Object?.Data?.map(i => ({
              ...i,
              UserInfoOutputList: i?.UserInfoOutputList?.map((j, idx) => ({
                ...j,
                Index: idx + 1,
              })),
            }))
          : [],
      )
    } finally {
      setLoading(false)
    }
  }
  const exportUser = async () => {
    try {
      const res = await UserService.exportUser({
        DepartmentID: selectedNode?.DepartmentID,
      })

      const href = URL.createObjectURL(res)

      const link = document.createElement("a")
      link.href = href
      link.setAttribute("download", "file.xlsx") //or any other extension
      document.body.appendChild(link)
      link.click()

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link)
      URL.revokeObjectURL(href)
    } finally {
    }
  }
  return (
    <ListUserStyled>
      <div>
        <Search
          setTextSearch={setTextSearch}
          setStatus={setStatus}
          getAllUser={getAllUser}
          status={status}
        />
        <Divider className="mv-16" />
        <div className="title-type-1 d-flex justify-content-space-between align-items-center pb-16 pt-0 mb-16">
          <div className="fs-24">
            Danh bạ nhân viên
            {/* ({dataSource?.total || 0}) : */}
          </div>
          <Row gutter={[16, 16]}>
            {listButtonShow?.IsInsert && (
              <Col>
                <Button
                  btnType="primary"
                  className="btn-hover-shadow"
                  onClick={() => setOpenInsertUpdate(true)}
                >
                  Thêm nhân viên
                </Button>
              </Col>
            )}
            {listButtonShow?.IsExport && (
              <Col>
                <Button
                  onClick={exportUser}
                  className="btn-hover-shadow"
                  btnType="third"
                >
                  Xuất Excel
                </Button>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <Anchor affix={false} offsetTop={52}>
        <Row gutter={[16, 16]}>
          <Col style={{ width: 300 }}>
            <TreeAnchor
              selectedNode={selectedNode}
              setSelectedNote={setSelectedNote}
              keyId={2}
              getAllUser={() => getAllUser()}
            />
          </Col>
          <Col style={{ width: 0 }} flex="auto">
            <Spin spinning={loading}>
              {dataSource?.length > 0 &&
                dataSource?.map(i => (
                  <div key={`anchor-item${i?.DepartmentID}`}>
                    <div
                      id={i?.DepartmentID}
                      className="fs-16 fw-600 mt-10 mb-10"
                    >
                      {i?.DepartmentName}
                    </div>
                    <TableCustom
                      isPrimary
                      onRow={record => {
                        return {
                          onClick: () => {
                            setOpenModalUserDetail(record)
                          },
                        }
                      }}
                      dataSource={i?.UserInfoOutputList}
                      columns={columns}
                      textEmpty="Không có nhân viên"
                      pagination={false}
                      rowKey="UserID"
                      sticky={{ offsetHeader: 52 }}
                      scroll={{ y: "100%", x: "800px" }}
                    />
                  </div>
                ))}
            </Spin>
          </Col>
        </Row>
      </Anchor>
      {!!openInsertUpdate && (
        <ModalInsertUpdate
          open={openInsertUpdate}
          detailInfo={detailInfo}
          onOk={getAllUser}
          onCancel={() => {
            setDetailInfo(undefined)
            setOpenInsertUpdate(false)
          }}
        />
      )}

      {!!openImportUser && (
        <ImportUser
          open={openImportUser}
          onCancel={() => setOpenImportUser(false)}
          onOk={getAllUser}
          department={selectedNode}
        />
      )}

      {!!openModalUserDetail && (
        <UserDetail
          open={openModalUserDetail}
          onCancel={() => setOpenModalUserDetail(false)}
          onOk={getAllUser}
          department={selectedNode}
        />
      )}
    </ListUserStyled>
  )
}

export default ListUser
