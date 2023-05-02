import styled from "styled-components"

export const MainTableHeader = styled.div`
  font-size: 13px !important;
`

export const SubTableHeader = styled.div`
  font-style: italic;
  font-size: 13px !important;
  font-weight: 400;
`
export const MainTableData = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const SubTableData = styled.span`
  font-style: italic;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
`

export const CellListContent = styled.div`
  padding: 4px;
  border-bottom: 1px solid #f0f0f0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  margin: 0 -4px;
  &:hover {
    border-bottom: 1px solid #ddd;
  }
  &:last-child {
    border-bottom: unset;
  }
`

export const TableCustomStyled = styled.div`
  /* color: ${props => props.color}; */

  /* height: 100%; */
  .ant-table-thead th.ant-table-column-has-sorters:hover {
    background: ${props => (props.isPrimary ? "#2260BD" : "#EBEBF2")};
  }
  .ant-table-column-sorter-inner {
    svg path {
      fill: rgba(243, 246, 249, 0.5);
    }
    .active {
      svg path {
        fill: #fff;
      }
    }
  }
  .ant-table-wrapper {
    /* height: 100%; */
  }
  .ant-spin-nested-loading {
    /* height: 100%; */
  }
  .ant-table-thead {
    .ant-table-cell {
      /* background: ${props => (props.isPrimary ? "#154398" : "#154398")}; */
      background: ${props => (props.isPrimary ? "#2160bd" : "#154398")};
      color: #fff;
      font-size: 13px;
      min-height: 48px;
    }
  }
  .ant-table-tbody > tr {
    height: 48px;
  }
  .ant-table.ant-table-bordered
    > .ant-table-container
    > .ant-table-header
    > table
    > thead
    > tr
    > th {
    border-right: ${props =>
      props.isPrimary ? "1px solid #f0f0f0" : "1px solid #f0f0f0"};
  }
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-top-left-radius: 4px;
  }
  .ant-table-container table > thead > tr:first-child th:nth-last-child(2) {
    /* border-top-right-radius: 4px; */
    /* border-right: 0px solid #f0f0f0 !important; */
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-top-right-radius: 4px;
  }
  .ant-table-thead > tr > th {
    text-align: center;
  }

  .ant-table-body {
    overflow: auto auto !important;
    /* height: 100%; */
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #c5ced9;
      border-radius: 12px;
    }
  }
  .ant-table-cell-scrollbar:not([rowspan]) {
    box-shadow: none;
  }

  .ant-table-placeholder {
    .ant-table-cell {
      border-bottom: none !important;
    }
  }

  .ant-table-row {
    cursor: pointer;
  }

  .ant-table-row-level-0:hover {
    .float-action__wrapper {
      display: inline-flex;
    }
  }
  .ant-table-tbody > tr:hover {
    .float-action__wrapper {
      min-width: 80px;
      display: inline-flex;
    }
  }
  .ant-table-expanded-row-fixed {
    margin: 0px !important;
    padding: 0px !important;
    width: auto !important;
    ::after {
      border-right: 0px !important;
    }
  }
`
