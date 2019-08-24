import React from 'react'
import { List } from 'antd'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { removeComment } from '../actions/commentActions'

function CommentListItem(props) {
  const author = props.users[props.comment.author_id]

  function handleClick() {
    fetch(`http://localhost:3000/api/v1/comments/${props.comment.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({
        id: props.comment.id
      })
    })
    .then(res => res.json())
    .then(response => {
      props.removeComment(response.comment)
    })
  }

  return (
    <List.Item>
      <List.Item.Meta
        title={author.full_name}
        description={props.comment.content}
      />
      <Button onClick={handleClick} type="danger" icon="close" />
    </List.Item>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, { removeComment: removeComment })(CommentListItem)
