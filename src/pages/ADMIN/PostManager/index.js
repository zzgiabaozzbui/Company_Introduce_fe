import { Affix, Col, Form, InputNumber, Row, Tooltip } from "antd"
import { saveAs } from "file-saver"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import SplitPane, { Pane } from "split-pane-react"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import SvgIcon from "src/components/SvgIcon"
import TableCustom from "src/components/Table/CustomTable"
import { STATUS_POST, SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import PostService from "src/services/PostService"
import Search from "./components/Search"
import TreeCategory from "./components/TreeCategory"
import HistoryModal from "./modal/HistoryModal"
import InsertUpdatePostModal from "./modal/InsertUpdatePostModal"
import TreeCategoryModal from "./modal/TreeCategoryModal"
import { PostManagerStyled } from "./styled"

const PostManager = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [openTreeCategoryModal, setOpenTreeCategoryModal] = useState(false)
  const [openHistoryModal, setOpenHistoryModal] = useState(false)
  const [reload, setReload] = useState(["a"])
  const [openInsertUpdatePostModal, setOpenInsertUpdatePostModal] =
    useState(false)
  const [listPost, setListPost] = useState([])
  const [btn, setbtn] = useState([])
  const [selectedNode, setSelectedNote] = useState()
  const [total, setTotal] = useState()
  const [total1, setTotal1] = useState()
  const [rowSelected, setRowSelected] = useState([])
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 20,
    Status: 0,
  })
  const [TextSearch, setTextSearch] = useState("")
  const [sizes, setSizes] = useState([300, "auto"])
  const { listSystemKey } = useSelector(state => state.appGlobal)
  // const color = ["#FF720D", "#0D99FF", "#FF4648"]
  const listStatus = getListComboByKey(SYSTEM_KEY?.POST_STATUS, listSystemKey)
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
      title: "Tiêu đề bài viết",
      dataIndex: "Title",
      key: "Title",
      render: (val, record, idx) => <div className="max-line3">{val}</div>,
    },
    {
      title: "Thứ tự",
      dataIndex: "order",
      key: "order",
      align: "center",
      width: 100,
      render: (text, record) => (
        <div
          className="d-flex-center"
          style={{ height: "100%" }}
          onClick={e => {
            e?.stopPropagation()
          }}
        >
          <Form.Item name={record?.PostID} className="m-0">
            <InputNumber defaultValue={record?.SortOrder} />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "NumberOfViewers",
      key: "NumberOfViewers",
      align: "center",
      width: 90,
    },
    {
      title: "Ngày đăng",
      dataIndex: "PublishDate",
      key: "PublishDate",
      align: "center",
      width: 120,
      render: text => text && moment(text).format("DD/MM/YYYY"),
    },

    {
      title: "Trạng thái",
      dataIndex: "Status",
      key: "Status",
      align: "center",
      width: 120,
      render: (text, record) => {
        const status = listStatus?.find(i => i?.CodeValue === text)
        return (
          <div className="d-flex justify-content-space-between w-100 align-items-center mh-36">
            <div
              className="text-ellipsis text-center w-100 fw-600"
              style={{ color: STATUS_POST[text] }}
            >
              {status?.Description}
            </div>
            {/* <div className="list-button-hover">{renderListButton(record)}</div> */}

            <FloatActionWrapper size="small" className="float-action__wrapper">
              {!!record?.IsBrowse && (
                <ButtonCircle
                  title="Duyệt"
                  iconName="check-circle"
                  style={{
                    background: "#EDF6FC",
                    boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                  }}
                  onClick={() => {
                    updateStatus({
                      PostID: record?.PostID,
                      Type: 1,
                      Status: record?.Status,
                    })
                  }}
                />
              )}
              {!!record?.IsNoBrowse && (
                <ButtonCircle
                  title="Không duyệt"
                  iconName="cancel"
                  style={{
                    background: "#FFE9EC",
                    boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                  }}
                  onClick={() => {
                    updateStatus({
                      PostID: record?.PostID,
                      Type: 2,
                      Status: record?.Status,
                    })
                  }}
                />
              )}

              {!!record?.IsUpdate && (
                <ButtonCircle
                  title="Sửa"
                  iconName="edit-green"
                  style={{
                    background: "#DDFEF0",
                    boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                  }}
                  onClick={() => {
                    setOpenInsertUpdatePostModal(record)
                  }}
                />
              )}

              {!!record?.IsRemove && (
                <ButtonCircle
                  title="Xoá"
                  iconName="delete-outline"
                  style={{
                    background: "#FFE9EC",
                    boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                  }}
                  onClick={() =>
                    CB1({
                      title: ` Bạn có chắc chắn muốn xoá bài viết
                    <strong> ${record?.Title}</strong> không?`,
                      icon: "trashRed",
                      okText: "Đồng ý",
                      onOk: async close => {
                        deletePost(record?.PostID)
                        close()
                      },
                    })
                  }
                />
              )}

              {!!record?.IsViewHistory && (
                <ButtonCircle
                  title="Xem lịch sử"
                  iconName="history"
                  style={{
                    background: "#FFFDE7",
                    boxShadow: "0px 2px 4px rgba(208, 206, 187, 0.5)",
                  }}
                  onClick={() => {
                    setOpenHistoryModal(record)
                  }}
                />
              )}
            </FloatActionWrapper>
          </div>
        )
      },
    },
  ]

  useEffect(() => {
    if (selectedNode?.key) getListPost()
  }, [selectedNode, pagination])
  const getListPost = async () => {
    try {
      setLoading(true)
      const res = await PostService.getListPost({
        ...pagination,
        TextSearch,
        CategoryPostID: selectedNode?.key,
      })
      setListPost(res?.Object?.Data)
      setbtn(res?.Object?.ButtonShow)
      setTotal(res?.Object?.Total)
      res?.Object?.Data?.map(item => {
        let key = item?.PostID
        form.setFieldsValue({
          [key]: item?.SortOrder,
        })
      })
    } finally {
      setLoading(false)
    }
  }
  const deletePost = async PostId => {
    try {
      setLoading(true)
      const res = await PostService.deletePost(PostId)
      if (res.isError) return
      Notice({
        msg: "Xóa bài viết thành công !",
        isSuccess: true,
      })
      getListPost()
    } finally {
      setLoading(false)
    }
  }
  const exportPost = async ListPostID => {
    try {
      setLoading(true)
      const obj = ListPostID?.length ? ListPostID?.join() : ""
      const res = await PostService.exportPost({
        ListPostID: obj,
        ...pagination,
        TextSearch,
        CategoryPostID: selectedNode?.key,
      })
      saveAs(res, "Danh sách.xlsx")
    } finally {
      setLoading(false)
    }
  }
  const updateStatus = async body => {
    try {
      setLoading(true)
      const res = await PostService.updateStatusPost(body)
      if (res.isError) return
      Notice({
        msg: "Cập nhật thành công !",
        isSuccess: true,
      })
      getListPost()
    } finally {
      setLoading(false)
    }
  }
  const [form] = Form.useForm()
  const updatePosition = async () => {
    try {
      setLoading(true)
      const values = await form.getFieldsValue()

      //Lọc object khác nhau để đổi thứ tự
      let object = []
      Object.keys(values).forEach(key => {
        if (
          listPost?.find((item, idx) => item?.PostID === key)?.SortOrder !==
          +values[key]
        )
          object.push({
            PostID: key,
            SortOrder: +values[key],
          })
      })

      const res = await PostService.sortPost(object)
      if (res.isError) return
      Notice({
        msg: "Cập nhật thành công!",
        isSuccess: true,
      })
      getListPost()
    } finally {
      setLoading(false)
    }
  }
  const rowSelection = {
    preserveSelectedRowKeys: true,
    selectedRowKeys: rowSelected?.map(i => i?.PostID),
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRows?.find(item => item?.PostID === selectedRowKeys))
        setRowSelected(
          selectedRows?.filter(item => item?.PostID !== selectedRowKeys),
        )
      else setRowSelected(selectedRows)
    },
    // getCheckboxProps: record => ({
    //   disabled: record.Status !== 2,
    // }),
  }
  const onClickRow = record => {
    if (rowSelected?.find(item => item?.PostID === record?.PostID))
      setRowSelected(
        rowSelected?.filter(item => item?.PostID !== record?.PostID),
      )
    else setRowSelected(prev => [...prev, record])
  }
  return (
    <PostManagerStyled>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Search
            pagination={pagination}
            setTextSearch={setTextSearch}
            setPagination={setPagination}
            onAdd={() => setOpenInsertUpdatePostModal(true)}
          />
        </Col>
      </Row>
      <SplitPane split="vertical" sizes={sizes} onChange={e => setSizes(e)}>
        <Pane minSize={300} maxSize="50%">
          <div className="title-type-2 d-flex-start">
            Danh mục: ({total1 ? total1 : 0})
            <Tooltip title="Cài đặt danh mục">
              <div
                className="pointer"
                onClick={() => setOpenTreeCategoryModal(true)}
              >
                <SvgIcon className="ml-10" name="config" />
              </div>
            </Tooltip>
          </div>
          <Affix offsetTop={45}>
            <TreeCategory
              selectedNode={selectedNode}
              setSelectedNote={setSelectedNote}
              reload={reload}
              setTotal1={value => setTotal1(value)}
            />
          </Affix>
        </Pane>
        <Pane>
          <div className="title-type-2 d-flex-sb">
            <div>Danh sách bài viết ({total ? total : 0}) </div>
            <div className="d-flex-end">
              {!!btn?.IsInsert && (
                <Button
                  btnType="primary"
                  className="btn-hover-shadow mr-10"
                  onClick={() => setOpenInsertUpdatePostModal(true)}
                >
                  Thêm bài viết
                </Button>
              )}
              {!!btn?.IsUpdate && (
                <Button
                  btnType="primary"
                  className="btn-hover-shadow mr-10"
                  onClick={() => updatePosition()}
                >
                  Cập nhật vị trí
                </Button>
              )}
              {!!btn?.IsExport && (
                <Button
                  btnType="primary"
                  className="btn-hover-shadow mr-10"
                  onClick={() =>
                    exportPost(rowSelected?.map((item, idx) => item?.PostID))
                  }
                >
                  Xuất excel
                </Button>
              )}
            </div>
          </div>
          <Form form={form} className="mt-8">
            <TableCustom
              isPrimary
              dataSource={listPost}
              columns={columns}
              loading={loading}
              textEmpty="Không có bài viết"
              sticky={{ offsetHeader: 52 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: event => {
                    onClickRow(record)
                  },
                }
              }}
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
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
              scroll={{ x: "700px", y: "calc(100vh - 235px)" }}
            />
          </Form>
        </Pane>
      </SplitPane>
      {!!openInsertUpdatePostModal && (
        <InsertUpdatePostModal
          open={openInsertUpdatePostModal}
          onCancel={() => {
            setOpenInsertUpdatePostModal(false)
          }}
          onOk={() => {
            getListPost()
          }}
          selectedNode={selectedNode}
          PostID={openInsertUpdatePostModal?.PostID}
        />
      )}
      {!!openHistoryModal && (
        <HistoryModal
          open={openHistoryModal}
          onCancel={() => {
            setOpenHistoryModal(false)
            getListPost()
          }}
        />
      )}
      {!!openTreeCategoryModal && (
        <TreeCategoryModal
          openModal={openTreeCategoryModal}
          onCancel={() => {
            setOpenTreeCategoryModal(false)
          }}
          setReload={setReload}
        />
      )}
    </PostManagerStyled>
  )
}

export default PostManager
