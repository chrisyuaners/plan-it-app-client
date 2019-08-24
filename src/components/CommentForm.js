import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Alert } from 'antd'
import { addComment } from '../actions/commentActions'

class CommentForm extends React.Component {
  state = {
    newComment: '',
    showError: false
  }

  handleChange = (event) => {
    this.setState({
      newComment: event.target.value
    })
  }

  showError = () => {
    this.setState({
      showError: true
    })
  }

  hideError = () => {
    this.setState({
      showError: false
    })
  }

  renderValidateStatus = () => {
    return (
      <div>
        <Alert message="You can't post nothing" type="error" showIcon/>
        <Button onClick={this.hideError}>
          Okay boss
        </Button>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (!this.state.newComment) {
      this.showError()
    } else {
      fetch('https://plan-it-app-api.herokuapp.com/api/v1/comments', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "Accepts": 'application/json'
        },
        body: JSON.stringify({
          content: this.state.newComment,
          trip_id: this.props.tripId,
          author_id: this.props.currentUser
        })
      })
      .then(res => res.json())
      .then(response => {
        this.props.addComment(response.comment)

        this.setState({
          newComment: ''
        })
      })
    }
  }

  render() {
    const { TextArea } = Input

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.state.showError ? this.renderValidateStatus() : null}
        <Form.Item>
          <TextArea rows={2} name="newComment" onChange={this.handleChange} value={this.state.newComment}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Post
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUserId
  }
}

export default connect(mapStateToProps, {addComment: addComment})(CommentForm)
