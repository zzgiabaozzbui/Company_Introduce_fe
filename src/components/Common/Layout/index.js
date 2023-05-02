import styled from "styled-components"

const LayoutStyled = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
  .content {
    width: 100%;
    max-width: 1300px;
  }
`
const LayoutCommon = props => {
  return (
    <LayoutStyled>
      <div className="content" {...props}>
        {props?.children}
      </div>
    </LayoutStyled>
  )
}

export default LayoutCommon

const LayoutAdmin = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 20px;
  .content {
    width: 100%;
  }
`
export const LayoutHeaderAdmin = props => {
  return (
    <LayoutAdmin>
      <div className="content" {...props}>
        {props?.children}
      </div>
    </LayoutAdmin>
  )
}
