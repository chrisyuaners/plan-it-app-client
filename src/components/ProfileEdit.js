import React from 'react'
import { connect } from 'react-redux'
import { editUser } from '../actions/userActions'
import { Form, Input, Button } from 'antd'

class ProfileEdit extends React.Component {
  state = {
    fullName: this.props.user.full_name,
    email: this.props.user.email
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3000/api/v1/users/${this.props.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({
        id: this.props.user.id,
        full_name: this.state.fullName,
        email: this.state.email
      })
    })
    .then(res => res.json())
    .then(updatedUser => {
      const newUserData = {
        id: updatedUser.id,
        fullName: updatedUser.full_name,
        email: updatedUser.email
      }
      this.props.editUser(newUserData)
    })
  }

  render() {
    return (
      <div style={{ padding: '5%' }}>
        <Form onSubmit={this.handleSubmit}>
          <h1>Edit Profile</h1>
          <div style={{ padding: '0% 30%' }}>
            <Form.Item label="Full Name:">
              <Input name="fullName" value={this.state.fullName} onChange={this.handleChange} />
            </Form.Item>
            <Form.Item label="Email:">
              <Input name="email" value={this.state.email} onChange={this.handleChange}/>
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const currentUser = state.users[state.currentUserId] || {}
  return {
    user: currentUser
  }
}

export default connect(mapStateToProps, { editUser: editUser })(ProfileEdit)
