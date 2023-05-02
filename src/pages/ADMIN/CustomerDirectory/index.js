import { Col, Divider, Row, Space, Select } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import DirectoryService from "src/services/DirectoryService"
import CustomerDetail from "./components/CustomerDetail"
import ListAddress from "./components/ListAddress"
import ModalInsertUpdateCustomer from "./components/ModalInsertUpdateCustomer"
import ModalUploadListDirectory from "./components/ModalUploadListDirectory"
import { CustomerDirectoryStyled } from "./styled"

const { Option } = Select
const CustomerDirectory = ({ setState }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const { addressSelect } = useSelector(state => state.customerDirectory)
  const [pagination, setPagination] = useState()
  const [textSearch, setTextSeach] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(undefined)

  const [openInsert, setOpenInsert] = useState(false)
  const [openImport, setOpenImport] = useState(false)

  useEffect(() => {
    if (!!addressSelect?.key || addressSelect?.key === 0) {
      if (!pagination)
        setPagination({
          PageSize: 20,
          CurrentPage: 1,
          Status: 1,
        })
      else setPagination(pre => ({ ...pre, CurrentPage: 1 }))
    }
  }, [addressSelect?.key])
  useEffect(() => {
    if (pagination) getList()
  }, [pagination])

  const getList = async () => {
    try {
      setLoading(true)
      const res = await DirectoryService.getAll({
        ...pagination,
        textSearch,
        RegionID: addressSelect?.key,
      })
      if (res?.isError) return
      setData(res?.Object)
    } finally {
      setLoading(false)
    }
  }
  const handleChangePage = (page, pageSize) => {
    let currentPage = page
    if (pageSize !== pagination.PageSize) {
      currentPage = 1
    }
    setPagination({ CurrentPage: currentPage, PageSize: pageSize })
  }

  const columns = [
    {
      title: "STT",
      dataIndex: "Index",
      key: "Index",
      width: 60,
      align: "center",
      render: (val, record, idx) => (
        <div className="text-center">
          {idx + 1 + pagination?.PageSize * (pagination?.CurrentPage - 1)}
        </div>
      ),
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "UserName",
      key: "UserName",
      width: 200,
    },
    {
      title: "Họ và tên",
      dataIndex: "FullName",
      key: "FullName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      align: "center",
      width: 150,
    },

    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Địa chỉ",
      dataIndex: "FullAddress",
      key: "FullAddress",
      width: 300,
      render: (text, record) => (
        <div className="d-flex justify-content-space-between align-items-center mh-36">
          <div className="text-ellipsis">{text}</div>
          <div className="list-button-hover">{renderListButton(record)}</div>
        </div>
      ),
    },
  ]
  const renderListButton = record => {
    return (
      <Space>
        {!!data?.ButtonShow?.IsUpdate && (
          <ButtonCircle
            title="Cập nhật"
            iconName="edit-green"
            style={{ background: "#DDFEF0" }}
            onClick={() => setOpenInsert(record)}
          />
        )}

        {!!data?.ButtonShow?.IsReset && (
          <ButtonCircle
            title="Reset mật khẩu"
            iconName="reset-pass"
            style={{ background: "#EDF6FC" }}
            onClick={() =>
              CB1({
                title: `Bạn có chắc chắn muốn Reset mật khẩu tài khoản <strong> ${record?.UserName}</strong> không?`,
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
  }
  const onReset = async UserID => {
    const res = await DirectoryService.resetPass({ UserID })
    if (res?.isError) return
    Notice({ msg: "Reset mật khẩu thàng công!" })
  }
  return (
    <CustomerDirectoryStyled>
      <Row gutter={[16, 16]}>
        <Col md={18} xs={24}>
          <FlInput
            search="true"
            allowClear
            label="Nhập tên, mã, SĐT khách hàng"
            onSearch={() => setPagination(pre => ({ ...pre, CurrentPage: 1 }))}
            onChange={e => setTextSeach(e?.target?.value)}
          />
        </Col>
        <Col lg={6} xs={24}>
          <FlSelect
            label="Trạng thái"
            defaultValue={1}
            onChange={Status => {
              setPagination(pre => ({ ...pre, Status, CurrentPage: 1 }))
            }}
            allowClear
          >
            {getListComboByKey(SYSTEM_KEY?.COMMON_STATUS, listSystemKey)?.map(
              i => (
                <Option key={+i.CodeValue} value={+i.CodeValue}>
                  {i?.Description}
                </Option>
              ),
            )}
          </FlSelect>
        </Col>
      </Row>

      <Divider className="mv-16" />
      <Row gutter={16}>
        <Col style={{ width: 300 }}>
          <ListAddress type={3} getNoAddress={true} />
        </Col>
        <Col style={{ width: 0 }} flex="auto">
          <Row className="title-type-1 justify-content-space-between align-items-center pb-16 pt-0 mb-16">
            <div style={{ fontSize: 24 }}>Danh sách khách hàng</div>
            <Space>
              {/* {data?.ButtonShow?.IsImport && (
                <Button btnType="third" onClick={() => setOpenImport(true)}>
                  Nhập file khách hàng
                </Button>
              )}
              {data?.ButtonShow?.IsExport && (
                <Button btnType="third" onClick={() => {}}>
                  Xuất Excel
                </Button>
              )} */}
              {data?.ButtonShow?.IsInsert && (
                <Button
                  btnType="primary"
                  className="btn-hover-shadow"
                  onClick={() => setOpenInsert(true)}
                >
                  Thêm khách hàng
                </Button>
              )}
            </Space>
          </Row>
          <TableCustom
            isPrimary
            dataSource={data?.ListDirectoryGetAllUser}
            columns={columns}
            onRow={record => {
              return {
                onClick: () => {
                  setOpenModalDetail(true)
                  setCustomerInfo(record)
                },
              }
            }}
            sticky={{ offsetHeader: 85 }}
            loading={loading}
            textEmpty="Không có khách hàng"
            pagination={{
              hideOnSinglePage: data?.Total <= 10,
              current: pagination?.CurrentPage,
              pageSize: pagination?.PageSize,
              responsive: true,
              total: data?.Total,
              locale: { items_per_page: "" },
              showSizeChanger: data?.Total > 10,
              onChange: handleChangePage,
            }}
            rowKey="UserID"
            scroll={{ x: "800px" }}
          />
        </Col>
      </Row>
      {!!openInsert && (
        <ModalInsertUpdateCustomer
          open={openInsert}
          onCancel={() => setOpenInsert(false)}
          onOk={getList}
        />
      )}

      {!!openImport && (
        <ModalUploadListDirectory
          open={openImport}
          onCancel={() => setOpenImport(false)}
          onOk={getList}
        />
      )}
      {!!openModalDetail && (
        <CustomerDetail
          customerInfo={data?.ListDirectoryGetAllUser?.find(
            item => item?.UserID === customerInfo?.UserID,
          )}
          open={openModalDetail}
          onCancel={() => {
            setOpenModalDetail(false)
            setCustomerInfo(undefined)
          }}
          onOk={getList}
        />
      )}
    </CustomerDirectoryStyled>
  )
}

export default CustomerDirectory
