import React from 'react'
import ExpenseListItem from '../components/ExpenseListItem'
import ExpenseForm from '../components/ExpenseForm'
import { connect } from 'react-redux'
import { List, Card } from 'antd'

function ExpenseList(props) {
  const currentTripExpenses = props.trips[props.selectedTrip].expenses.map(expense => props.expenses[expense])

  const reducer = (total, expense) => total + expense
  const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

  function renderExpenses() {
    return (
      <Card title="Expenses" style={{ width: '150%' }}>
        <List
          itemLayout="horizontal"
          dataSource={currentTripExpenses}
          renderItem={expense => (
            <ExpenseListItem key={expense.id} expense={expense} tripId={props.selectedTrip} />
          )}
        />
        {currentTripExpenses.length > 0 ? <p>Total: {numberFormat(currentTripExpenses.map(expense => expense.cost * expense.count).reduce(reducer))}</p> : null}
        <ExpenseForm tripId={props.selectedTrip} />
      </Card>
    )
  }

  return (
    <div>
      {renderExpenses()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    trips: state.trips
  }
}

export default connect(mapStateToProps)(ExpenseList)
