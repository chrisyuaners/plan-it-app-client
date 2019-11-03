import React from 'react'
import { connect } from 'react-redux'
import { addUsersToTrip } from '../actions/tripActions'
import { Form, Button, Modal, Alert } from 'antd'

class UserForm extends React.Component {
  state = {
    usersToAdd: [],
    userSelection: [],
    showError: false,
    showModal: false
  }

  componentDidMount() {
    const trip = this.props.trips[this.props.selectedTrip]
    const tripUsers = trip.users.map(user => this.props.users[user])
    const allUsers = Object.keys(this.props.users).map(user => this.props.users[user])
    const userSelection = allUsers.filter(user => !tripUsers.includes(user))

    this.setState({
      userSelection: userSelection
    })
  }

  showModal = () => {
    this.setState({
      showModal: true,
    })
  }

  hideModal = () => {
    this.setState({
      usersToAdd: [],
      showModal: false,
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
        <Alert message="Please fill in all fields" type="error" showIcon/>
        <Button onClick={this.hideError}>
          Okay boss
        </Button>
      </div>
    )
  }

  renderUsers = () => {
    return this.state.userSelection.map(user => {
      return (
        <div key={user.id} className="user-buttons">
          <Button
            onClick={(event) => {this.addUser(event, user);}}
            className={this.state.usersToAdd.includes(user.id) ? "user-selected" : null}
          >
            {user.full_name}
          </Button>
        </div>
      )
    })
  }

  addUser = (event, selectedUser) => {
    if (this.state.usersToAdd.includes(selectedUser.id)) {
      this.setState({
        usersToAdd: this.state.usersToAdd.filter(user => user !== selectedUser.id)
      })
    } else {
      this.setState({
        usersToAdd: [...this.state.usersToAdd, selectedUser.id]
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/api/v1/add_users', {
      method: "PATCH",
      headers: {
        "Content-Type": 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({
        id: this.props.selectedTrip,
        usersToAdd: this.state.usersToAdd
      })
    })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      this.props.addUsersToTrip(response)
      
      this.setState({
        showModal: false,
        usersToAdd: [],
      })
    })
  }

  render() {
    console.log(this.state.usersToAdd)
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add
        </Button>
        <Modal
          title="Add People"
          visible={this.state.showModal}
          onOk={null}
          onCancel={this.hideModal}
          footer={[
            <Button key="back" onClick={this.hideModal} type="danger">
              Cancel
            </Button>
          ]}
        >
        <Form onSubmit={this.handleSubmit}>
          {this.state.showError ? this.renderValidateStatus() : null}
          <Form.Item label="Select Friends for Trip">
            {this.renderUsers()}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    trips: state.trips
  }
}

export default connect(mapStateToProps, { addUsersToTrip: addUsersToTrip })(UserForm)
