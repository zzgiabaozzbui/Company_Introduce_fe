import { Spin, Tree } from "antd"
import { useEffect, useState } from "react"
import { FloatActionWrapper } from "src/components/FloatAction/styles"
import CB1 from "src/components/Modal/CB1"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import Notice from "src/components/Notice"
import { GUIDE_EMPTY } from "src/constants/constants"
import { convertTreeData } from "src/lib/utils"
import Department from "src/services/Department"
import ModalAddDept from "../../Department/components/ModalAddDept"
import { TreeAnchorStyled } from "../styled"

const TreeAnchor = ({ keyId, selectedNode, setSelectedNote, getAllUser }) => {
  const [loading, setLoading] = useState(false)
  const [listDept, setListDept] = useState()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [dataInfo, setDataInfo] = useState(undefined)
  const [button, setButton] = useState()

  useEffect(() => {
    getListDepartment()
  }, [])

  const getListDepartment = async () => {
    try {
      setLoading(true)
      const res = await Department.getListDept({ departmentName: "" })
      const tree = convertTreeData([...res.Object.data], true)
      setListDept(tree)
      setSelectedNote(e => (!e ? tree[0] : e))
      setButton(res?.Object?.buttonShow)
    } finally {
      setLoading(false)
    }
  }

  const ACTION = [
    {
      visible: button?.IsInsertUpdate,
      icon: "add-blue",
      title: "Thêm phòng ban",
      onClick: nodeData => {
        setIsOpenModal(true)
        setDataInfo(nodeData)
      },
    },
    {
      visible: button?.IsInsertUpdate,
      icon: "edit",
      title: "Sửa thông tin",
      onClick: nodeData => {
        setIsOpenModal(true)
        setDataInfo(nodeData)
        setIsEdit(true)
      },
    },
    {
      visible: button?.IsDelete,
      icon: "deleteRow",
      title: "Xóa phòng ban",
      onClick: nodeData => {
        CB1({
          title: `Bạn có chắc chắn muốn xoá phòng ban
          ${nodeData?.DepartmentName} không? 
          Nhân viên trong phòng ban này sẽ bị xóa kèm theo phòng ban!!!`,
          icon: "warning-usb",
          okText: "Đồng ý",
          onOk: async close => {
            setLoading(true)
            Department.deleteDept({ DepartmentId: nodeData.DepartmentID })
              .then(res => {
                if (res.isOk) {
                  Notice({
                    msg: "Thành công",
                    isSuccess: true,
                  })
                  getListDepartment()
                  getAllUser()
                }
              })
              .finally(() => {
                setLoading(false)
              })
            close()
          },
        })
      },
    },
  ]

  return (
    <TreeAnchorStyled>
      <Spin spinning={loading}>
        <div className="div-all">
          <div className="fs-16 fw-600 mt-0 mb-10">Danh sách phòng ban</div>
          {button?.IsInsertUpdate && (
            <div className="float-action__wrapper">
              <ButtonCircle
                style={{ margin: "0 5px" }}
                title={"Thêm phòng ban"}
                key={"add-blue"}
                iconName={"add-blue"}
                onClick={() => {
                  setIsOpenModal(true)
                  setDataInfo({
                    DepartmentName: "HEART AND VIRTUE",
                    DepartmentID: GUIDE_EMPTY,
                  })
                }}
              />
            </div>
          )}
        </div>
        {!!listDept?.length && (
          <Tree
            defaultExpandAll
            treeData={listDept}
            selectedKeys={[selectedNode?.key]}
            onSelect={(_, e) => setSelectedNote(e?.node)}
            titleRender={(nodeData, idx) => {
              return (
                <div key={idx + 1} className="d-flex align-items-center">
                  {nodeData.title}
                  {keyId > 0 && (
                    <div className="list-button">
                      {ACTION?.filter(i => !!i?.visible).map(value => (
                        <ButtonCircle
                          style={{ margin: "0 5px" }}
                          title={value.title}
                          key={value.icon}
                          iconName={value.icon}
                          onClick={() => {
                            value.onClick(nodeData)
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            }}
          />
        )}
      </Spin>
      {isOpenModal && (
        <ModalAddDept
          isEdit={isEdit}
          visible={isOpenModal}
          dataInfo={dataInfo}
          onCancel={() => {
            setIsOpenModal(false)
            setDataInfo(undefined)
            setIsEdit(false)
          }}
          onOk={() => {
            getListDepartment()
            getAllUser()
          }}
        />
      )}
    </TreeAnchorStyled>
  )
}

export default TreeAnchor
