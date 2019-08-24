import React from 'react'
import { Form, Input, Button } from 'antd'

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    fetch('http://localhost:3000/api/v1/login', {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      } else {
        this.props.setUser(response)
      }
    })
  }

  render() {
    return (
      <div style={this.props.loginProps.showText ? this.props.loginProps.style : this.props.loginProps.style}>
        {this.props.loginProps.showText ?
        <div>
          <h1>Welcome Back, Playa</h1>
          <h1><span role="img" aria-label="Close">🥳🐙</span></h1>
        </div>
        : null}
        <Form layout={this.props.loginProps.layout || 'horizontal'} onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input name="username" onChange={this.handleChange} value={this.state.username} placeholder="Username" />
          </Form.Item>
          <Form.Item>
            <Input.Password name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default LoginForm
