import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button } from 'antd'

class SignupForm extends React.Component {
  state = {
    fullName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  }

  randomAvatar = () => {
    const avatars = [
      "001-stegosaurus.svg",
      "002-dinosaur.svg",
      "003-dinosaur.svg",
      "004-diplodocus.svg",
      "005-pterodactyl.svg",
      "006-diplodocus.svg",
      "007-dinosaur.svg",
      "008-diplodocus.svg",
      "009-stegosaurus.svg",
      "010-stegosaurus.svg",
      "011-dinosaur.svg",
      "012-diplodocus.svg",
      "013-pterodactyl.svg",
      "014-dinosaur.svg",
      "015-pterodactyl.svg",
      "016-dinosaur.svg",
      "017-dinosaur.svg",
      "018-dinosaur.svg",
      "019-dinosaur.svg",
      "020-pterodactyl.svg",
      "021-dinosaur.svg",
      "022-stegosaurus.svg",
      "023-tyrannosaurus rex.svg",
      "024-dinosaur.svg",
      "025-pterodactyl.svg",
      "026-triceratops.svg",
      "027-diplodocus.svg",
      "028-dinosaur.svg",
      "029-dinosaur.svg",
      "030-dinosaur.svg"
    ]

    const random = avatars[Math.floor(Math.random() * avatars.length)]

    return random
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const avatar = this.randomAvatar()

    if (this.state.password === this.state.passwordConfirmation) {
      fetch('http://localhost:3000/api/v1/signup', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "Accepts": 'application/json'
        },
        body: JSON.stringify({
          full_name: this.state.fullName,
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          avatar: avatar
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
    } else {
      alert("Passwords don't match")
    }
  }

  render() {
    return (
      <div style={{ paddingTop: '7%', paddingLeft: '30%', paddingRight: '30%' }}>
        <h1>Sign Up</h1>
        <h3>Get hyped planning your next trip!</h3>
        <h2><span role="img" aria-label="Close">🤠🎉</span></h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            <Input name="fullName" onChange={this.handleChange} value={this.state.fullName} placeholder="Full Name" />
          </Form.Item>
          <Form.Item>
            <Input name="email" onChange={this.handleChange} value={this.state.email} placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Input name="username" onChange={this.handleChange} value={this.state.username} placeholder="Username" />
          </Form.Item>
          <Form.Item>
            <Input.Password name="password" onChange={this.handleChange} value={this.state.password} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Input.Password name="passwordConfirmation" onChange={this.handleChange} value={this.state.passwordConfirmation} placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Start Planning
            </Button>
          </Form.Item>
        </Form>
        <Link to={"/login"}>
          or login if you already know what it is
        </Link>
      </div>
    )
  }
}

export default SignupForm
