import { Anchor, Spin, Tooltip } from "antd"
import { useEffect, useState } from "react"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import { convertTreeData } from "src/lib/utils"
import Department from "src/services/Department"
import { DepartmentWrapper, TreeWrapper } from "../styled"

const { Link } = Anchor
const DepartmentManagement = ({ keyId }) => {
  const [loading, setLoading] = useState(false)
  const [listDept, setListDept] = useState()
  // const confirmDeletePosition = department => {
  //   Modal.confirm({
  //     title: "Xoá phòng ban",
  //     icon: <DeleteOutlined color="red" />,
  //     content: (
  //       <div>
  //         Bạn có chắc chắn muốn xoá phòng ban
  //         <strong> {department?.DepartmentName}</strong> không?
  //       </div>
  //     ),
  //     okText: "Đồng ý",
  //     cancelText: "Hủy",
  //     onOk() {},
  //     onCancel() {},
  //   })
  // }

  // const NoDelete = department => {
  //   Modal.warn({
  //     title: "Xoá phòng ban",
  //     width: 600,
  //     content: (
  //       <div>
  //         Đang có {department.NumberUser} người dùng thuộc
  //         <strong> {department?.DepartmentName} </strong> bạn không thể xóa phòng ban
  //         trên! <br />
  //         <p style={{ color: "red" }}>
  //           Hãy xóa/chuyển các người dùng thuộc phòng ban muốn xóa trước.
  //         </p>
  //       </div>
  //     ),
  //   })
  // }

  // const handleDelete = department => {
  //   if (department?.CanDelete) {
  //     confirmDeletePosition(department)
  //   } else {
  //     NoDelete(department)
  //   }
  // }

  const getListDept = async string => {
    try {
      setLoading(true)
      const res = await Department.getListDept({ departmentName: string })
      setListDept(convertTreeData(res.Object.data))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListDept("")
  }, [])

  const ACTION = [
    {
      isShow: true,
      icon: "add-blue",
      title: "Thêm phòng ban",
      onClick: nodeData => {
        // setIsOpenModalAddDep(true)
        // setNodeData(nodeData)
      },
    },
    {
      isShow: true,
      icon: "edit",
      title: "Sửa thông tin",
      onClick: nodeData => {
        // setIsOpenModalAddDep(true)
        // setNodeData(nodeData)
        // setIsEdit(true)
      },
    },
    {
      isShow: true,
      icon: "deleteRow",
      title: "Xóa phòng ban",
      onClick: nodeData => {
        // handleDelete(nodeData)
      },
    },
  ]

  const handleClick = item => {
    const value = item.DepartmentID
  }

  const dataAnchor = (departmentDataList, keyId) => {
    if (!departmentDataList) return []
    return (
      <div>
        {!!departmentDataList &&
          !!departmentDataList.length &&
          departmentDataList.map((item, index) => (
            <Link
              href={`#${item.DepartmentID}`}
              title={
                <>
                  <div
                    onClick={() => handleClick(item)}
                    className="elipcis-tooltip"
                  >
                    <Tooltip mouseEnterDelay={0.7} title={item.DepartmentName}>
                      {item.DepartmentName}
                    </Tooltip>
                  </div>
                  {keyId === 2 && (
                    <div className="list-button">
                      {ACTION.map(
                        value =>
                          value.isShow && (
                            <ButtonCircle
                              style={{ margin: "0 5px" }}
                              title={value.title}
                              iconName={value.icon}
                              onClick={() => {
                                value.onClick(item)
                              }}
                            />
                          ),
                      )}
                    </div>
                  )}
                </>
              }
            >
              {item.children && item.children.length > 0
                ? dataAnchor(item.children, keyId)
                : null}
            </Link>
          ))}
      </div>
    )
  }

  return (
    <DepartmentWrapper>
      <Spin spinning={loading}>
        <TreeWrapper>
          <Anchor affix={false} showInkInFixed={true} offsetTop={80}>
            {dataAnchor(listDept, keyId)}
          </Anchor>
        </TreeWrapper>
      </Spin>
      {/* {isOpenModalAddDep && (
        <ModalAddDep
          isEdit={isEdit}
          item={nodeData}
          visible={isOpenModalAddDep}
          onOk={() => {
            setIsOpenModalAddDep(false)
          }}
          onCancel={() => {
            setIsEdit(false)
            setIsOpenModalAddDep(false)
          }}
        />
      )} */}
    </DepartmentWrapper>
  )
}
export default DepartmentManagement
