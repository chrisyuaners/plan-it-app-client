import React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Alert } from 'antd'
import { addTodo } from '../actions/todoActions'

class TodoForm extends React.Component {
  state = {
    newTodo: '',
    showError: false
  }

  handleChange = (event) => {
    this.setState({
      newTodo: event.target.value
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
        <Alert message="Your todo is blank" type="error" showIcon/>
        <Button onClick={this.hideError}>
          Okay boss
        </Button>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (!this.state.newTodo) {
      this.showError()
    } else {
      fetch('http://localhost:3000/api/v1/todos', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "Accepts": 'application/json'
        },
        body: JSON.stringify({
          content: this.state.newTodo,
          trip_id: this.props.tripId
        })
      })
      .then(res => res.json())
      .then(response => {
        this.props.addTodo(response.todo)

        this.setState({
          newTodo: ''
        })
      })
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.state.showError ? this.renderValidateStatus() : null}
        <Form.Item>
          <Input name="newTodo" onChange={this.handleChange} value={this.state.newTodo}/>
        </Form.Item>
        <Form.Item>
          <div className="action-buttons">
            <Button type="primary" htmlType="submit">
              Add
            </Button>
            {this.props.editMode ?
              <Button type="primary"
                onClick={() => this.props.setEditMode(false)}>
                Done
              </Button> :
              <Button type="primary"
                onClick={() => this.props.setEditMode(true)}>
                Edit
              </Button>
            }
          </div>
        </Form.Item>
      </Form>
    )
  }
}

export default connect(null, { addTodo: addTodo })(TodoForm)
