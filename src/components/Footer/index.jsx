import { Col, Row } from "antd"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
import { useLocation } from "react-router-dom"
import { WrapFooter } from "./styled"
import { listMenu } from "./Link"

const Footer = () => {
  const location = useLocation()
  console.log(location.pathname)

  return (
    <WrapFooter className={"p-24 mt-20"}>
      <Row gutter={24}>
        <Col xs={24} sm={24} lg={12} xl={8}>
          <div className="footer_content fw-500 mt-16 white">
            Subscribe to Our Newsletter
          </div>
          <div className="send-email d-flex align-items-center ">
            <input
              type="Email"
              className="send-email_input"
              placeholder="Email"
            />
            <button className="send-email_button">SEND</button>
          </div>
          <div className="footer_content fw-600 white">ABN: 13 656 767 761</div>
        </Col>
        <Col xs={24} sm={24} lg={12} xl={8}>
          <div className="title">QUICK LINKS</div>
          {listMenu
            .filter(i => !i.submenu)
            .map((item, idx) => (
              <a href={item.path} className="footer_content white">
                <div className="footer_content d-flex align-items-center">
                  <BsFillArrowRightCircleFill />
                  <div className="ml-5">{item.name}</div>
                </div>
              </a>
            ))}
        </Col>
        <Col xs={24} sm={24} lg={12} xl={8}>
          <div className="title">MELBOURNE BRANCH</div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1573.8863710536734!2d144.73976765113542!3d-37.91237427500442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6862d3ef3361d%3A0x137b7dd85a80b314!2s12%20Airlie%20Ave%2C%20Point%20Cook%20VIC%203030%2C%20%C3%9Ac!5e0!3m2!1svi!2s!4v1678006863358!5m2!1svi!2s"
              width="100%"
              height="200"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="mb-24"
            ></iframe>
          </div>
        </Col>

        <Col span={24} className="footer_content last-info">
          Copyright 2012 - 2022 | Anytime Care | All Rights Reserved
        </Col>
      </Row>
    </WrapFooter>
  )
}
export default Footer
