import styled from 'styled-components'

export const WrapContent = styled.div`
  width: 360px;
  padding: 16px 8px;
  background: #fff;
  box-shadow: 0 0 12px 3px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .name {
    font-weight: 700;
    font-size: 18px;
    color: #172b4d;
    padding-bottom: 12px;
  }
  .row-info {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    .icon-left {
      margin-right: 8px;
      i {
        color: #6b778c;
      }
    }
    .info-right {
      font-size: 14px;
      color: #516079;
      font-weight: 400;
      &.bold {
        font-weight: 600;
      }
      &.link {
        color: #2387ff;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`
