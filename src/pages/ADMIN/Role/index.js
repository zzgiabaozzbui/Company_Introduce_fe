import { Col, Divider, Row, Select, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import FlSelect from "src/components/FloatingLabel/Select"
import Delete from "src/components/Modal/Delete"
import Button from "src/components/MyButton/Button"
import TableCustom from "src/components/Table/CustomTable"
import { renderButtonCircle } from "src/lib/utils"
import RoleService from "src/services/RoleService"
import ModalRoleGroupForm from "./ModalRoleGroupForm"

import FlInput from "src/components/FloatingLabel/Input"
import { RoleStyled } from "./styled"
import CB1 from "src/components/Modal/CB1"
import Notice from "src/components/Notice"

const Role = () => {
  const [loading, setLoading] = useState(false)
  const [isEditRole, setIsEditRole] = useState(false)
  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState({
    PageSize: 50,
    CurrentPage: 1,
  })
  const [total, setTotal] = useState(0)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [dataInfo, setDataInfo] = useState()
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [infoDelete, setInfoDelete] = useState()
  const [TextSearch, setTextSearch] = useState("")
  const [status, setStatus] = useState(1)

  const getListRole = (paginationProps = pagination) => {
    setLoading(true)
    RoleService.getListRole({
      IsActive: !!status,
      TextSearch: TextSearch,
      ...paginationProps,
    })
      .then(res => {
        if (res?.isError) return
        setDataSource(res?.Object?.data)
        setTotal(res?.Object?.total)
      })
      .finally(() => setLoading(false))
  }

  const deleteRole = () => {
    RoleService.deleteRole({ roleId: infoDelete.RoleID }).then(res => {
      if (res?.isError) return
      getListRole()

      Notice({
        isSuccess: true,
        msg: "Xóa nhóm quyền thành công",
      })
    })
  }

  useEffect(() => {
    getListRole()
  }, [status])

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 60,
      render: (val, record, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        </div>
      ),
      align: "center",
    },
    {
      title: "Tên nhóm quyền",
      dataIndex: "RoleName",
      key: "RoleName",
      width: 300,
    },
    {
      title: "Quyền nguyên tố",
      dataIndex: "ListCategory",
      key: "ListCategory",
      render: (val, record) => (
        <>
          <div className="fw-600">{record.RoleType}:</div>
          <ul>
            {val?.map(i => (
              <Tooltip
                mouseEnterDelay={0.5}
                title={`${i.DescriptionCategory}:
                ${i.ListFunction?.map(data => data.DescriptionFunction)}`}
                key={`tip${i.CategoryID}`}
              >
                <li
                  key={`${i?.categoryId}${i?.DescriptionCategory}`}
                  className="text-ellipsis text-ellipsis-1"
                >
                  {`• ${i.DescriptionCategory}:
                 ${i.ListFunction?.map(
                   data => " " + data.DescriptionFunction,
                 )}`}
                </li>
              </Tooltip>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "IsDelete",
      key: "IsDelete",
      align: "center",
      width: 200,
      render: (val, record) => (
        <div>
          <div>
            {val ? (
              <div className="fw-600" style={{ color: "" }}>
                Không hoạt động
              </div>
            ) : (
              <div className="fw-600" style={{ color: "#0D99FF" }}>
                Đang hoạt động
              </div>
            )}
          </div>
          <FloatActionWrapper size="small" className="float-action__wrapper">
            {renderButtonCircle(
              "Chỉnh sửa",
              "edit",
              () => {
                setIsEditRole(true)
                setDataInfo(record)
                setOpenModalEdit(true)
              },
              true,
            )}
            {/* {renderButtonCircle(
              "Lịch sử hoạt động",
              "history",
              () => {
                setIsEditRole(true)
                setDataInfo(record)
                setOpenModalEdit(true)
              },
              true,
            )} */}
            {renderButtonCircle(
              "Xoá",
              "bin",
              () => {
                setOpenDeleteModal(true)
                setInfoDelete(record)
              },
              true,
            )}
          </FloatActionWrapper>
        </div>
      ),
    },
  ]

  const onSearch = value =>
    getListRole({
      PageSize: 50,
      CurrentPage: 1,
      TextSearch: value,
    })

  return (
    <RoleStyled>
      <Row className="box-action" gutter={16}>
        <Col span={18}>
          <FlInput
            search="true"
            allowClear
            label="Tên nhóm quyền"
            enterButton
            value={TextSearch}
            onChange={val => setTextSearch(val.target.value)}
            onSearch={onSearch}
          />
        </Col>
        <Col span={6}>
          <FlSelect
            style={{ width: "100%" }}
            onChange={status => setStatus(status)}
            value={status}
            maxTagCount="responsive"
            label="Trạng thái"
          >
            <Select.Option value={1} key={1}>
              Đang hoạt động
            </Select.Option>
            <Select.Option value={0} key={0}>
              Không hoạt động
            </Select.Option>
          </FlSelect>
        </Col>
      </Row>

      <Divider />
      <div className="title-type-1  d-flex justify-content-space-between align-items-center">
        <span className="fs-24">Phân quyền</span>{" "}
        <Button
          btnType="primary"
          iconName="add"
          className="btn-hover-shadow"
          onClick={() => setOpenModalEdit(true)}
        >
          Thêm nhóm quyền
        </Button>
      </div>

      <TableCustom
        isPrimary
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        sticky={{ offsetHeader: 52 }}
        scroll={{ x: "800px" }}
        pagination={{
          hideOnSinglePage: total <= 10,
          current: pagination.CurrentPage,
          PageSize: pagination.PageSize,
          responsive: true,
          total,
          locale: { items_per_page: "" },
          showSizeChanger: total > 10,
          onChange: (page, PageSize) => {
            setPagination({
              ...pagination,
              CurrentPage: page,
              PageSize,
            })
            getListRole({ ...pagination, CurrentPage: page, PageSize })
          },
        }}
        showPagination
        rowKey={record => `${record?.roleId}${record?.LastUpdate}`}
        footerLeft={<div className="d-flex mt-20" />}
        widthScroll={1200}
        textEmpty="Không có Nhóm quyền nào!"
      />

      {openDeleteModal && (
        <Delete
          isOpen={!!openDeleteModal}
          content={{
            title: (
              <div className="fw-600 text-center" style={{ fontSize: 16 }}>
                Bạn có chắc chắn muốn xóa nhóm quyền "
                <b>{infoDelete?.RoleName}</b>" không?
              </div>
            ),
          }}
          onOk={() => {
            deleteRole()
            setOpenDeleteModal(false)
          }}
          onCancel={() => setOpenDeleteModal(false)}
        />
      )}

      {openModalEdit && (
        <ModalRoleGroupForm
          isEditRole={isEditRole}
          visible={openModalEdit}
          dataInfo={dataInfo}
          onOk={() => {
            getListRole()
            setDataInfo({})
            setOpenModalEdit(false)
          }}
          onCancel={() => {
            // CB1({
            //   title: ` Dữ liệu chưa được lưu. Bạn có chắc vẫn muốn thoát không?`,
            //   icon: "warning-usb",
            //   okText: "Đồng ý",
            //   onOk: async close => {
            //     setDataInfo({})
            //     setOpenModalEdit(false)
            //     close()
            //   },
            // })
            setDataInfo({})
            setOpenModalEdit(false)
          }}
        />
      )}
    </RoleStyled>
  )
}
export default Role
