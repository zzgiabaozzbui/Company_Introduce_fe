import { DeleteOutlined } from "@ant-design/icons"
import { Col, Form, Input, Row, Space, Modal } from "antd"
import React, { useEffect, useState } from "react"
import FlInput from "src/components/FloatingLabel/Input"
import CB1 from "src/components/Modal/CB1"
import Button from "src/components/MyButton/Button"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import TableCustom from "src/components/Table/CustomTable"
import TagsService from "src/services/TagsService"
import { TagsStyled } from "./styled"

const Tags = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const [dataEdit, setDataEdit] = useState()
  const [total, setTotal] = useState()
  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    PageSize: 20,
    TextSearch: "",
  })

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 100,
      render: (val, record, idx) => (
        <div className="text-center">
          {idx + 1 + pagination.PageSize * (pagination.CurrentPage - 1)}
        </div>
      ),
      align: "center",
    },
    {
      title: "Tên thẻ",
      dataIndex: "TagsName",
      key: "TagsName",
    },
    {
      title: "Mô tả",
      dataIndex: "Note",
      key: "Note",
    },
  ]

  useEffect(() => {
    getListTags()
  }, [pagination])

  const getListTags = async () => {
    try {
      setLoading(true)
      const res = await TagsService.getListTags({ ...pagination })
      setDataSource(res?.Object?.Data)
      setTotal(res?.Object?.Total)
    } finally {
      setLoading(false)
    }
  }

  const insertTag = async () => {
    try {
      const values = await form?.validateFields()
      const res = await TagsService[dataEdit ? "updateTags" : "insertTags"]({
        ...values,
        TagsID: dataEdit?.TagsID,
      })
      if (res?.isError) return
      Notice({ msg: `${dataEdit ? "Cập nhật" : "Thêm"} thẻ thành công !` })
      getListTags()
      form.resetFields()
      setDataEdit(undefined)
    } finally {
    }
  }
  const onDelete = async TagsID => {
    try {
      const res = await TagsService.deleteTags(TagsID)
      if (res?.isError) return
      Notice({ msg: `Xoá thẻ thành công !` })
      getListTags()
      form.resetFields()
      setDataEdit(undefined)
    } finally {
    }
  }
  return (
    <TagsStyled>
      <Row gutter={[16, 16]}>
        <Col style={{ width: "calc(100% - 400px)" }}>
          <div className="tags-search">
            <FlInput
              search="true"
              allowClear
              label="Nhập tên thẻ"
              onSearch={TextSearch =>
                setPagination(pre => ({ ...pre, TextSearch }))
              }
            />
          </div>
          <div className="title-type-1">Danh sách thẻ</div>

          <TableCustom
            dataSource={dataSource}
            isPrimary
            columns={columns}
            loading={loading}
            sticky={{ offsetHeader: 85 }}
            rowKey="TagsID"
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  setDataEdit(record)
                  form.setFieldsValue({ ...record })
                },
              }
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
          />
        </Col>

        <Col style={{ width: 400 }} className="form-insert">
          <div className="d-flex justify-content-space-between align-items-center">
            <div className="fs-16 fw-600">
              {!dataEdit ? "Thêm thẻ" : "Cập nhật thẻ"}
            </div>
            {!!dataEdit && (
              <Space>
                <ButtonCircle
                  iconName="add-blue"
                  onClick={() => {
                    form.resetFields()
                    setDataEdit(undefined)
                  }}
                />
                <ButtonCircle
                  iconName="bin"
                  onClick={() =>
                    CB1({
                      title: `Bạn có chắc chắn muốn xoá thẻ này không?`,
                      icon: "warning-usb",
                      okText: "Đồng ý",
                      onOk: async close => {
                        onDelete(dataEdit?.TagsID)
                        close()
                      },
                    })
                  }
                />
              </Space>
            )}
          </div>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Tên thẻ"
              required
              className="mt-24"
              name="TagsName"
              rules={[
                { required: true, message: "Thông tin không được để trống" },
              ]}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>

            <Form.Item label="Mô tả" name="Note" className="mt-16">
              <Input.TextArea
                style={{ minHeight: 120 }}
                placeholder="Nhập mô tả"
              />
            </Form.Item>
          </Form>
          <div className="d-flex justify-content-flex-end mt-24">
            <Button
              btnType="primary"
              className="btn-hover-shadow"
              onClick={insertTag}
            >
              Ghi lại
            </Button>
          </div>
        </Col>
      </Row>
    </TagsStyled>
  )
}

export default Tags
