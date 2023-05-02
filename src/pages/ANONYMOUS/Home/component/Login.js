import { Form, Input, Row } from "antd"
import { useContext, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import { ACCOUNT_TYPE } from "src/constants/constants"
import STORAGE, { setStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import { getRegexPassword } from "src/lib/stringsUtils"
import { hasPermission } from "src/lib/utils"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import RoleService from "src/services/RoleService"
import { StyleLogin } from "../styled"
import MenuItem from "src/components/Layouts/MenuItems"
import ForgetModal from "src/components/Layouts/component/Forget/ForgetModal"
import RePasswordModal from "src/components/Layouts/component/Forget/components/RePasswordModal"
import VerifyForgetModal from "src/components/Layouts/component/Forget/components/VerifyForgotModal"

const Login = ({ stopNavigate = false }) => {
  const [form] = Form.useForm()
  const { routerStore } = useContext(StoreContext)
  const [routerBeforeLogin, setRouterBeforeLogin] = routerStore
  const navigate = useNavigate()

  const [email, setEmail] = useState(false)
  const [codeVerify, setCodeVerify] = useState()
  const [openForgetPassModal, setOpenForgetPassModal] = useState(false)
  const [openVerifyModal, setOpenVerifyModal] = useState(false)
  const [rePasswordModal, setRePasswordModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const comeStartPage = async () => {
    const resp = await RoleService.getListTab()
    if (resp.isError) return
    // const responsiveTask = await RoleService.getListTask()
    // if (responsiveTask.isError) return
    const responsiveTask = {
      Object: [],
    }
    const treeLabel = tree =>
      tree?.map(i => ({
        ...i,
        title: i?.label,
        children: treeLabel(i?.children),
      }))
    const items = treeLabel(MenuItem(navigate, responsiveTask.Object))
    const menuAdmin = items
      ?.filter(i => i?.showOnAdmin)
      ?.filter(x => hasPermission(x?.TabID, [...resp.Object]))
      ?.map(i => ({
        ...i,
        children: i?.children?.filter(x =>
          hasPermission(x?.TabID, [...resp.Object]),
        ),
      }))
    let startPage = "/"
    if (!!menuAdmin && !!menuAdmin[0]?.children?.length) {
      startPage = menuAdmin[0]?.children[0]?.key
    } else if (!!(menuAdmin[0]?.key?.charAt(0) === "/")) {
      startPage = menuAdmin[0]?.key
    }
    navigate(startPage)
  }
  const onLogin = async () => {
    try {
      setLoading(true)
      const values = await form.validateFields()
      const res = await AuthService.login({ ...values })
      if (res?.isOk) {
        setStorage(STORAGE.TOKEN, res?.Object?.Token)
        setStorage(STORAGE.USER_INFO, res?.Object)
        setRouterBeforeLogin(undefined)
        if (stopNavigate) return
        else {
          navigate(
            routerBeforeLogin
              ? routerBeforeLogin
              : res?.Object?.AccountType !== ACCOUNT_TYPE.KHACH_HANG_CA_NHAN
              ? comeStartPage()
              : ROUTER.HOME,
          )
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyleLogin>
      <Form form={form} layout="vertical">
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập tên tại khoản!",
            },
          ]}
          label="Tên đăng nhập"
          name="username"
        >
          <Input placeholder="Nhập tên tài khoản" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Bạn chưa nhập mật khẩu!",
            },
            {
              pattern: getRegexPassword(),
              message:
                "Mật khẩu có chứa ít nhất 8 ký tự, trong đó có ít nhất một số và bao gồm cả chữ thường và chữ hoa và ký tự đặc biệt, ví dụ @, #, ?, !.",
            },
          ]}
          label="Mật khẩu"
          name="password"
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Row className="space-between">
          <div />
          <Link
            onClick={() => {
              setOpenForgetPassModal(true)
            }}
            className="forget-pass"
          >
            <i>Quên mật khẩu?</i>
          </Link>
        </Row>
        <Row>
          <Button
            loading={loading}
            btnType="primary"
            className="btn-login"
            type="submit"
            htmlType="submit"
            onClick={onLogin}
          >
            Đăng nhập
          </Button>
        </Row>
      </Form>

      {!!openForgetPassModal && (
        <ForgetModal
          openForgetPassModal={openForgetPassModal}
          handleOk={() => {}}
          handleCancel={() => setOpenForgetPassModal(false)}
          setOpenVerifyModal={() => setOpenVerifyModal(true)}
          setEmail={setEmail}
        />
      )}
      {!!openVerifyModal && (
        <VerifyForgetModal
          openVerifyModal={openVerifyModal}
          handleOk={() => {}}
          handleCancel={() => setOpenVerifyModal(false)}
          setRePasswordModal={() => setRePasswordModal(true)}
          email={email}
          setCodeVerify={setCodeVerify}
        />
      )}
      {!!rePasswordModal && (
        <RePasswordModal
          rePasswordModal={rePasswordModal}
          handleOk={() => {}}
          handleCancel={() => setRePasswordModal(false)}
          email={email}
          codeVerify={codeVerify}
        />
      )}
    </StyleLogin>
  )
}

export default Login
