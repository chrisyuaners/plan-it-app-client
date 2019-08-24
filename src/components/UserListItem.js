import React from 'react'
import { List, Avatar } from 'antd'

function UserListItem(props) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={`./icons/${props.user.avatar}`} />}
        title={props.user.full_name}
        description={props.user.email}
      />
    </List.Item>
  )
}

export default UserListItem
