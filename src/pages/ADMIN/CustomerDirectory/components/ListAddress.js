import { Tree } from "antd"
import { isEmpty } from "lodash"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TooltipArrow from "src/components/Common/TooltipArrow"
import Delete from "src/components/Modal/Delete"
import Notice from "src/components/Notice"

import {
  setAddressSelect,
  setListAddress,
  setLoading,
} from "src/redux/customerDirectory"
import RegionService from "src/services/RegionService"
import ModalInsertUpdateRegion from "./ModalInsertUpdateRegion"

const ListAddress = () => {
  const dispatch = useDispatch()
  const { listAddress, AddressSelect } = useSelector(
    state => state.customerDirectory,
  )
  const [showModalInsertUpdateRegion, setShowModalInsertUpdateRegion] =
    useState(false)
  const [isUpdateRegion, setIsUpdateRegion] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  useEffect(() => {
    getListAddress()
  }, [])

  const getListAddress = () => {
    dispatch(setLoading(true))
    RegionService.getByRegionId({ regionId: 234 })
      .then(res => {
        if (res.isOk) {
          const data = format(res.Object)
          dispatch(setListAddress(data))
        }
      })
      .finally(() => dispatch(setLoading(false)))
  }

  const format = items =>
    items.map(item => ({
      ...item,
      key: item.RegionID,
      title: item.RegionName,
      isLeaf: item.RegionLevel === 4,
    }))
  const ACTION = [
    {
      isShow: true,
      icon: "add-box",
      title: "Thêm địa điểm",
      onClick: nodeData => {
        setShowModalInsertUpdateRegion(true)
        setIsUpdateRegion(false)
      },
    },
    {
      isShow: true,
      icon: "edit-black",
      title: "Sửa địa điểm",
      onClick: nodeData => {
        setShowModalInsertUpdateRegion(true)
        setIsUpdateRegion(true)
      },
    },
    {
      isShow: true,
      icon: "delete-black",
      title: "Xóa địa điểm",
      onClick: nodeData => {
        setOpenDeleteModal(true)
      },
    },
  ]

  const selectAddress = (key, address) => {
    dispatch(setAddressSelect(address.node))
  }
  const onLoadData = async node => {
    const res = await RegionService.getByRegionId({ regionId: node.key })
    const child = format(res.Object.filter(item => item.ParentID === node.key))
    dispatch(setListAddress(updateTreeNode(listAddress, node.key, child)))
  }
  const updateTreeNode = (treeData, key, children) =>
    treeData.map(node => {
      if (node.key === key) {
        return { ...node, children }
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeNode(node.children, key, children),
        }
      }
      return node
    })
  return (
    <div className="list_address">
      {!isEmpty(listAddress) && (
        <Tree
          treeData={listAddress}
          defaultExpandAll={false}
          loadData={onLoadData}
          onSelect={selectAddress}
          blockNode={true}
          titleRender={nodeData => {
            return (
              <>
                <TooltipArrow
                  overlayStyle={{ maxWidth: 1000 }}
                  title={nodeData.title}
                  lineClamp={1}
                >
                  <div>{nodeData.title}</div>
                </TooltipArrow>
                {/* <Col className="list-button">
                {ACTION.map(
                  value =>
                    value.isShow && (
                      <ButtonCircle
                        title={value.title}
                        iconName={value.icon}
                        onClick={() => {
                          value.onClick()
                        }}
                      />
                    ),
                )}
              </Col> */}
              </>
            )
          }}
        />
      )}
      {showModalInsertUpdateRegion && (
        <ModalInsertUpdateRegion
          visible={showModalInsertUpdateRegion}
          isUpdate={isUpdateRegion}
          onCancel={() => setShowModalInsertUpdateRegion(false)}
          onOk={() => {
            setShowModalInsertUpdateRegion(false)
            getListAddress()
          }}
        />
      )}
      {openDeleteModal && (
        <Delete
          isOpen={openDeleteModal}
          content={{
            title: (
              <div className="fw-600 text-center" style={{ fontSize: 16 }}>
                Bạn có chắc chắn muốn xóa <b>{AddressSelect?.RegionName}</b>{" "}
                không?
              </div>
            ),
          }}
          onOk={() => {
            setOpenDeleteModal(false)
            RegionService.deleteRegion(`?RegionID=${AddressSelect.RegionID}`)
              .then(res => {
                if (res.isOk) {
                  getListAddress()
                  Notice({
                    msg: "Xóa thành công.",
                    isSuccess: true,
                  })
                }
              })
              .finally(() => dispatch(setLoading(false)))
          }}
          onCancel={() => setOpenDeleteModal(false)}
        />
      )}
    </div>
  )
}

export default ListAddress
