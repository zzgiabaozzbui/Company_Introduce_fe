import { Spin, Tree } from "antd"
import _ from "lodash"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import { GUIDE_EMPTY } from "src/constants/constants"
import PostService from "src/services/PostService"
import { TreeAnchorStyled } from "../../ListUser/styled"
import InsertCategory from "./InsertCategory"
import styled from "styled-components"
import CustomModal from "src/components/Modal/CustomModal"
export const sort = items => {
  return _.orderBy(items, ["Level", "NumericalOrder"], ["asc", "asc"])
}

const StyleTree = styled.div`
  .ant-tree-node-content-wrapper {
    width: 100% !important;
  }
  .ant-tree-treenode {
    /* border-bottom: 1px solid #000; */
    :hover {
      background: #f0f0f0;
      padding: 5px 0px;
      border-radius: 5px;

      .text-ellipsis-hover {
        font-weight: bold !important;
        /* color: #ff7875 !important; */
      }
    }
  }
`
const TreeCategoryModal = ({ openModal, onCancel, setReload }) => {
  const { state } = useLocation()

  const [loading, setLoading] = useState(false)
  const [lstCate, setLstCate] = useState([])
  const [btn, setbtn] = useState([])

  const [expandedKeys, setExpandedKeys] = useState([
    "00000000-0000-0000-0000-000000000000",
  ])
  const [open, setOpen] = useState()

  const [treeData, setTreeData] = useState([])
  const ACTION = [
    {
      icon: "add-box",
      title: "Thêm danh mục",
      onClick: nodeData => setOpen(nodeData),
      static: true,
    },
    {
      icon: "edit-black",
      title: "Sửa thông tin",
      onClick: nodeData => setOpen({ ...nodeData, isEdit: true }),
      static: false,
    },
    {
      icon: "delete-black",
      title: "Xóa danh mục",
      static: false,
      onClick: nodeData => {
        CB1({
          title: `Bạn có chắc chắn muốn xoá danh mục
          <strong> ${nodeData?.CategoryPostName}</strong> không?`,
          icon: "trashRed",
          okText: "Đồng ý",
          onOk: async close => {
            onDeleteCategory(nodeData?.key)
            close()
          },
        })
      },
    },
  ]

  useEffect(() => {
    getListCategory()
  }, [])

  const onDeleteCategory = async id => {
    try {
      const res = await PostService.deleteCategory([id])
      if (res?.isError) return
      Notice({ msg: "Xóa danh mục thành công!" })
      getListCategory()
      setReload(pre => [...pre])
    } finally {
    }
  }

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
        CategoryPostID: GUIDE_EMPTY,
      })
      if (res?.isError) return
      setLstCate(res?.Object?.data)
      setbtn(res?.Object?.ButtonShow)
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
      let expandList = ["00000000-0000-0000-0000-000000000000"]
      res?.Object?.data?.map(item => {
        if (item?.ParentID === "00000000-0000-0000-0000-000000000000")
          expandList.push(item?.CategoryPostID)
      })
      setExpandedKeys(pre => expandList)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CustomModal
      title={"Danh mục bài viết"}
      footer={null}
      width={"60%"}
      open={!!openModal}
      onCancel={onCancel}
    >
      <Spin spinning={loading}>
        <StyleTree>
          <TreeAnchorStyled>
            {!!treeData?.length && (
              <Tree
                // defaultExpandAll
                defaultExpandedKeys={expandedKeys}
                treeData={treeData}
                titleRender={(nodeData, idx) => {
                  return (
                    <div
                      key={nodeData?.key}
                      className="d-flex justify-content-space-between align-items-center mh-36"
                    >
                      <div
                        className={`text-ellipsis text-ellipsis-hover ${
                          nodeData?.Status === 1 ? "" : "block-node"
                        }`}
                      >
                        {nodeData?.title}
                      </div>
                      <div
                        className="list-button-tree-hover"
                        style={{ display: "flex" }}
                      >
                        {nodeData?.Level !== 0 ? (
                          <>
                            {!!btn?.IsInsert && (
                              <ButtonCircle
                                key={ACTION[0]?.icon}
                                title={ACTION[0]?.title}
                                iconName={ACTION[0]?.icon}
                                onClick={() => {
                                  ACTION[0].onClick(nodeData)
                                }}
                              />
                            )}
                            {!!btn?.IsUpdate && (
                              <ButtonCircle
                                key={ACTION[1]?.icon}
                                title={ACTION[1]?.title}
                                iconName={ACTION[1]?.icon}
                                onClick={() => {
                                  ACTION[1].onClick(nodeData)
                                }}
                              />
                            )}
                            {!!btn?.IsDelete && (
                              <ButtonCircle
                                key={ACTION[2]?.icon}
                                title={ACTION[2]?.title}
                                iconName={ACTION[2]?.icon}
                                onClick={() => {
                                  ACTION[2].onClick(nodeData)
                                }}
                              />
                            )}
                          </>
                        ) : (
                          // ACTION?.map(item => (
                          //   <ButtonCircle
                          //     key={item?.icon}
                          //     title={item?.title}
                          //     iconName={item?.icon}
                          //     onClick={() => {
                          //       item.onClick(nodeData)
                          //     }}
                          //   />
                          // ))
                          !!btn?.IsInsert && (
                            <ButtonCircle
                              key={ACTION[0]?.icon}
                              title={ACTION[0]?.title}
                              iconName={ACTION[0]?.icon}
                              onClick={() => {
                                ACTION[0].onClick(nodeData)
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )
                }}
              />
            )}
            {!!open && (
              <InsertCategory
                open={open}
                onCancel={() => setOpen(undefined)}
                onOk={getListCategory}
                reload={() => {
                  setReload(pre => [...pre])
                }}
              />
            )}
          </TreeAnchorStyled>
        </StyleTree>
      </Spin>
    </CustomModal>
  )
}

export default TreeCategoryModal
