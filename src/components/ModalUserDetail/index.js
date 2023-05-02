import { Avatar, Col } from 'antd'
import AvatarTemp from 'src/assets/images/AvatarTemplate.png'
import Icon from 'src/components/SvgIcon'
import React from 'react'
import { WrapContent } from './styled'

const ModalUserDetail = ({ userDetail }) => {
  return (
    <WrapContent>
      <Col span={6}>
        <Avatar
          className="avatar-user"
          src={userDetail?.Avatar ? userDetail.Avatar : AvatarTemp}
          size={64}
          style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
        />
      </Col>
      <Col span={18}>
        <div className="name">{userDetail.FullName}</div>
        {userDetail.UserName && (
          <div className="row-info">
            <div className="icon-left">
              <Icon name="perm_identity" size={22} />
            </div>
            <div className="info-right">@{userDetail.UserName}</div>
          </div>
        )}
        {userDetail.SpecializeList.length > 0 && (
          <div className="row-info">
            <div className="icon-left">
              <Icon name="info" size={22} />
            </div>
            <div className="info-right bold">
              {userDetail.SpecializeList.map((Specialize, idx) => (
                <span key={idx}>
                  {Specialize.SpecializeName}
                  {idx < userDetail.SpecializeList.length - 1 ? ' - ' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
        {userDetail.RoleGroupList.length > 0 && (
          <div className="row-info">
            <div className="icon-left">
              <Icon name="phan-quyen" size={22} />
            </div>
            <div className="info-right bold">
              {userDetail.RoleGroupList.map((roleGroup, idx) => (
                <span key={idx}>
                  {roleGroup.RoleGroupName}
                  {idx < userDetail.RoleGroupList.length - 1 ? ' - ' : ''}
                </span>
              ))}
            </div>
          </div>
        )}
        {userDetail.Email && (
          <div className="row-info">
            <div className="icon-left">
              <Icon name="email" size={22} />
            </div>
            <div className="info-right link">
              <a href={`mailto:${userDetail.Email}`}>{userDetail.Email}</a>
            </div>
          </div>
        )}
        {userDetail.PhoneNumber && (
          <div className="row-info">
            <div className="icon-left">
              <Icon name="phone" size={22} />
            </div>
            <div className="info-right link">
              <a href={`tel:${userDetail.PhoneNumber}`}>{userDetail.PhoneNumber}</a>
            </div>
          </div>
        )}
      </Col>
    </WrapContent>
  )
}
export default ModalUserDetail
