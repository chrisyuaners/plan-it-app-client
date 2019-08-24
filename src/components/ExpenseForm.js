import React from 'react'
import { connect } from 'react-redux'
import { addExpense } from '../actions/expenseActions'
import { Form, Input, InputNumber, Button, Alert, Modal } from 'antd'

class ExpenseForm extends React.Component {
  state ={
    showModal: false,
    item: '',
    cost: null,
    count: null,
    showError: false
  }

  handleItemChange = (event) => {
    this.setState({
      item: event.target.value
    })
  }

  handleCostChange = (value) => {
    this.setState({
      cost: value
    })
  }

  handleCountChange = (value) => {
    this.setState({
      count: value
    })
  }

  showModal = () => {
    this.setState({
      showModal: true,
    })
  }

  hideModal = () => {
    this.setState({
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

  handleSubmit = (event) => {
    event.preventDefault()

    if (!this.state.item || !this.state.cost || !this.state.count) {
      this.showError()
    } else {
      fetch('http://localhost:3000/api/v1/expenses', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "Aceepts": 'application/json'
        },
        body: JSON.stringify({
          item: this.state.item,
          cost: this.state.cost,
          count: this.state.count,
          trip_id: this.props.tripId
        })
      })
      .then(res => res.json())
      .then(response => {
        this.props.addExpense(response.expense)

        this.setState({
          showModal: false,
          item: '',
          cost: null,
          count: null
        })
      })
    }

  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add
        </Button>
        <Modal
          title="New Expense"
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
          <Form.Item label="Item">
            <Input name="item" onChange={this.handleItemChange} value={this.state.item}/>
          </Form.Item>
          <Form.Item label="Cost">
            <InputNumber name="cost" onChange={this.handleCostChange} value={this.state.cost} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/>
          </Form.Item>
          <Form.Item label="Count">
            <InputNumber name="count" onChange={this.handleCountChange} value={this.state.count}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
        </Modal>
      </div>
    )
  }
}

export default connect(null, { addExpense: addExpense })(ExpenseForm)
