import React from 'react'
import { connect } from 'react-redux'
import { List, Button } from 'antd'
import { removeExpense } from '../actions/expenseActions'

function ExpenseListItem(props) {
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD'
    }).format(value)

  function handleClick() {
    fetch(`http://localhost:3000/api/v1/expenses/${props.expense.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({
        id: props.expense.id
      })
    })
    .then(res => res.json())
    .then(response => {
      props.removeExpense(response.expense)
    })
  }

  return (
    <List.Item>
      <List.Item.Meta
        title={props.expense.item}
        description={`${numberFormat(props.expense.cost)} x ${props.expense.count}`}
      />
      <Button onClick={handleClick} type="danger" icon="close" />
    </List.Item>
  )
}

export default connect(null, { removeExpense: removeExpense })(ExpenseListItem)
