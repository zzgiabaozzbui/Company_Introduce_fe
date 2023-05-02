import styled from "styled-components"

export const CustomerDirectoryStyled = styled.div`
  .mh-36 {
    min-height: 36px;
  }
  .list_address {
    padding: 12px;
    border: 1px solid #dddddd;
    border-radius: 10px;
    min-height: calc(100vh - 90px);
    max-height: calc(100vh - 90px);
    overflow: hidden auto;
    position: sticky;
    top: 85px;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      box-shadow: unset;
      margin: 5px 0px;
    }
    &::-webkit-scrollbar-thumb {
      background: #c5ced9;
      border-radius: 30px;
    }

    .ant-tree .ant-tree-node-content-wrapper.ant-tree-node-selected {
      background: #fff !important;
      font-weight: 600;
      .list-button {
        display: flex;
        flex-wrap: nowrap;
        height: auto;
        padding-top: 4px;
      }
    }
    .ant-tree-treenode {
      .list-button {
        display: none;
      }
    }
    .item-select {
      margin: 0 0 0 23px;
      cursor: pointer;
      font-size: 14px;
      padding: 4px;
      :hover {
        background-color: #f0f0f0;
      }
    }
  }
`
