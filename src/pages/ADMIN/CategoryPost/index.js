import { InputNumber, Space } from "antd"
import { useEffect, useState } from "react"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import Delete from "src/components/Modal/Delete"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { COLOR_STATUS } from "src/constants/constants"
import { renderButtonCircle } from "src/lib/utils"
import CategoryPostApi from "src/services/categoryPost"
import { CategoryPostStyle } from "./styled"
import ModalAddCategory from "./components/ModalAddCategory"

const listTitle = [
  {},
  "nhóm tin bài",
  "loại văn bản",
  "lĩnh vực",
  "loại tài liệu",
  "cơ quan ban hành",
  "nhóm hình ảnh",
]
const listApi = [
  {},
  "getListPostGroup",
  "getListDocumentType",
  "getListField",
  "getListFile",
  "getListAgencyIssued",
  "getListImg",
]
const CategoryPost = ({ type }) => {
  const [listData, setListData] = useState([])
  const [total, setTotal] = useState(0)
  const [buttonShow, setButtonShow] = useState({})
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isEdit, setIsEdit] = useState(undefined)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalDeleteMultiple, setOpenModalDeleteMultiple] = useState(false)
  const [pagination, setPagination] = useState({})
  const [listSelect, setListSelect] = useState([])

  useEffect(() => {
    setPagination({
      PageSize: 20,
      CurrentPage: 1,
    })
  }, [type])
  useEffect(() => {
    if (pagination?.PageSize) {
      getList()
    }
  }, [pagination])
  const getList = () => {
    setLoading(true)
    CategoryPostApi[listApi[type]]()
      .then(res => {
        if (res.isError) return
        setListData(res?.Object?.data)
        setTotal(res?.Object?.total)
        setButtonShow(res?.Object?.ButtonShow)
      })
      .finally(() => setLoading(false))
  }
  const deleteCategory = listID => {
    CategoryPostApi.deleteCategory(listID).then(res => {
      if (res?.isError) return
      getList()
      Notice({
        isSuccess: true,
        msg: "Xóa thành công!",
      })
    })
  }
  const updateOrders = () => {
    let listOrders = listData.map(data => ({
      CategoryPostID: data?.CategoryPostID,
      NumericalOrder: data?.NumericalOrder,
    }))
    CategoryPostApi.updateSortOrder(listOrders).then(res => {
      if (res?.isError) return
      getList()
      Notice({
        isSuccess: true,
        msg: "Cập nhật vị trí thành công!",
      })
    })
  }
  const changeValueTable = (idx, object) =>
    setListData(pre =>
      pre?.map((i, index) => {
        if (idx !== index) return i
        return { ...i, ...object }
      }),
    )

  const column = [
    {
      title: `Tên ${listTitle[type]}`,
      dataIndex: "CategoryPostName",
      key: `CategoryPostName${type}`,
    },
    {
      title: "Ngôn ngữ",
      dataIndex: "Language",
      key: `Language${type}`,
      width: 220,
      align: "center",
      render: val => (+val === 1 ? "Tiếng Việt" : "Tiếng Anh"),
    },
    {
      title: "Thứ tự",
      dataIndex: "NumericalOrder",
      key: `NumericalOrder${type}`,
      align: "center",
      width: 120,
      render: (value, record, idx) => (
        <InputNumber
          value={value}
          onChange={event =>
            changeValueTable(idx, {
              NumericalOrder: event,
            })
          }
        />
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: `Status${type}`,
      align: "center",
      width: 180,
      render: (val, record) => (
        <div>
          <div
            className="fw-700 text-center"
            style={
              val === 1
                ? { color: COLOR_STATUS.active }
                : { color: COLOR_STATUS.inactive }
            }
          >
            {val === 1 ? "Kích hoạt" : "Vô hiệu"}
          </div>
          <FloatActionWrapper size="small" className="float-action__wrapper">
            {buttonShow?.IsUpdate &&
              renderButtonCircle(
                "Chỉnh sửa",
                "edit",
                () => {
                  setIsEdit(record)
                  setOpenModal(true)
                },
                true,
              )}
            {buttonShow?.IsDelete &&
              renderButtonCircle(
                "Xoá",
                "bin",
                () => {
                  setOpenModalDelete(record)
                },
                true,
              )}
          </FloatActionWrapper>
        </div>
      ),
    },
  ]

  return (
    <CategoryPostStyle>
      <div className="title-type-1 d-flex align-items-center justify-content-space-between pt-10 pb-10 mb-20">
        <div>
          Danh sách {listTitle[type]} ({total}) :
        </div>
        <Space size={16}>
          {buttonShow?.IsInsert && (
            <Button btnType="primary" onClick={() => setOpenModal(true)}>
              Thêm {listTitle[type]}
            </Button>
          )}
          {buttonShow?.IsUpdate && (
            <Button btnType="primary" onClick={() => updateOrders()}>
              Cập nhật vị trí
            </Button>
          )}
          {buttonShow?.IsDelete && listSelect?.length > 0 && (
            <Button
              btnType="primary"
              onClick={() => setOpenModalDeleteMultiple(true)}
            >
              Xóa nhiều
            </Button>
          )}
        </Space>
      </div>
      <TableCustom
        isPrimary
        rowSelection={{
          selectedRowKeys: listSelect?.map(i => i?.CategoryPostID),
          onChange: (listKey, listItems) => {
            setListSelect(listItems)
          },
          preserveSelectedRowKeys: true,
        }}
        columns={column}
        dataSource={listData}
        loading={loading}
        sticky={{ offsetHeader: 52 }}
        pagination={{
          hideOnSinglePage: total <= 10,
          current: pagination.CurrentPage,
          PageSize: pagination.PageSize,
          responsive: true,
          total,
          locale: { items_per_page: "" },
          showSizeChanger: total > 10,
          onChange: (CurrentPage, PageSize) => {
            setPagination({
              ...pagination,
              CurrentPage,
              PageSize,
            })
          },
        }}
        showPagination
        rowKey={"CategoryPostID"}
        footerLeft={<div className="d-flex mt-20" />}
        widthScroll={1200}
        textEmpty="Không có dữ liệu!"
      />
      {openModalDelete && (
        <Delete
          isOpen={!!openModalDelete}
          content={{
            title: (
              <div className="fw-600 text-center" style={{ fontSize: 16 }}>
                Bạn có chắc chắn muốn xóa "
                <b>{openModalDelete?.CategoryPostName}</b>" không?
              </div>
            ),
          }}
          onOk={() => {
            deleteCategory([openModalDelete?.CategoryPostID])
            setOpenModalDelete(undefined)
          }}
          onCancel={() => setOpenModalDelete(undefined)}
        />
      )}
      {openModalDeleteMultiple && (
        <Delete
          isOpen={!!openModalDeleteMultiple}
          content={{
            title: (
              <div className="fw-600 text-center" style={{ fontSize: 16 }}>
                Bạn có chắc chắn muốn xóa tất cả các mục đã chọn không?
              </div>
            ),
          }}
          onOk={() => {
            deleteCategory([...listSelect?.map(i => i?.CategoryPostID)])
            setOpenModalDeleteMultiple(false)
          }}
          onCancel={() => setOpenModalDeleteMultiple(false)}
        />
      )}
      {openModal && (
        <ModalAddCategory
          open={openModal}
          onCancel={() => {
            setOpenModal(false)
            setIsEdit(undefined)
          }}
          onOk={() => {
            setOpenModal(false)
            setIsEdit(undefined)
            getList()
          }}
          type={type}
          text={listTitle[type]}
          isEdit={isEdit}
        />
      )}
    </CategoryPostStyle>
  )
}

export default CategoryPost
