import styled from "styled-components"

export const StyleLogin = styled.div`
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
