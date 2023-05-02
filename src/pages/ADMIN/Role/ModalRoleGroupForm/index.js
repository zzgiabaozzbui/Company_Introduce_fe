import { CaretDownOutlined } from "@ant-design/icons"
import {
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  TreeSelect,
} from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { GUIDE_EMPTY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import RoleService from "src/services/RoleService"
import { FormDetailWrapper, TabRoleWrapper } from "./styles"

const ModalRoleGroupForm = ({ visible, onCancel, onOk, dataInfo }) => {
  const [form] = Form.useForm()
  const { listSystemKey } = useSelector(state => state.appGlobal)
  const [loading, setLoading] = useState(false)
  const [hideRole, setHideRole] = useState(false)
  const [packageRole, setPackageRole] = useState({})
  const [treeCategoryPost, setTreeCategoryPost] = useState([])
  const nest = (items, id, link) =>
    items
      ?.filter(item => item[link] === id)
      .map(item => ({
        ...item,
        title: item?.CategoryPostName,
        key: item?.CategoryPostID,
        value: item?.CategoryPostID,
        children: nest(items, item?.CategoryPostID, link),
      }))
  const getRoleById = () => {
    setLoading(true)
    RoleService.getByRoleId({
      roleId: dataInfo ? dataInfo?.RoleID : 0,
    })
      .then(res => {
        if (res.isOk) {
          setPackageRole(res.Object)
          setTreeCategoryPost(
            nest(
              [
                {
                  CategoryCode: "TAT_CA",
                  CategoryPostID: GUIDE_EMPTY,
                  CategoryPostName: "Tất cả",
                  Description: null,
                  IsStatic: true,
                  Level: 0,
                  NumericalOrder: 1,
                  ParentID: "-1",
                  Status: 1,
                },
                ...res?.Object?.ListRoleCategoryPost,
              ],
              "-1",
              "ParentID",
            ),
          )
          form.setFieldsValue({
            ...res.Object,
            IsActive: res.Object.IsDelete ? 0 : 1,
            ListCategoryPost: res?.Object?.ListRoleCategoryPost?.filter(
              i => i.IsCheck,
            ).map(j => j.CategoryPostID),
          })
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getRoleById()
  }, [])

  const handleSubmit = () => {
    setLoading(true)
    form.validateFields().then(() => {
      const value = form.getFieldsValue(true)
      const ListFuntionID = []
      packageRole.ListRole?.map(tabRole =>
        tabRole.ListItem.filter(role => {
          if (role.IsChecked) ListFuntionID.push(role.FunctionId)
        }),
      )
      const body = {
        RoleID: dataInfo ? dataInfo.RoleID : 0,
        RoleName: value.RoleName,
        ListFuntionID: ListFuntionID,
        RoleType: value.RoleType,
        Description: value.Description,
        IsActive: !!value.IsActive,
        ListCategoryPost: value.ListCategoryPost,
      }
      RoleService.createOrUpdateRole(body)
        .then(res => {
          if (res.isOk) {
            Notice({
              msg: "Tạo nhóm quyền thành công",
              isSuccess: true,
            })
            onOk()
          }
        })
        .finally(() => {
          setLoading(false)
        })
    })
  }

  const isCheckAll = Tab => {
    if (!Tab.ListItem || !Tab.ListItem.length) return false
    return Tab.ListItem.every(role => role.IsChecked)
  }

  const handleCheckRole = (e, category, RoleID) => {
    const { checked } = e.target
    const formValue = form.getFieldsValue(true)
    let newTabData = [...packageRole.ListRole].find(
      tab => tab.CategoryId === category,
    )
    if (newTabData) {
      const newRolesData = newTabData.ListItem.map(role => {
        if (RoleID === 0) {
          return {
            ...role,
            IsChecked: checked,
          }
        }
        if (role.FunctionId === RoleID) {
          return {
            ...role,
            IsChecked: checked,
          }
        }
        return role
      })
      newTabData = { ...newTabData, ListItem: newRolesData }
      const newRoleGroupDataList = [...packageRole.ListRole].map(tab => {
        if (tab.CategoryId === category) {
          return {
            ...newTabData,
          }
        }
        return tab
      })
      setPackageRole({
        // RoleId: formValue.RoleId,
        ...packageRole,
        RoleType: formValue.RoleType,
        RoleName: formValue.RoleName,
        Description: formValue.Description,
        ListRole: newRoleGroupDataList,
      })
    }
  }

  const handelRadioChange = e => {
    const value = e.target.value
    setPackageRole({
      ...packageRole,
      RoleType: value,
    })
  }

  const handleCheckAllRole = checked => {
    try {
      setLoading(true)
      if (checked.target.checked) {
        form.setFieldValue(
          "ListCategoryPost",
          packageRole?.ListRoleCategoryPost?.map(i => i.CategoryPostID),
        )
      } else {
        form.setFieldValue("ListCategoryPost", [])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={dataInfo?.RoleID ? `Cập nhật nhóm quyền` : "Tạo nhóm quyền"}
      open={visible}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={false}
      width={1200}
      style={{ top: 20 }}
      bodyStyle={{
        maxHeight: "calc(300vh - 10px)",
        overflow: "auto",
      }}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Space>
            <Button
              btnType="primary"
              className="btn-hover-shadow"
              type="submit"
              onClick={handleSubmit}
            >
              Ghi lại
            </Button>
          </Space>
        </div>
      }
    >
      <Spin spinning={loading}>
        <FormDetailWrapper form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={dataInfo?.RoleID ? 18 : 24}>
              <Form.Item
                label="Tên nhóm quyền"
                name="RoleName"
                rules={[
                  {
                    required: true,
                    message: "Tên nhóm quyền không được để trống",
                  },
                ]}
              >
                <Input allowClear placeholder="Nhập tên nhóm quyền" />
              </Form.Item>
            </Col>
            {dataInfo?.RoleID && (
              <Col span={6}>
                <Form.Item name="IsActive" label="Trạng thái">
                  <Select placeholder="chọn trạng thái">
                    <Select.Option value={1} key={1}>
                      Đang hoạt động
                    </Select.Option>
                    <Select.Option value={0} key={0}>
                      Không hoạt động
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            )}
          </Row>
          <Form.Item
            label="Loại nhóm quyền"
            name="RoleType"
            rules={[
              {
                required: true,
                message: "Loại nhóm quyền không được để trống",
              },
            ]}
          >
            <Radio.Group>
              {getListComboByKey("ROLE_TYPE", listSystemKey).map(
                (role, idx) => (
                  <Radio
                    value={role.CodeValue}
                    key={`${role?.Description}${idx}`}
                    onChange={e => handelRadioChange(e)}
                  >
                    {role.Description}
                  </Radio>
                ),
              )}
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={
              <div
                className="fw-600 pointer"
                onClick={() => setHideRole(!hideRole)}
              >
                Danh sách quyền
                <CaretDownOutlined
                  rotate={hideRole ? 180 : 0}
                  className="ml-6"
                />
              </div>
            }
            name="ListFuntionIds"
          >
            {!hideRole &&
              !!packageRole &&
              packageRole?.ListRole?.map((Tab, idx) => (
                <TabRoleWrapper>
                  <div
                    className="tab-role-name"
                    key={`name${Tab.CategoryId}${idx}`}
                  >
                    {Tab.FunctionCategoryName}
                  </div>
                  <Space className="tab-role-list" wrap>
                    <Checkbox
                      key={`list${Tab.CategoryId}${idx}`}
                      value={Tab.CategoryId}
                      checked={isCheckAll(Tab)}
                      onChange={e => handleCheckRole(e, Tab.CategoryId, 0)}
                    >
                      Tất cả
                    </Checkbox>

                    {!!Tab.ListItem &&
                      Tab.ListItem.map((role, idx) => (
                        <Checkbox
                          key={`${role.FunctionId}${idx}`}
                          checked={role.IsChecked}
                          onChange={e =>
                            handleCheckRole(e, Tab.CategoryId, role.FunctionId)
                          }
                        >
                          {role.FunctionName}
                        </Checkbox>
                      ))}
                  </Space>
                </TabRoleWrapper>
              ))}
          </Form.Item>
          <Form.Item label="Quyền danh mục tin" name="ListCategoryPost">
            {/* <Checkbox.Group
              style={{
                width: "100%",
              }}
            >
              <Row gutter={16}>
                {!!packageRole &&
                  packageRole?.ListRoleCategoryPost?.map((Tab, idx) => (
                    <Col span={8}>
                      <TabRoleWrapper>
                        <Checkbox
                          key={Tab.CategoryPostID}
                          value={Tab.CategoryPostID}
                        >
                          <div
                            className="max-line1"
                            title={Tab.CategoryPostName}
                          >
                            {Tab.CategoryPostName}
                          </div>
                        </Checkbox>
                      </TabRoleWrapper>
                    </Col>
                  ))}
              </Row>
            </Checkbox.Group> */}
            <TreeSelect
              maxTagCount="responsive"
              treeDefaultExpandAll
              treeData={treeCategoryPost}
              treeCheckable
              placeholder="Chọn quyền mục tin"
              showSearch
              treeNodeFilterProp="title"
            />
          </Form.Item>
          <Form.Item name="Description" label="Ghi chú">
            <Input.TextArea placeholder="Nhập ghi chú" />
          </Form.Item>
        </FormDetailWrapper>
      </Spin>
    </Modal>
  )
}
export default ModalRoleGroupForm
