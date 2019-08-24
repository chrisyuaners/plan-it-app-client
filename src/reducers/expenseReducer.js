const defaultState = {}

function expenseReducer(state=defaultState, action) {
  switch(action.type) {
    case 'FETCH_TRIPS':
      let expenseData = action.normalizedData.entities.expenses
      if (!expenseData) {
        expenseData = {}
      }
      return expenseData
    case 'REMOVE_TRIP':
      const expensesToDelete = action.tripObject.trip.expenses
      const expensesForRemoval = {...state}

      expensesToDelete.map(expense => delete expensesForRemoval[expense])

      return expensesForRemoval
    case 'ADD_EXPENSE':
      const tripExpenses = {...state}
      tripExpenses[action.newExpense.id] = action.newExpense
      return tripExpenses
    case 'REMOVE_EXPENSE':
      const removeFromExpenses = {...state}
      delete removeFromExpenses[action.expense.id]
      return removeFromExpenses
    default:
      return state
  }
}

export default expenseReducer
