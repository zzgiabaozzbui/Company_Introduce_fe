import { useContext, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { Button, Result } from "antd"
import { useLocation, NavLink } from "react-router-dom"
import MainLayout from "src/components/Layouts"
import STORAGE, { getStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import { ACCOUNT_TYPE } from "src/constants/constants"
import ROUTER from "src/router"

function AdminRoutes() {
  const { routerStore, userStore } = useContext(StoreContext)
  const [, setRouterBeforeLogin] = routerStore
  const [user] = userStore

  const isLogin = getStorage(STORAGE.TOKEN)
  const location = useLocation()

  useEffect(() => {
    if (!isLogin)
      setRouterBeforeLogin(`${location.pathname}${location?.search}`)
  }, [isLogin])
  return !!isLogin ? (
    user?.AccountType !== ACCOUNT_TYPE.KHACH_HANG_CA_NHAN ? (
      <MainLayout isAdmin>
        <Outlet />
      </MainLayout>
    ) : (
      <Result
        status="403"
        title="403 Erorr Permission"
        subTitle="Xin lỗi, Bạn không có quyền truy cập trang web."
        extra={
          <NavLink to="/">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button type="primary" className="btn-hover-shadow">
                Quay lại trang chủ
              </Button>
            </div>
          </NavLink>
        }
      />
    )
  ) : (
    <Navigate to={ROUTER.HOME} />
  )
}

export default AdminRoutes
