import moment from "moment"
import React from "react"
import { useState } from "react"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import CustomModal from "src/components/Modal/CustomModal"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import TableCustom from "src/components/Table/CustomTable"
import PostService from "src/services/PostService"
import { SearchStyled } from "../styled"
import { Col, DatePicker, Form, Row, Select } from "antd"
import { useSelector } from "react-redux"
import { getListComboByKey } from "src/lib/utils"
import { SYSTEM_KEY } from "src/constants/constants"
import FlSelect from "src/components/FloatingLabel/Select"
import { useEffect } from "react"
import SvgIcon from "src/components/SvgIcon"
import FlInput from "src/components/FloatingLabel/Input"
import DetailHistoryModal from "./DetailHistoryModal"
import Notice from "src/components/Notice"
import CB1 from "src/components/Modal/CB1"
const { RangePicker } = DatePicker

const HistoryModal = ({ open, onCancel }) => {
  const [listHistory, setListHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDetailHistoryModal, setOpenDetailHistoryModal] = useState(false)
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [total, setTotal] = useState()
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 20,
    Status: 0,
  })
  const [TextSearch, setTextSearch] = useState("")
  const columns = [
    {
      title: "STT",
      dataIndex: "Index",
      key: "Index",
      width: 70,
      align: "center",
      render: (val, record, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        </div>
      ),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "CreateDate",
      key: "CreateDate",
      align: "center",
      width: 150,
      render: text => text && moment(text).format("DD/MM/YYYY"),
    },
    {
      title: "Người cập nhật",
      dataIndex: "FullName",
      key: "FullName",
      align: "center",
    },
    {
      title: "Phiên bản",
      dataIndex: "Version",
      key: "Version",
      with: 100,
      align: "center",
    },
    {
      title: "Hoạt động",
      dataIndex: "Status",
      key: "Status",
      with: 100,
      align: "center",
    },
    {
      title: "	Tin gốc",
      dataIndex: "IsOrigin",
      key: "IsOrigin",
      with: 100,
      render: (text, record) => {
        return (
          <div className="d-flex justify-content-space-between align-items-center ">
            {/* <div className="text-ellipsis fw-600">{""}</div> */}
            {/* <div className="list-button-hover">{renderListButton(record)}</div> */}
            <div className="d-flex-center w-100">
              {!!text ? <SvgIcon name="checks" /> : <SvgIcon name="cancel" />}
            </div>

            <FloatActionWrapper size="small" className="float-action__wrapper">
              {/* {!!record?.IsViewHistory && ( */}
              <ButtonCircle
                title="Khôi phục"
                iconName="refresh"
                style={{
                  background: "#DDFEF0",
                  boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                }}
                onClick={() => {
                  CB1({
                    title:
                      "Bạn có chắc chắn muốn khôi phục bài viết này không?",
                    icon: "trashRed",
                    okText: "Đồng ý",
                    onOk: async close => {
                      reset(record?.Version, record?.PostID)
                      close()
                    },
                  })
                }}
              />
              {/* )} */}
              {/* {!!record?.IsBrowse && ( */}
              <ButtonCircle
                title="Xem chi tiết"
                iconName="eye_orange"
                style={{
                  background: "#FFFDE7",
                  boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                }}
                onClick={() => {
                  setOpenDetailHistoryModal(record)
                }}
              />
              {/* )} */}
            </FloatActionWrapper>
          </div>
        )
      },
    },

    // {
    //   title: "Trạng thái",
    //   dataIndex: "Status",
    //   key: "Status",
    //   width: 120,
    //   render: (text, record) => {
    //     return (
    //       <div className="d-flex justify-content-space-between align-items-center mh-36">
    //         <div className="text-ellipsis fw-600">{""}</div>
    //         {/* <div className="list-button-hover">{renderListButton(record)}</div> */}

    //         <FloatActionWrapper size="small" className="float-action__wrapper">
    //           {!!record?.IsBrowse && (
    //             <ButtonCircle
    //               title="Duyệt"
    //               iconName="check-circle"
    //               style={{
    //                 background: "#EDF6FC",
    //                 boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
    //               }}
    //               onClick={() => {}}
    //             />
    //           )}

    //           {!!record?.IsViewHistory && (
    //             <ButtonCircle
    //               title="Xem lịch sử"
    //               iconName="history"
    //               style={{
    //                 background: "#FFFDE7",
    //                 boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
    //               }}
    //               onClick={() => {}}
    //             />
    //           )}
    //         </FloatActionWrapper>
    //       </div>
    //     )
    //   },
    // },
  ]
  const [form] = Form.useForm()
  useEffect(() => {
    getListHistory()
  }, [pagination])
  const getListHistory = async () => {
    try {
      setLoading(true)
      const res = await PostService.getListHistory({
        ...pagination,
        TextSearch,
        PostID: open?.PostID,
      })
      if (!!res?.isError) return
      setListHistory(res?.Object?.data)
      setTotal(res?.Object?.total)
      // res?.Object?.Data?.map(item => {
      //   let key = item?.PostID
      //   form.setFieldsValue({
      //     [key]: item?.SortOrder,
      //   })
      // })
    } finally {
      setLoading(false)
    }
  }
  const reset = async (Version, PostID) => {
    try {
      setLoading(true)
      const reshis = await PostService.getDetailHistory({
        Version: Version.split(".")[0],
        PostID: PostID,
      })
      const res = await PostService.updatePost({
        ...reshis?.Object,
      })
      if (!!res?.isError) return

      Notice({
        isSuccess: true,
        msg: "Cập nhật thành công!",
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <CustomModal
      title={"Lịch sử"}
      footer={null}
      width={"80%"}
      open={!!open}
      onCancel={onCancel}
    >
      <SearchStyled>
        <Row gutter={[16, 16]}>
          {/* <Col flex="auto">
            <FlInput
              search
              allowClear
              label="Nhập tiêu đề bài viết"
              onChange={e => setTextSearch(e?.target?.value)}
              onSearch={() =>
                setPagination(pre => ({ ...pre, CurrentPage: 1 }))
              }
            />
          </Col> */}
          <Col lg={7} xs={24}>
            <RangePicker
              placeholder={["Từ ngày", "Đến ngày"]}
              format="DD/MM/YYYY"
            />
          </Col>
          {/* <Col lg={5} xs={24}>
            <FlSelect
              label="Trạng thái"
              allowClear
              onChange={Status =>
                setPagination(pre => ({ ...pre, CurrentPage: 1, Status }))
              }
            >
              <Select.Option key={"allStarusTopic"} value={0}>
                Tất cả
              </Select.Option>
              {getListComboByKey(SYSTEM_KEY?.POST_STATUS, listSystemKey)?.map(
                i => (
                  <Select.Option key={+i.CodeValue} value={+i.CodeValue}>
                    {i?.Description}
                  </Select.Option>
                ),
              )}
            </FlSelect>
          </Col> */}
        </Row>
      </SearchStyled>

      <TableCustom
        isPrimary
        loading={loading}
        dataSource={listHistory}
        columns={columns}
        textEmpty="Không có bài viết"
        sticky={{ offsetHeader: -22 }}
        pagination={{
          hideOnSinglePage: total <= 10,
          current: pagination.CurrentPage,
          pageSize: pagination.PageSize,
          responsive: true,
          total,
          locale: { items_per_page: "" },
          showSizeChanger: total > 10,
          onChange: (page, pageSize) => {
            setPagination({
              ...pagination,
              CurrentPage: page,
              PageSize: pageSize,
            })
          },
        }}
        rowKey="PostID"
        scroll={{ x: "700px" }}
      />
      {!!openDetailHistoryModal && (
        <DetailHistoryModal
          open={openDetailHistoryModal}
          onCancel={() => {
            setOpenDetailHistoryModal(false)
          }}
        />
      )}
    </CustomModal>
  )
}

export default HistoryModal
