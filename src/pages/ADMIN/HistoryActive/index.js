import { useState } from "react"
import TableCustom from "src/components/Table/CustomTable"
import ActivityApi from "src/services/Activity"
import { ActivityPageStyle } from "./styled"
import { Space, Tooltip } from "antd"
import FlInput from "src/components/FloatingLabel/Input"
import FlDatePicker from "src/components/FloatingLabel/DatePicker"
import Button from "src/components/MyButton/Button"
import moment from "moment"
import { useEffect } from "react"
import { saveAs } from "file-saver"

const ActivityLog = () => {
  const [listData, setListData] = useState()
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    UserName: "",
    FromDate: "",
    ToDate: "",
    PageSize: 20,
    CurrentPage: 1,
  })
  const getList = () => {
    setLoading(true)
    ActivityApi.getList({
      ...pagination,
    })
      .then(res => {
        if (res?.isError) return
        setListData(res?.Object)
      })
      .finally(() => setLoading(false))
  }
  const exportList = () => {
    setLoading(true)
    ActivityApi.exportList({
      ...pagination,
    })
      .then(res => {
        if (res?.isError) return
        saveAs(res, "Lich_su_hoat_dong.xlsx")
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getList()
  }, [pagination])

  const column = [
    {
      title: "STT",
      dataIndex: "id",
      key: `id`,
      width: 60,
      render: (val, record, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        </div>
      ),
      align: "center",
    },
    {
      title: `Người dùng`,
      dataIndex: "UserName",
      key: `UserName`,
      width: 240,
      align: "center",
    },
    {
      title: `Hành động`,
      dataIndex: "Content",
      key: `Content`,
    },
    {
      title: `Thời gian`,
      dataIndex: "CreateDate",
      key: `CreateDate`,
      width: 200,
      align: "center",
      render: (val, record) => (
        <Tooltip
          title={moment(val).format("DD/MM/YYYY HH:mm:ss")}
          mouseLeaveDelay={0}
        >
          {moment(val).format("DD/MM/YYYY HH:mm:ss")}
        </Tooltip>
      ),
    },
  ]

  return (
    <ActivityPageStyle>
      <div className="title-type-1 d-flex justify-content-space-between pb-8 mb-20 ">
        <>Lịch sử hoạt động</>
        <div>
          <Space size={16}>
            <FlInput
              search
              style={{ width: 350 }}
              label="Tên người dùng"
              onSearch={text =>
                setPagination({ ...pagination, UserName: text })
              }
            />
            <FlDatePicker
              label={["Từ ngày", "Đến ngày"]}
              ranger
              onChange={data =>
                setPagination({
                  ...pagination,
                  FormDate: data ? moment(data[0]).format() : "",
                  ToDate: data ? moment(data[1]).format() : "",
                })
              }
            />
            {listData?.ButtonShow?.IsExport && (
              <Button btnType="primary" onClick={exportList}>
                Xuất Excel
              </Button>
            )}
          </Space>
        </div>
      </div>
      <TableCustom
        isPrimary
        columns={column}
        dataSource={listData?.Data}
        loading={loading}
        sticky={{ offsetHeader: 52 }}
        pagination={{
          hideOnSinglePage: listData?.Total <= 10,
          current: pagination.CurrentPage,
          PageSize: pagination.PageSize,
          responsive: true,
          total: listData?.Total,
          locale: { items_per_page: "" },
          showSizeChanger: listData?.Total > 10,
          onChange: (CurrentPage, PageSize) => {
            setPagination({
              ...pagination,
              CurrentPage,
              PageSize,
            })
          },
        }}
        showPagination
        rowKey={"CreateDate"}
        footerLeft={<div className="d-flex mt-20" />}
        widthScroll={1200}
        textEmpty="Không có dữ liệu!"
      />
    </ActivityPageStyle>
  )
}

export default ActivityLog
