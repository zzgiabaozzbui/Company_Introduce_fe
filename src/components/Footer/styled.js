import styled from "styled-components"

export const WrapFooter = styled.div`
  background-color: #e08081;
  padding: "24px";
  &.clip_path {
    clip-path: circle(190vh at 50% 190vh);
  }
  .logo {
  }
  .footer_content {
    color: "#fff";
    line-height: 1.5;
    font-size: 18px;
    margin-bottom: 16px;
  }
  .send-email {
    height: 40px;
    margin-bottom: 40px;
    &_input {
      height: 100%;
      width: 300px;
      border-radius: 16px;
      border: unset;
      margin-right: 16px;
      padding: 4px 16px;

      &:focus {
        border: unset;
        outline: none;
      }
    }
    &_button {
      height: 100%;
      width: 100px;
      color: #fff;
      background: #cf1322;
      border: unset;
      border-radius: 8px;
      font-weight: 700;
      cursor: pointer;
    }
  }
  .last-info {
    color: #fff;
    margin-top: 60px;
    font-size: 15px;
    font-weight: 500;
  }
  .title {
    font-size: 24px;
    color: #fff;
    margin-bottom: 24px;
  }

  .item-social {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 8px;
    border-radius: 6px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &.fb {
      background-color: #3b5998;
    }
    &.mail {
      background-color: #111;
    }
  }
`
