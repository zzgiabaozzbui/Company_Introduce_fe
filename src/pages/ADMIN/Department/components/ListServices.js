import { Row, Space, Spin } from "antd"
import { useEffect, useState } from "react"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import FlInput from "src/components/FloatingLabel/Input"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import { DEFAULT_PAGE_SIZE } from "src/constants/pageSizeOptions"
import { renderButtonCircle } from "src/lib/utils"
import PositionService from "src/services/PositionService"
import { TableUserDirectoryWrapper } from "../styled"
import AddService from "./modal/AddService"

const ListServices = () => {
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [dataInfo, setDataInfo] = useState(undefined)
  const [listPos, setListPos] = useState()
  const [conditionSearch, setConditionSearch] = useState({
    TextSearch: "",
    PageSize: DEFAULT_PAGE_SIZE,
    CurrentPage: 1,
  })
  const TYPE = { 1: "Chức danh", 2: "Chức vụ" }
  const columns = [
    {
      title: "STT",
      key: "index",
      width: 60,

      render: (text, row, idx) => (
        <div className="text-center">
          {idx +
            1 +
            conditionSearch.PageSize * (conditionSearch.CurrentPage - 1)}
        </div>
      ),
    },
    {
      title: "Tên chức danh",
      dataIndex: "PositionName",
    },
    {
      title: "Loại",
      dataIndex: "Type",
      width: 140,
      align: "center",
      render: value => TYPE[value],
    },
    {
      title: "Ghi chú",
      dataIndex: "Note",
      render: (value, record) => (
        <div>
          <div>{value}</div>
          <FloatActionWrapper size="small" className="float-action__wrapper">
            {renderButtonCircle(
              "Chỉnh sửa",
              "edit",
              () => {
                setDataInfo(record)
                setIsVisible(true)
              },
              true,
            )}
            {renderButtonCircle(
              "Xoá",
              "bin",
              () => {
                CB1({
                  title: `Bạn có chắc chắn muốn xoá chức danh này không?`,
                  icon: "warning-usb",
                  okText: "Đồng ý",
                  onOk: async close => {
                    setLoading(true)
                    PositionService.deletePos(record?.PositionID)
                      .then(res => {
                        if (res.isOk) {
                          Notice({
                            msg: "Xoá chức vụ thành công.",
                            isSuccess: true,
                          })
                          getListPos(conditionSearch)
                        }
                      })
                      .finally(() => {
                        setLoading(false)
                      })
                    close()
                  },
                })
              },
              true,
            )}
          </FloatActionWrapper>
        </div>
      ),
    },
  ]

  const getListPos = body => {
    setLoading(true)
    setConditionSearch(body)
    PositionService.getListPosition(body)
      .then(res => {
        if (res.isOk) setListPos(res.Object)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    getListPos(conditionSearch)
  }, [])

  return (
    <TableUserDirectoryWrapper>
      <Spin spinning={loading}>
        <Row className="title-type-1 justify-content-space-between align-items-center pb-16 pt-0 mb-16">
          <div style={{ fontSize: 24 }}>
            Danh sách chức vụ ({listPos?.total || 0}) :
          </div>
          <Space size={24}>
            <FlInput
              search
              allowClear
              label="Tìm kiếm"
              onSearch={value => {
                getListPos({
                  ...conditionSearch,
                  TextSearch: value,
                })
              }}
              style={{ width: 400 }}
            />
            <Button
              btnType="primary"
              className="btn-hover-shadow"
              onClick={() => {
                setIsVisible(true)
              }}
            >
              Thêm chức vụ
            </Button>
          </Space>
        </Row>
        <TableCustom
          columns={columns}
          isPrimary
          dataSource={listPos?.data}
          rowKey="PositionID"
          sticky={{ offsetHeader: 85 }}
          scroll={{ x: "800px" }}
          pagination={{
            hideOnSinglePage: listPos?.total <= 10,
            current: conditionSearch.CurrentPage,
            pageSize: conditionSearch.PageSize,
            responsive: true,
            total: listPos?.total,
            locale: { items_per_page: "" },
            showSizeChanger: listPos?.total > 10,
            onChange: (page, pageSize) => {
              getListPos({
                ...conditionSearch,
                CurrentPage: page,
                PageSize: pageSize,
              })
            },
          }}
        />
        {isVisible && (
          <AddService
            visible={isVisible}
            dataInfo={dataInfo}
            onCancel={() => {
              setIsVisible(false)
              setDataInfo(undefined)
            }}
            onOk={() => {
              setIsVisible(false)
              setDataInfo(undefined)
              getListPos(conditionSearch)
            }}
          />
        )}
      </Spin>
    </TableUserDirectoryWrapper>
  )
}
export default ListServices
