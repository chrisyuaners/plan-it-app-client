const defaultState = {}

function todoReducer(state=defaultState, action) {
  switch(action.type) {
    case 'FETCH_TRIPS':
    let todoData = action.normalizedData.entities.todos
    if (!todoData) {
      todoData = {}
    }
    return todoData
    case 'REMOVE_TRIP':
      const todosToDelete = action.tripObject.todos || []
      const todosForRemoval = {...state}

      todosToDelete.map(todo => delete todosForRemoval[todo])

      return todosForRemoval
    case 'ADD_TODO':
      const tripTodos = {...state}
      tripTodos[action.newTodo.id] = action.newTodo
      return tripTodos
    case 'REMOVE_TODO':
      const removeFromTodos = {...state}
      delete removeFromTodos[action.todo.id]
      return removeFromTodos
    default:
      return state
  }
}

export default todoReducer
