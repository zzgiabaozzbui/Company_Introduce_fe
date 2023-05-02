import { Row, Col, Menu } from "antd"
import { AdminMenuStyled } from "./styled"
import { useNavigate } from "react-router-dom"

const LayoutAdmin = ({ children, selectedKey, menuAdmin }) => {
  const navigate = useNavigate()

  const onChange = menu => {
    !menu?.key?.includes("subkey") &&
      navigate(menu?.key?.replace("submenu", ""))
  }
  return (
    <Row gutter={20} style={{ flexWrap: "nowrap" }} className="ml-16 mr-12">
      <Col style={{ marginLeft: -20 }}>
        <AdminMenuStyled>
          <Menu
            onClick={onChange}
            selectedKeys={selectedKey}
            mode="inline"
            defaultOpenKeys={["subkey1", "subkey2", "subkey3"]}
            items={menuAdmin}
            className="menu-antd-admin"
          />
        </AdminMenuStyled>
      </Col>
      <Col flex="auto" className="pt-12">
        {children}
      </Col>
    </Row>
  )
}

export default LayoutAdmin
