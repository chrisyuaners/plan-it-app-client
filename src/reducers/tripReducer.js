const defaultState = {}

function tripReducer(state = defaultState, action) {
  switch(action.type) {
    case 'FETCH_TRIPS':
      let tripData = action.normalizedData.entities.trips
      if (!tripData) {
        tripData = {}
      }
      return tripData
    case 'ADD_TRIP':
      const tripCreatorId = action.newTrip.users[0].id
      const normalizedTrip = {...action.newTrip, users: [tripCreatorId]}
      return {...state, [action.newTrip.id]: normalizedTrip}
    case 'REMOVE_TRIP':
      const removeTrips = {...state}

      delete removeTrips[action.tripObject.trip.id]
      // const newTrips = {}
      // for (let key in removeTrips){
      //   if ([key]){
      //     newTrips[key] = state[key]
      //   }
      // }
      // console.log(newTrips)
      return removeTrips
    case 'EDIT_TRIP':
      const findTripToUpdate = {...state}
      const tripToUpdate = {...findTripToUpdate[action.updatedTrip.id]}

      tripToUpdate.title = action.updatedTrip.title
      tripToUpdate.description = action.updatedTrip.description

      const updatedTrip = {
        [tripToUpdate.id]: tripToUpdate
      }
      
      return {...state, ...updatedTrip}
    case 'ADD_COMMENT':
      const findTripToAddComment = {...state}
      const addCommentToTrip = {...findTripToAddComment[action.newComment.trip_id]}

      addCommentToTrip.comments.push(action.newComment.id)

      const updatedTripWithComment = {
        [addCommentToTrip.id]: addCommentToTrip
      }

      return {...state, ...updatedTripWithComment}
    case 'ADD_TODO':
      const findTripToAddTodo = {...state}
      const addTodoToTrip = {...findTripToAddTodo[action.newTodo.trip_id]}

      addTodoToTrip.todos.push(action.newTodo.id)

      const updatedTripWithTodo = {
        [addTodoToTrip.id]: addTodoToTrip
      }

      return {...state, ...updatedTripWithTodo}
    case 'ADD_EXPENSE':
      const findTripToAddExpense = {...state}
      const addExpenseToTrip = {...findTripToAddExpense[action.newExpense.trip_id]}

      addExpenseToTrip.expenses.push(action.newExpense.id)

      const updatedTripWithExpense = {
        [addExpenseToTrip.id]: addExpenseToTrip
      }

      return {...state, ...updatedTripWithExpense}
    case 'REMOVE_EXPENSE':
      const findTripToRemoveExpense = {...state}

      const removeExpenseFromTrip = {...findTripToRemoveExpense[action.expense.trip_id]}

      removeExpenseFromTrip.expenses = findTripToRemoveExpense[action.expense.trip_id].expenses.filter(expense => expense !== action.expense.id)

      const updatedTripWithExpenseRemove = {
        [removeExpenseFromTrip.id]: removeExpenseFromTrip
      }

      return {...state, ...updatedTripWithExpenseRemove}
    case 'REMOVE_TODO':
      const findTripToRemoveTodo = {...state}

      const removeTodoFromTrip = {...findTripToRemoveTodo[action.todo.trip_id]}

      removeTodoFromTrip.todos = findTripToRemoveTodo[action.todo.trip_id].todos.filter(todo => todo !== action.todo.id)

      const updatedTripWithTodoRemove = {
        [removeTodoFromTrip.id]: removeTodoFromTrip
      }

      return {...state, ...updatedTripWithTodoRemove}
    case 'REMOVE_COMMENT':
      const findTripToRemoveComment = {...state}

      const removeCommentFromTrip = {...findTripToRemoveComment[action.comment.trip_id]}

      removeCommentFromTrip.comments = findTripToRemoveComment[action.comment.trip_id].comments.filter(comment => comment !== action.comment.id)

      const updatedTripWithCommentRemove = {
        [removeCommentFromTrip.id]: removeCommentFromTrip
      }

      return {...state, ...updatedTripWithCommentRemove}
    default:
      return state
  }
}

export default tripReducer
