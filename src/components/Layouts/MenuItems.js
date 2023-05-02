import ROUTER from "src/router"
import SvgIcon from "../SvgIcon"
const MenuItem = () => {
  return [
    {
      key: ROUTER.HOME,
      icon: <SvgIcon name="home" />,
    },
    {
      label: "Tài khoản của tôi",
      key: ROUTER.TAI_KHOAN_CUA_TOI,
      hideOnMenu: true,
    },

    {
      label: "Quản lý bài đăng",
      key: "subkey1",
      hideOnMenu: true,
      showOnAdmin: true,
      icon: <SvgIcon name="post-card" />,
      TabID: [2, 3, 4],
      children: [
        {
          key: ROUTER.DANH_SACH_BAI_VIET,
          label: "Danh mục - Bài viết",
          TabID: [2, 3],
        },
        {
          key: ROUTER.DANH_MUC_THE,
          label: "Danh sách thẻ",
          TabID: [4],
          hideOnMenu: true,
          showOnAdmin: true,
        },
      ],
    },

    {
      label: "Quản trị hệ thống",
      key: "subkey2",
      hideOnMenu: true,
      showOnAdmin: true,
      icon: <SvgIcon name="management-skdn" />,
      TabID: [13, 14, 15, 16, 17, 18, 19, 24],
      children: [
        {
          key: ROUTER.DANH_BA,
          label: "Danh bạ",
          TabID: [15, 16, 17, 18, 19],
        },
        {
          key: ROUTER.PHAN_QUYEN,
          label: "Phân quyền",
          TabID: [13],
        },
      ],
    },
  ]
}
export default MenuItem
