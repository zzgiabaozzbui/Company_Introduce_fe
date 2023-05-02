import { Col, Row, Select } from "antd"
import { useSelector } from "react-redux"
import FlInput from "src/components/FloatingLabel/Input"
import FlSelect from "src/components/FloatingLabel/Select"
import { SYSTEM_KEY } from "src/constants/constants"
import { getListComboByKey } from "src/lib/utils"
import { SearchStyled } from "../styled"

const { Option } = Select
const Search = ({ setStatus, getAllUser, setTextSearch, status }) => {
  const { listSystemKey } = useSelector(state => state.appGlobal)

  return (
    <SearchStyled>
      <Row gutter={[16, 16]}>
        <Col flex="auto">
          <FlInput
            onChange={e => setTextSearch(e?.target?.value)}
            onSearch={getAllUser}
            search
            allowClear
            label="Nhập tên tài khoản, số điện thoại, email"
          />
        </Col>
        <Col lg={5} xs={24}>
          <FlSelect
            label="Trạng thái"
            onChange={Status => {
              setStatus(Status)
            }}
            value={status}
          >
            {getListComboByKey(SYSTEM_KEY?.COMMON_STATUS, listSystemKey)?.map(
              i => (
                <Option key={+i.CodeValue} value={+i.CodeValue}>
                  {i?.Description}
                </Option>
              ),
            )}
          </FlSelect>
        </Col>
      </Row>
    </SearchStyled>
  )
}

export default Search
