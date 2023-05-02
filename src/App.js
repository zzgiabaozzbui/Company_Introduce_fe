import { Spin } from "antd"
import React, { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRoutes } from "react-router-dom"
import STORAGE, { getStorage } from "src/lib/storage"
import { StoreContext } from "src/lib/store"
import CommonService from "src/services/CommonService"
import "./App.css"
import ModalLoading from "./components/Modal/Loading"
import { getListSystemKey, getStaticNav, setListTabs } from "./redux/appGlobal"
import ROUTER from "./router"
import GuestServices from "./services/GuestServices"
import RoleService from "./services/RoleService"

// ANONYMOUS
const PublicRouters = React.lazy(() => import("./pages/PublicRouters"))
const Home = React.lazy(() => import("./pages/ANONYMOUS/Home"))

const SvgViewer = React.lazy(() => import("./pages/SvgViewer"))
const NotFound = React.lazy(() => import("./pages/NotFound"))

// USER
const PrivateRoutes = React.lazy(() => import("./pages/PrivateRoutes"))
const MyAccount = React.lazy(() => import("./pages/USER/MyAccount"))

// ADMIN
const AminRoutes = React.lazy(() => import("./pages/ADMIN/AminRoutes"))
const Department = React.lazy(() => import("./pages/ADMIN/Department"))

// const ListUser = React.lazy(() => import("./pages/ADMIN/ListUser"))
const PostManager = React.lazy(() => import("./pages/ADMIN/PostManager"))
const Role = React.lazy(() => import("./pages/ADMIN/Role"))
// const CustomerDirectory = React.lazy(() =>
//   import("./pages/ADMIN/CustomerDirectory"),
// )
const Tags = React.lazy(() => import("./pages/ADMIN/Tags"))
const CategoryPost = React.lazy(() => import("./pages/ADMIN/CategoryPost"))
const ListContact = React.lazy(() => import("./pages/ADMIN/ListContact"))
function LazyLoadingComponent({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ height: "100vh" }}>
          <Spin />
        </div>
      }
    >
      {children}
    </React.Suspense>
  )
}

function App() {
  const { userStore } = useContext(StoreContext)
  const [, setUser] = userStore
  const isLogin = getStorage(STORAGE.TOKEN)
  const dispatch = useDispatch()
  const { modalLoading } = useSelector(state => state.common)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getSystemKey()
  }, [])

  useEffect(() => {
    if (!!isLogin) getData()
  }, [isLogin])

  const getSystemKey = async () => {
    const res = await CommonService.getSystemKey("All")
    if (res.IsError) return
    dispatch(getListSystemKey(res.Object))
  }
  const getData = async () => {
    try {
      setLoading(true)
      setUser(getStorage(STORAGE.USER_INFO))
      if (getStorage(STORAGE.USER_INFO).AccountType !== 2) {
        const resp = await RoleService.getListTab()
        if (resp.isOk) {
          dispatch(setListTabs(resp.Object))
        }
      }
      getSystemKey()
      const ress = await GuestServices.getStaticNav()
      if (ress.IsError) return
      dispatch(getStaticNav(ress.Object))
    } finally {
      setLoading(false)
    }
  }
  const routes = [
    {
      path: ROUTER.SVG_VIEWER,
      element: (
        <LazyLoadingComponent>
          <SvgViewer />
        </LazyLoadingComponent>
      ),
    },

    // ADMIN
    {
      element: (
        <LazyLoadingComponent>
          <AminRoutes />
        </LazyLoadingComponent>
      ),
      children: [
        {
          path: ROUTER.DANH_BA,
          element: (
            <LazyLoadingComponent>
              <ListContact />
            </LazyLoadingComponent>
          ),
        },
        {
          path: ROUTER.PHONG_BAN_CHUC_VU,
          element: (
            <LazyLoadingComponent>
              <Department />
            </LazyLoadingComponent>
          ),
        },

        {
          path: ROUTER.DANH_MUC_THE,
          element: (
            <LazyLoadingComponent>
              <Tags />
            </LazyLoadingComponent>
          ),
        },
        {
          path: ROUTER.PHAN_QUYEN,
          element: (
            <LazyLoadingComponent>
              <Role />
            </LazyLoadingComponent>
          ),
        },
        {
          path: ROUTER.DANH_SACH_BAI_VIET,
          element: (
            <LazyLoadingComponent>
              <PostManager />
            </LazyLoadingComponent>
          ),
        },
        // {
        //   path: ROUTER.DANH_BA_NGUOI_DUNG,
        //   element: (
        //     <LazyLoadingComponent>
        //       <ListUser />
        //     </LazyLoadingComponent>
        //   ),
        // },
        // {
        //   path: ROUTER.NHOM_TIN_BAI,
        //   element: (
        //     <LazyLoadingComponent>
        //       <CategoryPost type={1} />
        //     </LazyLoadingComponent>
        //   ),
        // },
        {
          path: ROUTER.LOAI_VAN_BAN,
          element: (
            <LazyLoadingComponent>
              <CategoryPost type={2} />
            </LazyLoadingComponent>
          ),
        },
        // {
        //   path: ROUTER.LINH_VUC,
        //   element: (
        //     <LazyLoadingComponent>
        //       <CategoryPost type={3} />
        //     </LazyLoadingComponent>
        //   ),
        // },
        // {
        //   path: ROUTER.LOAI_TAI_LIEU,
        //   element: (
        //     <LazyLoadingComponent>
        //       <CategoryPost type={4} />
        //     </LazyLoadingComponent>
        //   ),
        // },
        {
          path: ROUTER.CO_QUAN_BAN_HANH,
          element: (
            <LazyLoadingComponent>
              <CategoryPost type={5} />
            </LazyLoadingComponent>
          ),
        },
        // {
        //   path: ROUTER.NHOM_HINH_ANH,
        //   element: (
        //     <LazyLoadingComponent>
        //       <CategoryPost type={6} />
        //     </LazyLoadingComponent>
        //   ),
        // },
        // {
        //   path: ROUTER.DANH_BA_KHACH_HANG,
        //   element: (
        //     <LazyLoadingComponent>
        //       <CustomerDirectory />
        //     </LazyLoadingComponent>
        //   ),
        // },
      ],
    },
    //  USER
    {
      element: (
        <LazyLoadingComponent>
          <PrivateRoutes />
        </LazyLoadingComponent>
      ),
      children: [
        {
          path: ROUTER.TAI_KHOAN_CUA_TOI,
          element: (
            <LazyLoadingComponent>
              <MyAccount />
            </LazyLoadingComponent>
          ),
        },
      ],
    },
    //  ANONYMOUS
    {
      element: (
        <LazyLoadingComponent>
          <PublicRouters />
        </LazyLoadingComponent>
      ),
      children: [
        {
          path: ROUTER.HOME,
          element: (
            <LazyLoadingComponent>
              <Home />
            </LazyLoadingComponent>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <LazyLoadingComponent>
          <NotFound />
        </LazyLoadingComponent>
      ),
    },
  ]
  const element = useRoutes(routes)
  return (
    <div className="layout-center">
      <div className="layout-max-width">
        {loading ? (
          <div className="loading-center" style={{ height: "100vh" }}>
            <Spin />
          </div>
        ) : (
          element
        )}
      </div>
      {!!modalLoading && <ModalLoading />}
    </div>
  )
}

export default App
