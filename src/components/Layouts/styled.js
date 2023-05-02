import styled from "styled-components"

export const StyleMenuAccount = styled.div`
  .menu-account {
    background: #f3f6fc;
    padding: 6px;
    border-radius: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-top: 10px;
    .btn-logout {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-size: 14px !important;
      font-weight: 600;
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: rgb(237, 17, 23);
          }
        }
      }
    }
    /* #656565 */
    .btn-function {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      font-size: 14px !important;
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: #9a9a9a;
          }
        }
      }
    }
    .strok-btn-function {
      span {
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: #9a9a9a;
            stroke: #9a9a9a;
          }
        }
      }
    }
    .ant-dropdown-menu-item {
      background: #fff !important;
      padding: 5px 0px;
    }
    .ant-dropdown-menu-item:hover {
      background: #f5f5f5 !important;
    }
    .ant-dropdown-menu {
      position: relative !important;
      width: 100% !important;
      padding: 0 !important;
      box-shadow: unset;
      background: none;
      .account-infor {
        background: #fff;
        padding: 10px;
        border-radius: 20px 20px 3px 3px;
        margin-bottom: 3px;
        .ant-divider {
          margin: 10px 0px;
        }
        .infor {
          margin-bottom: 8px;
        }
        .sumary-infor-user {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          height: 100%;
        }
      }
      .account-function {
        background: #fff;
        padding: 10px;
        border-radius: 3px;
        margin-bottom: 3px;
      }
      .account-logout {
        background: #fff;
        padding: 10px;
        border-radius: 3px 3px 20px 20px;
      }
    }
  }
`
export const LayoutStyled = styled.div`
  .white1 {
    color: #fff !important;
  }
  .brand {
    font-size: 18px;
    font-weight: bold;
    color: #154398;
  }
  .bgr-top {
    background-repeat: no-repeat;
    min-height: 153px;
    width: 100%;
    max-width: 1300px;
    background-size: contain;
  }
  .header-background {
    background: #fff;
    position: sticky;
    top: -2px;
    z-index: 100;
    box-shadow: 1px 1px 2px #ddd;
    height: 52px;
    display: flex;
    align-items: center;
    padding: 0;
    border-top: 1px solid #ddd;
    .content {
      height: 100% !important;
    }
  }
  .fl-input-radius {
    .ant-input-group > .ant-input:first-child,
    .ant-input-group-addon:first-child {
      border-radius: 24px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    .ant-input-search
      > .ant-input-group
      > .ant-input-group-addon:last-child
      .ant-input-search-button {
      border-radius: 0 24px 24px 0;
    }
  }
  .hover-menu:hover {
    span {
      color: #ed1117 !important;
      svg path {
        fill: #ed1117;
      }
    }
  }
  .div-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .account-infor-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  .account-infor-sumary-border {
    border-radius: 20px;
    border: 1px solid #a3a3a3;
    gap: 2px;
    padding: 2.5px 2.5px;
  }
  .account-info-sumary-border-admin {
    border-radius: 20px;
    border: 1px solid #a3a3a3;
    gap: 2px;
    padding: 2.5px 2.5px;
  }
  .account-infor-sumary {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 2px;
    span {
      svg path {
        fill: #000;
      }
      .fullname {
        font-size: 12px !important;
        color: #a3a3a3;
        font-weight: 600;
        max-width: 160px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .account {
        font-size: 12px !important;
        color: #a3a3a3;
        font-style: italic;
      }
    }
  }
  .spacement_pp {
    /* height: 17px; */
    height: 15px;
    margin-bottom: 10px;
    position: sticky;
    top: 60px;
    background: #fff;
    z-index: 10;
  }
  position: relative;
  .admin-header {
    position: sticky;
    top: 0;
    z-index: 100;
    filter: drop-shadow(0px 1px 10px rgba(0, 0, 0, 0.1));
  }
  .breadcrumb-header {
    box-shadow: inset 0 5px 10px #ebebeb;
    padding: 15px 0;
    background: #f7f7f7;
  }
  .box-breadcrumb-header {
    background-color: #fff;
    /* padding-bottom: 20px; */
  }
  .background-animation {
    position: fixed;
    bottom: 40px;
    left: 40px;
    background-color: #c7dcff;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    animation: Background-zoom 2.3s ease-in-out infinite;
  }
  .chatbot {
    position: fixed;
    bottom: 40px;
    right: 40px;
  }
  .phone-animate {
    position: fixed;
    bottom: 62px;
    left: 62px;
    animation: App-logo-spin 1s ease-in-out infinite;
  }
  @keyframes Background-zoom {
    0%,
    100% {
      transform: rotate(0) scale(0.7) skew(1deg);
      opacity: 0.2;
    }

    50% {
      transform: rotate(0) scale(1) skew(1deg);
      opacity: 0.2;
    }
  }
  @keyframes App-logo-spin {
    0%,
    100%,
    50% {
      transform: rotate(0) scale(1) skew(1deg);
    }

    10%,
    30% {
      transform: rotate(-25deg) scale(1) skew(1deg);
    }
    20%,
    40% {
      transform: rotate(25deg) scale(1) skew(1deg);
    }
  }
  .name-branch {
    text-transform: uppercase;
    color: #154398;
  }
  .login-item {
    &:first-child {
      padding: 0 20px;
      margin-right: 20px;
      border-right: 1px solid #999;
    }
    .login-item_text {
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      color: #777;
      margin-left: 6px;
    }
    .login-icon {
      svg {
        width: 13px;
        height: 13px;
      }
    }
    .register-icon {
      svg {
        width: 20px;
        height: 20px;
      }
    }
    svg {
      path {
        fill: #777;
      }
    }
  }
  .change-rule {
    height: 100%;
    .change-rule_item {
      height: 100%;
      padding: 12px 20px;
      color: #fff;
      font-size: 16px;
      margin-right: -20px;
      cursor: pointer;
      margin-left: 24px;
      span.anticon.anticon-export {
        font-size: 18px;
      }
    }
    .candidate {
      background-color: #00b2a3;
    }
    .business {
      background-color: rgb(24 38 66);
    }
  }
  .ant-layout {
    background-color: #fff;
  }

  .flex-end-col {
    display: flex;
    justify-content: flex-end;
  }

  .ant-badge-multiple-words {
    padding: 0px 5px;
  }
  .ant-scroll-number-only-unit {
    font-size: 10px;
  }
  .ant-badge-count {
    font-size: 10px;
  }
  /* .layout-action {
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-top: 10px !important;
    width: 100%;
    justify-content: space-between;
    @media only screen and (min-width: 700px) {
      margin: unset !important;
      width: unset;
      justify-content: unset;
      margin-top: 0px !important;
    }
  } */
`

export const CustomMenuStyled = styled.div`
  width: 100%;
  height: 100%;
  .ant-menu-submenu-selected::after {
    border-bottom: unset !important;
    content: "";
    width: 10px;
    height: 6px;
    bottom: 0px;
    right: 0;
    position: absolute;
    left: 0;
    margin: auto;
  }

  .ant-menu-item,
  .ant-menu-submenu {
    padding: 0px 12px !important;
    margin-bottom: 12px !important;
    top: 11px;
    display: flex;
    align-items: center;
  }

  .ant-menu-submenu-popup .ant-menu-vertical .ant-menu-submenu {
    border-bottom: 1px dashed #e1e1e1;
    &:last-child {
      border-bottom: unset;
    }
  }
  .ant-menu-submenu:hover::after {
    border-bottom: unset !important;
  }
  .ant-menu-horizontal {
    border-bottom: 0px;
  }
  .ant-menu-title-content {
    color: #154398;
    font-weight: 600;
  }

  .ant-menu-item:hover::after {
    border-bottom: unset !important;
  }
  .ant-menu-submenu:hover {
    color: transparent !important;
  }
  .ant-menu-submenu::after {
    border: unset !important;
  }
  .ant-menu-item-selected .ant-menu-title-content {
    color: #ed1117 !important;
  }
  .ant-menu-submenu-selected .ant-menu-submenu-title span {
    color: #ed1117 !important;
  }
  .ant-menu-item:hover .ant-menu-title-content {
    color: #ed1117 !important;
  }
  .ant-menu-overflow-item:hover
    .ant-menu-submenu-title
    .ant-menu-title-content {
    color: #ed1117 !important;
  }
  .ant-menu-item-selected::after {
    border-bottom: unset !important;
    content: "";
    width: 10px;
    height: 6px;
    bottom: 0px;
    right: 0;
    position: absolute;
    left: 0;
    margin: auto;
  }
  .ant-menu-item-active::after {
    border-bottom: unset !important;
  }
  .ant-menu-horizontal > .ant-menu-item::after {
    transition: unset !important;
  }
`
export const StyleRegisterModal = styled.div`
  .ant-input {
    border-radius: 4px !important;
  }
  .remember {
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .forget-pass {
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    text-align: right;
    color: #154398;
  }
  .btn-register {
    width: 100%;
    height: 56px !important;
    background: #154398;
    border-radius: 4px !important;
  }
  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    .link-login {
      font-weight: 600;
      color: red;
      cursor: pointer;
    }
  }
  .ant-checkbox-inner {
    border: 2px solid #666666;
  }

  .center {
    width: 100%;
    justify-content: center;
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .or {
    ant-col {
      position: relative;
    }
    .ant-btn:hover,
    .ant-btn:focus {
      color: #212529 !important;
      border-color: #d2e3fc !important;
      background: rgba(66, 133, 244, 0.04) !important;
    }
    .ant-btn {
      position: absolute;
      right: 0;
      height: 32px !important;
      border-radius: 4px !important;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Google Sans", arial, sans-serif;
        font-weight: 500;
        font-size: 14px;
        text-align: center;
        color: #212529;
        span {
          svg {
            width: 23px;
            height: 23px;
          }
          margin-right: 10px;
        }
      }
    }
    #signInDiv {
      iframe {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }
`
export const StyleLoginModal = styled.div`
  .ant-input {
    border-radius: 4px !important;
  }

  .remember {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .forget-pass {
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    text-align: right;
    margin-bottom: 20px;
    color: #154398;
    display: flex;
    justify-content: end;
  }
  .btn-login {
    width: 100%;
    height: 56px !important;
    border-radius: 4px !important;
  }
  .register {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
    .link-regis {
      font-weight: 600;
      cursor: pointer;
      color: red;
    }
  }
  .ant-checkbox-inner {
    border: 2px solid #666666;
    border-radius: 0px;
  }
  .space-between {
    justify-content: space-between;
    align-items: flex-start;
  }
  .ant-checkbox-wrapper {
    font-weight: 400;
    font-size: 14px;
    color: #666666;
  }

  .center {
    width: 100%;
    justify-content: center;
    padding-top: 24px;
    padding-bottom: 24px;
  }
  .or {
    ant-col {
      position: relative;
    }
    .ant-btn:hover,
    .ant-btn:focus {
      color: #212529 !important;
      border-color: #d2e3fc !important;
      background: rgba(66, 133, 244, 0.04) !important;
    }
    .ant-btn {
      position: absolute;
      right: 0;
      height: 32px !important;
      border-radius: 4px !important;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Google Sans", arial, sans-serif;
        font-weight: 500;
        font-size: 14px;
        text-align: center;
        color: #212529;
        span {
          svg {
            width: 23px;
            height: 23px;
          }
          margin-right: 10px;
        }
      }
    }
    #signInDiv {
      iframe {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }
`

export const StyleSelectRegisterModal = styled.div`
  .div-modal-select,
  .modal-select {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-select {
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(21, 67, 152, 0.1);
    border-radius: 8px;
    width: 263px;
    height: 199px;
    flex-direction: column;
    position: relative;
    ::after {
      content: "";
      display: block;
      width: 100%;
      height: 0px;
      background: linear-gradient(90deg, #154297 0%, #ed1e24 100%);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    :hover::after {
      height: 4px;
    }
    :hover {
      box-shadow: 0px 2px 20px rgba(21, 67, 152, 0.2);
      border-bottom: 4px solid linear-gradient(90deg, #154297 0%, #ed1e24 100%);
    }
    .title {
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      color: #154398;
      margin-top: 24px;
    }
  }
`

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  .user-information {
    padding-right: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;

    .user-name {
      font-weight: 600;
      color: ${({ theme }) => theme.white};
      margin-bottom: 8px;
      width: max-content;
      line-height: 1;
    }

    .user-role {
      color: ${({ theme }) => theme.white};
      font-size: 13px;
      margin-bottom: 0px;
      text-align: right;
      line-height: 1;
    }
  }

  .style-avt {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid #fff;
  }
  .notification_count {
    svg path {
      stroke: #a3a33a;
    }
  }
  .div-notification_count {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
