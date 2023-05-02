import { Spin, Tooltip, Tree } from "antd"
import _ from "lodash"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CB1 from "src/components/Modal/CB1"
import Notice from "src/components/Notice"
import { GUIDE_EMPTY } from "src/constants/constants"
import PostService from "src/services/PostService"
import styled from "styled-components"
import { TreeAnchorStyled } from "../../ListUser/styled"
import InsertCategory from "../modal/InsertCategory"
import FlInput from "src/components/FloatingLabel/Input"
export const sort = items => {
  return _.orderBy(items, ["Level", "NumericalOrder"], ["asc", "asc"])
}
const StyleTree = styled.div`
  .ant-tree-node-content-wrapper {
    width: 100% !important;
  }
`
const TreeCategory = ({ selectedNode, setSelectedNote, reload, setTotal1 }) => {
  const { state } = useLocation()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState()

  const [treeData, setTreeData] = useState([])
  useEffect(() => {
    getListCategory()
  }, [reload])

  const nest = (items, id, link) =>
    items
      ?.filter(item => item[link] === id)
      .map(item => ({
        ...item,
        title: item.CategoryPostName,
        key: item.CategoryPostID,
        children: nest(items, item?.CategoryPostID, link),
      }))

  const getListCategory = async () => {
    try {
      setLoading(true)
      const res = await PostService.getListCategoryPost({
        TextSearch: "",
      })
      if (res?.isError) return
      // sort(res?.Object?.data)
      const tree = nest(
        sort([
          {
            CategoryCode: "TAT_CA",
            CategoryPostID: "00000000-0000-0000-0000-000000000000",
            CategoryPostName: "Tất cả",
            Description: null,
            IsStatic: true,
            Level: 0,
            NumericalOrder: 2,
            ParentID: "-1",
            Status: 1,
          },
          ...res?.Object?.data,
        ]),
        // GUIDE_EMPTY,
        "-1",
        "ParentID",
      )

      setTreeData(tree)
      setSelectedNote(e =>
        !e ? (state?.selectedNode ? state?.selectedNode : tree[0]) : e,
      )
      setTotal1(pre => res?.Object?.total)
    } finally {
      setLoading(false)
    }
  }
  const getListSearch = async TextSearch => {
    const res = await PostService.getListCategoryPost({
      TextSearch: TextSearch,
    })
    if (res?.isError) return
    const tree = nest(
      sort([
        {
          CategoryCode: "TAT_CA",
          CategoryPostID: "00000000-0000-0000-0000-000000000000",
          CategoryPostName: "Tất cả",
          Description: null,
          IsStatic: true,
          Level: 0,
          NumericalOrder: 2,
          ParentID: "-1",
          Status: 1,
        },
        ...res?.Object?.data,
      ]),
      "-1",
      "ParentID",
    )
    setTreeData(tree)
    setTotal1(pre => res?.Object?.total)
  }

  return (
    <Spin spinning={loading}>
      <StyleTree className="pr-10">
        <TreeAnchorStyled>
          <FlInput
            search
            allowClear
            label="Nhập tên danh mục bài viết"
            onChange={e => getListSearch(e?.target?.value)}
          />
          {!!treeData?.length && (
            <Tree
              defaultExpandAll
              selectedKeys={[selectedNode?.key]}
              treeData={treeData}
              onSelect={(_, e) => {
                // !!(e?.node?.Status === 1) &&
                setSelectedNote(e?.node)
              }}
              titleRender={(nodeData, idx) => {
                return (
                  <Tooltip title={nodeData?.title}>
                    <div
                      key={nodeData?.key}
                      className="d-flex justify-content-space-between align-items-center mh-36"
                    >
                      <div
                        className={`text-ellipsis ${
                          nodeData?.Status === 1 ? "" : "block-node"
                        }`}
                      >
                        {nodeData?.title}
                      </div>
                    </div>
                  </Tooltip>
                )
              }}
            />
          )}
          {!!open && (
            <InsertCategory
              open={open}
              onCancel={() => setOpen(undefined)}
              onOk={getListCategory}
            />
          )}
        </TreeAnchorStyled>
      </StyleTree>
    </Spin>
  )
}

export default TreeCategory
