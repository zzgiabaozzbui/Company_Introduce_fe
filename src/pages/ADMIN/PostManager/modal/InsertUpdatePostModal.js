import {
  Checkbox,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Image,
  Input,
  Menu,
  Row,
  Select,
  Spin,
  Tag,
  TreeSelect,
  Upload,
} from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CustomModal from "src/components/Modal/CustomModal"
import Notice from "src/components/Notice"
import SvgIcon from "src/components/SvgIcon"
import TinyEditor from "src/components/TinyEditor"
import { GUIDE_EMPTY, SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey, normFile } from "src/lib/utils"
import ROUTER from "src/router"
import FileService from "src/services/FileService"
import PostService from "src/services/PostService"
import TagsService from "src/services/TagsService"
import { ButtonUploadStyle, CreatePostStyled } from "../styled"
import Button from "src/components/MyButton/Button"
import { responsiveMap } from "antd/lib/_util/responsiveObserve"

const { TextArea } = Input
const InsertUpdatePostModal = ({
  open,
  onCancel,
  onOk,
  selectedNode,
  PostID,
}) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const navigate = useNavigate()
  const [listTag, setListTag] = useState([])
  const [tag, setTag] = useState("")
  const [loading, setLoading] = useState(true)
  const [image, setimage] = useState()
  const [allTags, setAllTags] = useState([])
  const [form] = Form.useForm()
  const [treeData, setTreeData] = useState([])
  const [fileDelete, setFileDelete] = useState([])
  const [guidPost, setGuidPost] = useState()

  useEffect(() => {
    if (selectedNode?.key !== GUIDE_EMPTY)
      form.setFieldsValue({
        CategoryPostID: selectedNode?.key,
      })
    getListCategory()
  }, [])
  useEffect(() => {
    if (PostID) getDetailPost()
  }, [PostID])

  const getDetailPost = async () => {
    try {
      setLoading(true)
      const res = await PostService.getPost({ PostID })
      if (res?.isError) return
      form.setFieldsValue({
        ...res?.Object,
        Status: res?.Object?.CodeValue ? res?.Object?.CodeValue : undefined,
        PublishDate:
          res?.Object?.PublishDate && moment(res?.Object?.PublishDate),
        file: res?.Object?.ListFile?.map(i => ({
          ...i,
          url: i?.FileUrl,
          name: i?.FileName,
        })),
      })
      if (res?.Object?.Image)
        setimage({
          ObjectFileID: res?.Object?.LogoFileID,
          FileUrl: res?.Object?.Image,
        })
      setListTag(res?.Object?.ListTags)
    } finally {
      setLoading(false)
    }
  }

  const nest = (items, id, link) =>
    items
      ?.filter(item => item[link] === id)
      .map(item => ({
        ...item,
        title: item.CategoryPostName,
        value: item.CategoryPostID,
        children: nest(items, item?.CategoryPostID, link),
      }))

  const getListCategory = async () => {
    try {
      setLoading(true)
      const resTags = await TagsService.getAllTags()
      if (!resTags?.isError) setAllTags(resTags?.Object)
      const res = await PostService.getListCategoryPost()
      if (res?.isError) return
      nest(res?.Object?.data, GUIDE_EMPTY, "ParentID")
      setTreeData(res?.Object?.data)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    try {
      setLoading(true)

      const values = await form.validateFields()
      let PostType = 1
      const category = treeData?.find(
        i => i?.CategoryPostID === values?.CategoryPostID,
      )
      if (category?.CategoryCode?.includes("MEDIA")) PostType = 2
      if (category?.CategoryCode?.includes("TAI_LIEU")) PostType = 3
      if (category?.CategoryCode?.includes("DOI_TAC")) PostType = 4

      const res = await PostService[PostID ? "updatePost" : "insertPost"]({
        ...values,
        PublishDate: !!PostID
          ? values?.PublishDate && moment(values?.PublishDate)?.format()
          : undefined,
        LogoFileID: image?.ObjectFileID,
        ListTagsInsert: listTag
          ?.filter(i => !i?.TagsID)
          ?.map(tag => ({ TagsName: tag?.TagsName })),
        ListTagsID: listTag?.filter(i => !!i?.TagsID)?.map(tag => tag?.TagsID),
        PostID: PostID || guidPost,
        PostType,
        file: undefined,
        SortOrder: values?.SortOrder ? +values?.SortOrder : undefined,
        Status: values?.Status ? values?.Status : undefined,
      })
      if (res?.isError) return
      let resUpload
      setGuidPost(res?.Object)
      const fileNew = values?.file?.filter(i => !i?.ObjectFileID)
      if (fileNew?.length || fileDelete?.length) {
        const formData = new FormData()
        formData.append("GuidID", res?.Object || PostID || guidPost)
        if (fileNew?.length)
          fileNew?.map(img =>
            formData.append("InsertFileList", img?.originFileObj),
          )
        if (fileDelete?.length)
          fileDelete?.map(i => formData.append("DeleteFileList", i))
        resUpload = await FileService.uploadFileList(formData)
      }
      if (resUpload?.isError) return
      Notice({ msg: `${PostID ? "Cập nhật" : "Thêm"} bài viết thành công !` })
      navigate(ROUTER.DANH_SACH_BAI_VIET, { state: { selectedNode } })
      onOk()
      onCancel()
    } finally {
      setLoading(false)
    }
  }
  const renderTag = () => {
    return (
      <Row gutter={[10, 10]} className="align-items-center">
        {listTag?.map((i, idx) => (
          <Col key={`create_post_tag${idx}`}>
            <Tag
              closable
              closeIcon={
                <SvgIcon
                  onClick={() =>
                    setListTag(prev =>
                      prev?.filter((_, index) => index !== idx),
                    )
                  }
                  name="close-tag"
                />
              }
            >
              {i?.TagsName}
            </Tag>
          </Col>
        ))}
        <Col flex="auto">
          <Input
            placeholder="Thêm thẻ"
            value={tag}
            className="input-tag-create-post"
            onChange={e => setTag(e?.target?.value)}
            onPressEnter={e => {
              if (!e?.target?.value) return
              setListTag(pre => [...pre, { TagsName: e?.target?.value }])
              setTag("")
            }}
          />
        </Col>
      </Row>
    )
  }

  const uploadFile = async file => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("InsertFileList", file)
      const res = await FileService.uploadFileList(formData)
      if (res?.isError) return
      setimage(res?.Object[0])
    } finally {
      setLoading(false)
    }
  }
  const uploadProps = {
    accept: "image/*",
    multiple: false,
    fileList: [],
    beforeUpload: file => {
      uploadFile(file)
      return false
    },
  }

  const menu = (
    <Menu
      items={allTags?.map(i => ({
        key: i?.TagsID,
        label: i?.TagsName,
        disabled: listTag?.find(j => i?.TagsID === j?.TagsID),
        onClick: () => setListTag(pre => [...pre, i]),
      }))}
    />
  )

  const TITLE_NOT_REQUIRE = ["DOI_TAC"]
  const IMAGE_REQUIRE = ["DOI_TAC", "NANG_LUC_VA_THANH_TUU"]
  const CONTENT_NOT_REQUIRED = [
    "DOI_TAC",
    "NANG_LUC_VA_THANH_TUU",
    "MEDIA",
    "TAI_LIEU",
  ]
  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button
        btnType="primary"
        disabled={loading}
        className="form-contact-submit"
        form="myForm"
        key="submit"
        htmlType="submit"
        onClick={onSubmit}
      >
        Đăng bài
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={!!PostID ? "Cập nhật bài viết" : "Thêm bài viết"}
      footer={renderFooter()}
      width={"90%"}
      open={!!open}
      onCancel={onCancel}
    >
      <Form
        layout="vertical"
        form={form}
        name="insertTop"
        id="myForm"
        initialValues={{ IsComment: true }}
        scrollToFirstError={{
          behavior: "smooth",
          block: "start",
          inline: "start",
        }}
      >
        <CreatePostStyled>
          <Spin spinning={loading}>
            <Row gutter={[16, 16]}>
              <Col span={14}>
                <Form.Item shouldUpdate noStyle>
                  {({ getFieldValue }) => {
                    const category = treeData?.find(
                      i =>
                        i?.CategoryPostID === getFieldValue("CategoryPostID"),
                    )
                    return (
                      <Form.Item
                        label="Tiêu đề"
                        name="Title"
                        required={
                          !TITLE_NOT_REQUIRE?.includes(category?.CategoryCode)
                        }
                        rules={[
                          {
                            required: !TITLE_NOT_REQUIRE?.includes(
                              category?.CategoryCode,
                            ),
                            message: "Thông tin không được để trống",
                          },
                        ]}
                      >
                        <Input placeholder="Nhập tiêu đề" />
                      </Form.Item>
                    )
                  }}
                </Form.Item>

                <Form.Item shouldUpdate noStyle>
                  {/* {({ getFieldValue }) => {
                    if (
                      getFieldValue("CategoryPostID") !==
                      "2d4262da-a322-4eed-8b57-07c36194ca2d"
                    )
                      return ( */}
                  <Form.Item
                    label="Tóm tắt"
                    name="Summary"
                    rules={[
                      {
                        required: true,
                        message: "Thông tin không được để trống",
                      },
                    ]}
                  >
                    <TextArea
                      placeholder="Nhập nội dung"
                      style={{ height: 115, overflow: "hidden auto" }}
                    />
                  </Form.Item>
                  {/* )
                  }} */}
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Tác giả" name="Author">
                      <Input placeholder="Nhập " />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Nhuận bút(VNĐ)" name="Royalties">
                      <Input placeholder="Nhập " />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Dropdown overlay={menu} trigger={["click"]}>
                      <Form.Item
                        label="Tags phổ biến"
                        className="create-post-add-tag"
                      >
                        <Input prefix={renderTag()} disabled />
                      </Form.Item>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
              <Col span={10}>
                <Form.Item
                  label="Danh mục"
                  name="CategoryPostID"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Thông tin không được để trống",
                    },
                  ]}
                >
                  <TreeSelect
                    placeholder="Chọn danh mục"
                    style={{ width: "100%" }}
                    treeDefaultExpandAll={true}
                    treeData={nest(treeData, GUIDE_EMPTY, "ParentID")}
                    showSearch
                    treeNodeFilterProp="title"
                  />
                </Form.Item>
                <Form.Item
                  label="Danh mục khác"
                  name="ListCategoryPostndID"
                  // rules={[
                  //   {
                  //     required: true,
                  //     message: "Thông tin không được để trống",
                  //   },
                  // ]}
                >
                  <TreeSelect
                    showSearch
                    treeNodeFilterProp="title"
                    placeholder="Chọn danh mục"
                    multiple="true"
                    treeCheckable="true"
                    maxTagCount={"responsive"}
                    style={{ width: "100%" }}
                    treeDefaultExpandAll={true}
                    treeData={nest(treeData, GUIDE_EMPTY, "ParentID")}
                  />
                </Form.Item>
                <Row gutter={16}>
                  {!!PostID && (
                    <Col span={12}>
                      <Form.Item label="Ngày đăng" name="PublishDate">
                        <DatePicker placeholder="Chọn" format="DD/MM/YYYY" />
                      </Form.Item>
                    </Col>
                  )}
                  <Col span={12}>
                    <Form.Item
                      label="Trạng thái"
                      name="Status"
                      required
                      rules={[
                        {
                          required: true,
                          message: "Thông tin không được để trống",
                        },
                      ]}
                    >
                      <Select
                        // label="Chọn trạng thái"
                        placeholder="Chọn trạng thái"
                        // onChange={Status => {
                        //   setPagination(pre => ({ ...pre, Status, CurrentPage: 1 }))
                        // }}
                        allowClear
                      >
                        {getListComboByKey(
                          SYSTEM_KEY?.POST_STATUS,
                          listSystemKey,
                        )?.map(i => (
                          <Select.Option
                            key={+i?.CodeValue}
                            value={+i?.CodeValue}
                          >
                            {i?.Description}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Thứ tự" name="SortOrder">
                      <Input placeholder="Nhập " />
                    </Form.Item>
                  </Col>
                  {/* <Col span={12}> */}
                  {/* <Form.Item name="IsComment" valuePropName="checked">
                      <Checkbox>Tin slide</Checkbox>
                    </Form.Item>
                    <Form.Item name="IsComment" valuePropName="checked">
                      <Checkbox>Tin phải slide</Checkbox>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="IsComment" valuePropName="checked">
                      <Checkbox>Tin nổi bật</Checkbox>
                    </Form.Item> */}
                  <Col span={12}>
                    <div className={!!PostID ? "mt-35" : ""}>
                      <Form.Item name="IsComment" valuePropName="checked">
                        <Checkbox>Cho phép bình luận</Checkbox>
                      </Form.Item>
                    </div>
                  </Col>
                  {/* </Col> */}

                  <Col span={24}>
                    <Form.Item shouldUpdate noStyle>
                      {({ getFieldValue }) => {
                        const category = treeData?.find(
                          i =>
                            i?.CategoryPostID ===
                            getFieldValue("CategoryPostID"),
                        )
                        const required = !!IMAGE_REQUIRE?.includes(
                          category?.CategoryCode,
                        )
                        return (
                          <Form.Item
                            label={
                              <div>
                                <span>
                                  {!!required && (
                                    <span style={{ color: "#ff4d4f" }}>* </span>
                                  )}
                                  Hình thu nhỏ
                                </span>
                                <br />
                                <span className="sub-title">
                                  Dung lượng file tối đa 1 MB, định dạng:.JPEG,
                                  .PNG
                                </span>
                              </div>
                            }
                            name="LogoFileID"
                            required={false}
                            rules={[
                              {
                                required,
                                message: "Thông tin không được để trống",
                              },
                            ]}
                          >
                            <Row gutter={20} className="mt-16">
                              <Col>
                                <Upload {...uploadProps}>
                                  <ButtonUploadStyle>
                                    <Button className="account-button-upload ">
                                      <Row className="account-background-upload d-flex align-items-center">
                                        <SvgIcon name="add-media-video" />
                                        <div className="account-text-upload ml-16">
                                          Chọn ảnh
                                        </div>
                                      </Row>
                                    </Button>
                                  </ButtonUploadStyle>
                                </Upload>
                              </Col>
                              {!!image && (
                                <Col>
                                  <Image
                                    src={image?.FileUrl}
                                    alt="image"
                                    loading="lazy"
                                    width="200px"
                                  />
                                </Col>
                              )}
                            </Row>
                          </Form.Item>
                        )
                      }}
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                {/* <Form.Item shouldUpdate noStyle>
                  {({ getFieldValue }) => {
                    if (
                      getFieldValue("CategoryPostID") ===
                      "2d4262da-a322-4eed-8b57-07c36194ca2d"
                    )
                      return ( */}
                <Form.Item
                  valuePropName="fileList"
                  name="file"
                  label="Thêm file "
                  getValueFromEvent={normFile}
                >
                  <Upload.Dragger
                    multiple={true}
                    beforeUpload={() => false}
                    className="pointer"
                    onRemove={e => {
                      if (e?.ObjectFileID)
                        setFileDelete(pre => [...pre, e?.ObjectFileID])
                    }}
                  >
                    <Row gutter={16} className="justify-content-center">
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
                  </Upload.Dragger>
                </Form.Item>
                {/* )
                  }}
                </Form.Item> */}
              </Col>
              <Col span={24}>
                <Form.Item shouldUpdate noStyle>
                  {({ getFieldValue }) => {
                    const category = treeData?.find(
                      i =>
                        i?.CategoryPostID === getFieldValue("CategoryPostID"),
                    )
                    const required = !CONTENT_NOT_REQUIRED?.includes(
                      category?.CategoryCode,
                    )
                    return (
                      <Form.Item
                        label="Nội dung bài viết"
                        required={required}
                        name="Content"
                        trigger="onEditorChange"
                        validateTrigger={["onEditorChange"]}
                        rules={[
                          {
                            required,
                            message: "Thông tin không được để trống",
                          },
                        ]}
                      >
                        <TinyEditor setLoading={setLoading} />
                      </Form.Item>
                    )
                  }}
                </Form.Item>
              </Col>
            </Row>
          </Spin>
        </CreatePostStyled>
      </Form>
    </CustomModal>
  )
}

export default InsertUpdatePostModal
