import { Col, Image, Row, Select, Spin } from "antd"
import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import CB1 from "src/components/Modal/CB1"
import CustomModal from "src/components/Modal/CustomModal"
import Button from "src/components/MyButton/Button"
import Notice from "src/components/Notice"
import { STATUS_POST } from "src/constants/constants"
import { SYSTEM_KEY } from "src/constants/constants"
import { formatMoney, getListComboByKey } from "src/lib/utils"
import PostService from "src/services/PostService"
import styled from "styled-components"
const StyledDetailHistory = styled.div`
  .box-his {
    background: #f0f0f0;
    padding: 16px;
    border-radius: 15px;
  }
  .box-content {
    border-radius: 10px;
    border: 1px solid #f0f0f0;
  }
`
const DetailHistoryModal = ({ open, onCancel }) => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const { listSystemKey } = useSelector(state => state.appGlobal)
  useEffect(() => {
    getListHistory()
  }, [])
  const getListHistory = async () => {
    try {
      setLoading(true)
      const res = await PostService.getDetailHistory({
        Version: open?.Version.split(".")[0],
        PostID: open?.PostID,
      })
      setHistory(res?.Object)
      // res?.Object?.Data?.map(item => {
      //   let key = item?.PostID
      //   form.setFieldsValue({
      //     [key]: item?.SortOrder,
      //   })
      // })
    } finally {
      setLoading(false)
    }
  }

  const reset = async body => {
    try {
      setLoading(true)
      const res = await PostService.updatePost({
        ...body,
      })
      if (!!res?.isError) return

      Notice({
        isSuccess: true,
        msg: "Cập nhật thành công!",
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <CustomModal
      title={"Chi tiết bài viết"}
      footer={
        <div className="d-flex-end w-100">
          <Button
            btnType="primary"
            onClick={() =>
              CB1({
                title: "Bạn có chắc chắn muốn khôi phục bài viết này không?",
                icon: "trashRed",
                okText: "Đồng ý",
                onOk: async close => {
                  reset(history)
                  close()
                },
              })
            }
          >
            Khôi phục
          </Button>
        </div>
      }
      width={"80%"}
      open={!!open}
      onCancel={onCancel}
    >
      <StyledDetailHistory>
        <Spin spinning={loading}>
          <Row gutter={[16, 16]} className={"box-his"}>
            <Col span={24}>
              <div>
                <div className="fw-600 mr-8">Hình thu nhỏ: </div>
                <div className="mt-10">
                  <Image
                    src={history?.Image}
                    alt={"Tin tức"}
                    style={{ width: 100 }}
                  />
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex align-items-flex-start">
                <div className="fw-600 mr-8" style={{ whiteSpace: "nowrap" }}>
                  Tiêu đề:{" "}
                </div>
                <div>{history?.Title}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex-start">
                <div className="fw-600 mr-8">Tác giả: </div>
                <div>{history?.Author} </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex-start">
                <div className="fw-600 mr-8">Nhuận bút(VNĐ): </div>
                <div>{formatMoney(history?.Royalties)}đ</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex-start">
                <div className="fw-600 mr-8">Tags phổ biến: </div>
                <div>{history?.ListTagsName?.join()} </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex align-items-flex-start">
                <div className="fw-600 mr-8" style={{ whiteSpace: "nowrap" }}>
                  Tóm tắt:{" "}
                </div>
                <div>{history?.Summary}</div>
              </div>
            </Col>

            <Col span={12}>
              <div className="d-flex-start">
                <div className="fw-600 mr-8">Thứ tự: </div>
                <div>{history?.SortOrder}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex-start">
                <div className="fw-600 mr-8">Cho phép bình luận: </div>
                <div>{!!history?.IsComment ? "Có" : "Không"}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex-start">
                <div className="fw-600 mr-8">Ngày đăng: </div>
                <div>{moment(history?.PublishDate)?.format("dd/MM/yyyy")} </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="d-flex-start">
                <div className="fw-600 mr-8">Trạng thái: </div>
                <div
                  className="fw-600"
                  style={{ color: STATUS_POST[history?.Status] }}
                >
                  {
                    getListComboByKey(
                      SYSTEM_KEY?.POST_STATUS,
                      listSystemKey,
                    )?.find(item => item?.CodeValue === history?.Status)
                      ?.Description
                  }{" "}
                </div>
              </div>
            </Col>

            <Col span={12}>
              <div className="d-flex-start">
                <div className="fw-600 mr-8">Danh mục: </div>
                <div>{history?.CategoryPostName} </div>
              </div>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={3} className="fw-600 mr-8">
                  Danh mục khác:{" "}
                </Col>
                <Col span={20}>{history?.CategoryPostNamend}</Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className="mt-16">
            <Col span={24}>
              <div>
                <div className="fw-600 mr-8">Nội dung bài viết: </div>
                <div className="mt-16 p-16 box-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: history?.Content,
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Spin>
      </StyledDetailHistory>
    </CustomModal>
  )
}

export default DetailHistoryModal
