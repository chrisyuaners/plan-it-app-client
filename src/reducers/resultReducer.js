const defaultState = []

function resultReducer(state=defaultState, action) {
  switch(action.type) {
    case 'FETCH_TRIPS':
      let resultData = action.normalizedData.result
      if (!resultData) {
        resultData = []
      }
      return resultData
    case 'REMOVE_TRIP':
      let newResults = state.filter(id => id !== action.tripObject.trip.id)
      return newResults
    case 'ADD_TRIP_ID':
      return [...state, action.tripId]
    default:
      return state
  }
}

export default resultReducer
