import styled from "styled-components"

export const DepartmentWrapper = styled.div`
  .ant-anchor-ink {
    visibility: hidden;
  }
`

export const TreeWrapper = styled.div`
  overflow-y: auto;
  height: calc(100vh - 128px);

  .ant-anchor-ink {
    visibility: hidden;
  }

  .ant-anchor-link-title-active {
    background-color: #e3e3e3;
    border-radius: 4px;
  }

  .elipcis-tooltip {
    position: relative;
    display: block;
    margin: 6px 0;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.85);
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: all 0.2s;
  }

  .ant-anchor-link-active > .ant-anchor-link-title {
    background-color: none;
    color: #2260bd !important;
  }

  .ant-anchor-link-title {
    .list-button {
      height: 0;
    }

    /* &:hover {
      .list-button {
        display: flex;
        height: auto;
        padding-top: 4px;
        // transition: all linear 0.3s;
        .btn-add {
          color: ${({ theme }) => theme.white};
        }
        .btn-edit {
          color: ${({ theme }) => theme.white};
        }
        .btn-delete {
          color: ${({ theme }) => theme.red500Color};
        }
      }
    } */
  }

  a.ant-anchor-link-title.ant-anchor-link-title-active {
    .list-button {
      display: flex;
      height: auto;
      padding-top: 4px;
      // transition: all linear 0.3s;
      .btn-add {
        color: ${({ theme }) => theme.white};
      }
      .btn-edit {
        color: ${({ theme }) => theme.white};
      }
      .btn-delete {
        color: ${({ theme }) => theme.red500Color};
      }
    }
  }
`
export const TableUserDirectoryWrapper = styled.div``
