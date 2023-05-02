import { Col, Form, Input, Row, Select, Spin } from "antd"
import { useContext, useEffect, useState } from "react"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import { StoreContext } from "src/lib/store"
import { getRegexEmail, getRegexMobile } from "src/lib/stringsUtils"
import RegionService from "src/services/RegionService"
import UserService from "src/services/UserService"
import Notice from "src/components/Notice"
import STORAGE, { setStorage } from "src/lib/storage"
const { Option } = Select

const ModalChangeInfo = ({ onOk, onCancel, open, userInfo }) => {
  const { userStore } = useContext(StoreContext)
  const [user, setUser] = userStore
  const [form] = Form.useForm()
  const [listProvince, setListProvince] = useState()
  const [listDistrict, setListDistrict] = useState()
  const [listWard, setListWard] = useState()
  const [loading, setLoading] = useState(false)

  const userStorage = JSON.parse(localStorage.getItem(STORAGE.USER_INFO))

  const getListProvinceVN = () => {
    setLoading(true)
    RegionService.getByRegionId({ regionId: 234 })
      .then(res => {
        if (res?.isError) return
        setListProvince(res?.Object)
      })
      .finally(() => setLoading(false))
  }

  const onChangeProvince = e => {
    form.resetFields([`DistrictID`, `WardID`])
    if (!e) return setListDistrict([])
    setLoading(true)
    RegionService.getByRegionId({ regionId: e })
      .then(res => {
        if (res?.isError) return
        const lstDistrict = res?.Object?.filter(i => i.ParentID === e)
        setListDistrict(lstDistrict)
      })
      .finally(() => setLoading(false))
  }

  const onChangeDistrict = e => {
    form.resetFields([`WardID`])
    if (!e) return setListWard([])
    setLoading(true)
    RegionService.getByRegionId({ regionId: e })
      .then(res => {
        if (res?.isError) return
        const lstWard = res?.Object?.filter(i => i.ParentID === e)
        setListWard(lstWard)
      })
      .finally(() => setLoading(false))
  }

  const onsubmit = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await UserService.changeInfor({
        FullName: values.FullName,
        PhoneNumber: values.PhoneNumber,
        Email: values.Email,
        Address: values.Address,
        WardID: values.WardID,
        DistrictID: values.DistrictID,
        ProvinceID: values.ProvinceID,
      })
      if (res?.isError) return
      let obj = {
        ...userStorage,
        FullName: values.FullName,
        PhoneNumber: values.PhoneNumber,
        Email: values.Email,
        Address: values.Address,
        WardID: values.WardID,
        DistrictID: values.DistrictID,
        ProvinceID: values.ProvinceID,
      }

      setStorage(STORAGE.USER_INFO, obj)
      setUser(obj)
      onOk()
      Notice({
        msg: "Cập nhật thông tin thành công.",
      })
      onCancel()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListProvinceVN()
  }, [])
  useEffect(() => {
    onChangeProvince(userInfo.ProvinceID)
    onChangeDistrict(userInfo.DistrictID)
    form.setFieldsValue({
      ...userInfo,
      ProvinceID: !!userInfo.ProvinceID ? userInfo.ProvinceID : undefined,
      DistrictID: !!userInfo.DistrictID ? userInfo.DistrictID : undefined,
      WardID: !!userInfo.WardID ? userInfo.WardID : undefined,
    })
  }, [userInfo])

  const renderFooter = () => (
    <div className="d-flex justify-content-flex-end">
      <Button btnType="primary" className="btn-hover-shadow" onClick={onsubmit}>
        Ghi lại
      </Button>
    </div>
  )
  return (
    <CustomModal
      title={"Sửa thông tin tài khoản"}
      footer={renderFooter()}
      width={1024}
      open={open}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            Username: user.Username,
          }}
        >
          <Row gutter={[16, 16]}>
            {/* <Col span={12}>
              <Form.Item
                name="Username"
                label="Tên đăng nhập"
                required
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]}
              >
                <Input placeholder="Nhập" disabled={true} />
              </Form.Item>
            </Col> */}
            <Col span={24}>
              <Form.Item
                name="FullName"
                label="Họ và tên"
                required
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]}
              >
                <Input placeholder="Nhập" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="PhoneNumber"
                label="Số điện thoại"
                required
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                  {
                    pattern: getRegexMobile(),
                    message: "Số điện thoại là chuỗi từ 8 đến 15 kí tự chữ số",
                  },
                ]}
              >
                <Input placeholder="Nhập" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="Email"
                label="Email"
                rules={[
                  { required: true, message: "Thông tin không được để trống" },
                  {
                    pattern: getRegexEmail(),
                    message: "Email sai định dạng",
                  },
                ]}
              >
                <Input placeholder="Nhập" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="ProvinceID"
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]}
                required
                label="Tỉnh/Thành phố"
              >
                <Select
                  showSearch
                  placeholder="--Chọn--"
                  onChange={onChangeProvince}
                  style={{ width: "100%" }}
                >
                  {listProvince?.length &&
                    listProvince?.map(i => (
                      <Option key={i.RegionID} value={i.RegionID}>
                        {i.RegionName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="DistrictID"
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]}
                required
                label="Quận/Huyện"
              >
                <Select
                  showSearch
                  placeholder="--Chọn--"
                  onChange={onChangeDistrict}
                  style={{ width: "100%" }}
                >
                  {listDistrict?.length &&
                    listDistrict?.map(i => (
                      <Option key={i.RegionID} value={i.RegionID}>
                        {i.RegionName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="WardID"
                rules={[
                  {
                    required: true,
                    message: "Thông tin không được để trống",
                  },
                ]}
                required
                label="Xã/Phường"
              >
                <Select
                  showSearch
                  placeholder="--Chọn--"
                  style={{ width: "100%" }}
                >
                  {listWard?.length &&
                    listWard?.map(i => (
                      <Option key={i.RegionID} value={i.RegionID}>
                        {i.RegionName}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Số nhà/tổ/thôn/xóm... "
                name="Address"
                rules={[
                  {
                    required: true,
                    message: "Bạn chưa nhập Số nhà/tổ/thôn/xóm...!",
                  },
                ]}
              >
                <Input placeholder="Số nhà/tổ/thôn/xóm... " />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Spin>
    </CustomModal>
  )
}

export default ModalChangeInfo
