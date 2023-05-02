import { Col, Row } from "antd"
import Login from "./component/Login"
const Dashboard = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}></Col>
        <Col span={8}>
          <div className="p-24">
            <Login />
          </div>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  )
}
export default Dashboard
