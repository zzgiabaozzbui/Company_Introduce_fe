import SvgIcon from "src/components/SvgIcon"

import { ModalStyled, ModalWrapper } from "./styled"
export default function CB1({
  width = 600,
  title,
  icon = "warning-usb",
  okText = "Đóng (ESC)",
  onOk = e => e(),
  ...props
}) {
  ModalStyled.confirm({
    icon: null,
    okText,
    width,
    onOk,
    maskClosable: true,
    cancelText: "Hủy",
    okButtonProps: {
      style: {
        fontWeight: 700,
        borderRadius: 4,
        height: 40,
        background: `#154398`,
      },
    },
    cancelButtonProps: {
      style: {
        fontWeight: 700,
        borderRadius: 4,
        height: 40,
        color: `#154398`,
        border: "1px solid #154398",
      },
    },
    wrapClassName: "cb1",
    ...props,
    content: (
      <ModalWrapper className="d-flex justify-content-center align-items-center flex-column">
        <div className="trashCan">
          <SvgIcon name={icon} />
        </div>
        {!!title && (
          <div
            className="textTitle"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
      </ModalWrapper>
    ),
  })
}
