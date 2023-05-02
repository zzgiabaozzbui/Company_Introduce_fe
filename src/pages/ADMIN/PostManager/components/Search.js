import { Col, DatePicker, Row, Select } from "antd"
import React from "react"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import Button from "src/components/MyButton/Button"
import { SearchStyled } from "../styled"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import { useSelector } from "react-redux"
import moment from "moment"

const { RangePicker } = DatePicker
const { Option } = Select

const Search = ({ onAdd, pagination, setPagination, setTextSearch }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)

  return (
    <SearchStyled className="pt-0">
      <Row gutter={[16, 16]}>
        <Col flex="auto">
          <FlInput
            search
            allowClear
            label="Nhập tiêu đề bài viết"
            onChange={e => setTextSearch(e?.target?.value)}
            onSearch={() => setPagination(pre => ({ ...pre, CurrentPage: 1 }))}
          />
        </Col>
        <Col lg={7} xs={24}>
          <RangePicker
            placeholder={["Từ ngày", "Đến ngày"]}
            format="DD/MM/YYYY"
            onChange={value =>
              setPagination(pre => ({
                ...pre,
                CurrentPage: 1,
                FromDate:
                  value?.length && value[0]
                    ? moment(value[0]).format()
                    : undefined,
                ToDate:
                  value?.length && value[1]
                    ? moment(value[1]).format()
                    : undefined,
              }))
            }
          />
        </Col>
        <Col lg={5} xs={24}>
          <FlSelect
            value={pagination?.Status}
            label="Trạng thái"
            allowClear
            onChange={Status =>
              setPagination(pre => ({ ...pre, CurrentPage: 1, Status }))
            }
          >
            <Option key={"allStarusTopic"} value={0}>
              Tất cả
            </Option>
            {getListComboByKey(SYSTEM_KEY?.POST_STATUS, listSystemKey)?.map(
              i => (
                <Option key={+i.CodeValue} value={+i.CodeValue}>
                  {i?.Description}
                </Option>
              ),
            )}
          </FlSelect>
        </Col>

        {/* <Col>
          <Button
            btnType="primary"
            className="btn-hover-shadow"
            onClick={onAdd}
          >
            Thêm bài viết
          </Button>
        </Col> */}
      </Row>
    </SearchStyled>
  )
}

export default Search
