const defaultState = {
  entities: {},
  result: []
}

function testReducer(state=defaultState, action) {
  switch(action.type) {
    case 'FETCH_TRIPS':
      return action.normalizedData
    default:
      return state
  }
}

export default testReducer
