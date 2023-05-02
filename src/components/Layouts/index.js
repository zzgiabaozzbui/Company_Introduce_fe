import { MenuFoldOutlined, UserOutlined } from "@ant-design/icons"
import {
  Avatar,
  Badge,
  Col,
  Divider,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Row,
} from "antd"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { ACCOUNT_TYPE } from "src/constants/constants"
import STORAGE, { clearStorage, getStorage, setStorage } from "src/lib/storage"
import UseWindowSize from "src/lib/useWindowSize"
import { hasPermission } from "src/lib/utils"
import ROUTER from "src/router"
import AuthService from "src/services/AuthService"
import NotifyApi from "src/services/Notify"
import LayoutCommon, { LayoutHeaderAdmin } from "../Common/Layout"
import Footer from "../Footer"
import SvgIcon from "../SvgIcon"
import { SubTableHeader } from "../Table/CustomTable/styled"
import MenuItem from "./MenuItems"
import LayoutAdmin from "./component/LayoutAdmin"
import { LayoutStyled, StyleMenuAccount } from "./styled"
import "./styles.scss"
import RePasswordModal from "./component/Forget/components/RePasswordModal"
const { Header, Content } = Layout

const MainLayout = ({ children, isAdmin }) => {
  const { listTabs } = useSelector(state => state?.appGlobal)
  const isLogin = getStorage(STORAGE.TOKEN)
  const navigate = useNavigate()
  const location = useLocation()
  const [rePasswordModal, setRePasswordModal] = useState(false)

  const [userInfo, setUserInfo] = useState(getStorage(STORAGE.USER_INFO))
  // const isAdmin = userInfo?.AccountType === ACCOUNT_TYPE_ID.ADMIN
  const [open, setOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(
    getStorage(STORAGE.KEY_MENU_ACTIVE) || ["/"],
  )
  const [listNotify, setListNotify] = useState([])
  const [loading, setLoading] = useState(false)
  const [visibleNotify, setVisibleNotify] = useState(false)
  const [numberOfNewNotifies, setNumberOfNewNotifies] = useState()

  useEffect(() => {
    let key = location?.pathname
    if (location?.pathname === ROUTER?.DANG_BAI)
      key = ROUTER?.DANH_SACH_BAI_VIET

    setSelectedKey([key])
  }, [location])

  const onClickMenu = key => {
    setStorage(STORAGE.KEY_MENU_ACTIVE, key.keyPath)
    setSelectedKey(key.key.keyPath)
    if (!key.key.includes("subkey")) navigate(key.key)
  }
  const onClick = async () => {
    if (isLogin) {
      await AuthService.logout()
      clearStorage()

      return navigate(ROUTER?.HOME)
    }
    navigate(ROUTER?.HOME)
  }
  const fbTest = () => {
    let chatbox = document.getElementById("fb-customer-chat")
    if (chatbox) {
      chatbox?.setAttribute("page_id", `109362535310723`)
      chatbox?.setAttribute("attribution", "biz_inbox")
      window.fbAsyncInit = function () {
        /*global FB*/
        FB?.init({
          xfbml: true,
          version: "v14.0",
        })
      }
      ;(function (d, s, id) {
        let js,
          fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js"
        fjs.parentNode.insertBefore(js, fjs)
      })(document, "script", "facebook-jssdk")
    }
  }
  useEffect(() => {
    fbTest()
  }, [])

  const menu = (
    <StyleMenuAccount>
      <div className="menu-account">
        <Menu className="dropdown-option">
          <div className="account-infor">
            <Row gutter={[16, 8]} className="infor">
              <Col span={6}>
                <div className="text-center">
                  <Avatar
                    src={userInfo?.Avatar}
                    size={52}
                    icon={<UserOutlined style={{ fontSize: "52px" }} />}
                  />
                </div>
              </Col>
              <Col span={18}>
                <div className="sumary-infor-user">
                  {!!userInfo?.FullName && (
                    <div className="fullname">{userInfo?.FullName}</div>
                  )}
                  {!!userInfo?.Email && (
                    <SubTableHeader className="max-line1">
                      {userInfo?.Email}
                    </SubTableHeader>
                  )}
                </div>
              </Col>
            </Row>
            <Divider />
            {!!(
              userInfo?.AccountType === ACCOUNT_TYPE.ADMIN ||
              userInfo?.AccountType === ACCOUNT_TYPE.USER
            ) && (
              <Menu.Item
                key="1"
                onClick={() => {
                  let startPage = undefined
                  if (!!menuAdmin && !!menuAdmin[0]?.children?.length) {
                    startPage = menuAdmin[0]?.children[0]?.key
                  } else if (!!(menuAdmin[0]?.key?.charAt(0) === "/")) {
                    startPage = menuAdmin[0]?.key
                  }
                  navigate(!!menuAdmin?.length ? startPage : ROUTER.HOME)
                }}
              >
                <div className="btn-function">
                  <SvgIcon name="user_login" />
                  <span className="fw-400">Quản trị hệ thống</span>
                </div>
              </Menu.Item>
            )}
            <Menu.Item
              key="2"
              onClick={() => {
                navigate(ROUTER.TAI_KHOAN_CUA_TOI)
              }}
            >
              <div className="btn-function">
                <SvgIcon name="file-text" />
                <span className="fw-400">Thông tin của tôi</span>
              </div>
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={() => {
                setRePasswordModal(true)
              }}
            >
              <div className="btn-function strok-btn-function">
                <SvgIcon name="reset-pass" />
                <span className="fw-400">Đổi mật khẩu</span>
              </div>
            </Menu.Item>
          </div>
          <div className="account-logout">
            <Menu.Item key="4" style={{ color: "#ED1117" }} onClick={onClick}>
              <div className="btn-logout">
                <SvgIcon name="logoutIcon" />
                Đăng xuất
              </div>
            </Menu.Item>
          </div>
        </Menu>
      </div>
    </StyleMenuAccount>
  )

  const menuAdmin = MenuItem()
    ?.filter(i => i?.showOnAdmin)
    ?.filter(x => hasPermission(x?.TabID, [...listTabs]))
    ?.map(i => ({
      ...i,
      children: i?.children?.filter(x =>
        hasPermission(x?.TabID, [...listTabs]),
      ),
    }))

  return (
    <LayoutStyled>
      <Header
        className={`header-background  ${
          isAdmin ? "admin-header" : "back-header"
        }`}
      >
        {React.createElement(LayoutHeaderAdmin, {
          children: (
            <>
              <Row
                style={{ padding: `0 5px`, height: "100%" }}
                className={` justify-content-space-between align-items-center nowrap`}
              >
                <div className="align-items-center d-flex" style={{ flex: 1 }}>
                  {React.createElement(
                    UseWindowSize.isMobile() ? MenuFoldOutlined : Col,
                    {
                      onClick: () => setOpen(true),
                      className: UseWindowSize.isMobile() && "mr-10",
                    },
                  )}
                  <span className={`brand ${isAdmin ? "" : "white1"}`}>
                    HEART AND VIRTUE
                  </span>
                </div>
                {!!isLogin ? (
                  <div className="d-flex justify-content-flex-end align-items-end">
                    <Dropdown
                      overlay={menu}
                      overlayStyle={{ minWidth: "300px" }}
                    >
                      <div className="d-flex-center pointer">
                        <span className={`${!isAdmin && "white"}`}>
                          {!!userInfo?.FullName && (
                            <div className="fullname mr-6 ml-6">
                              {userInfo?.FullName}
                            </div>
                          )}
                        </span>
                        {isAdmin ? (
                          <SvgIcon name="arrow-down" />
                        ) : (
                          <SvgIcon name="arrow-down-white" />
                        )}
                      </div>
                    </Dropdown>
                  </div>
                ) : (
                  <div className="d-flex align-items-center "></div>
                )}
              </Row>
            </>
          ),
        })}
      </Header>
      <Layout>
        <Content className="site-layout-background">
          {isAdmin ? (
            <>
              <LayoutAdmin
                children={children}
                menuAdmin={menuAdmin}
                selectedKey={selectedKey}
              />
            </>
          ) : (
            <>
              <div className="w-100">{children}</div>
            </>
          )}
          {!isAdmin && <Footer />}
        </Content>
      </Layout>
      <Drawer
        title=""
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        className="menu-custom"
      >
        <Menu
          onClick={key => onClickMenu(key)}
          selectedKeys={selectedKey}
          mode="inline"
          items={MenuItem().filter(i => !i?.hideOnMenu)}
        />
      </Drawer>

      {!!rePasswordModal && (
        <RePasswordModal
          rePasswordModal={rePasswordModal}
          handleOk={() => {}}
          handleCancel={() => setRePasswordModal(false)}
        />
      )}
    </LayoutStyled>
  )
}

export default MainLayout
