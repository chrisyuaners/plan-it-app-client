function fetchExpenses(userId) {
  return function(dispatch) {
    fetch(`http://localhost:3000/api/v1/users/${userId}`)
    .then(res => res.json())
    .then(user => {
      dispatch({type: 'FETCH_EXPENSES', expenses: user.trips.map(trip => {
        const commentObject = {
          tripId: trip.id,
          expenses: trip.expenses
        }
        return commentObject
      })})
    })
  }
}

function addExpense(newExpense) {
  return {
    type: 'ADD_EXPENSE',
    newExpense: newExpense
  }
}

function removeExpense(expense) {
  return {
    type: 'REMOVE_EXPENSE',
    expense: expense
  }
}

export {
  fetchExpenses,
  addExpense,
  removeExpense
}
