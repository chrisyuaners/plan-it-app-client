const defaultState = null

function userIdReducer(state=defaultState, action) {
  switch(action.type) {
    case 'SET_USER':
      return action.currentUserId
    default:
      return state
  }
}

export default userIdReducer
