const defaultState = {}

function userTripReducer(state=defaultState, action) {
  switch(action.type) {
    case 'FETCH_TRIPS':
      let userTripData = action.normalizedData.entities.user_trips
      if (!userTripData) {
        userTripData = {}
      }
      return userTripData
    case 'ADD_USER_TRIP':
      return {...state, [action.userTrip.id]: action.userTrip}
    case 'ADD_USERS_TO_TRIP':
      const addNewUserTrips = {}

      action.users.newUserTrips.forEach(userTrip => {
        addNewUserTrips[userTrip.id] = userTrip
      })

      return {...state, ...addNewUserTrips}
    case 'ADD_ITINERARY':
      const userTripToAddItin = {...state}
      const addItin = {...userTripToAddItin[action.newItinerary.itinerary.user_trip_id]}

      if (!addItin.itineraries) {
        addItin.itineraries = []
      }

      addItin.itineraries.push(action.newItinerary.itinerary.id)

      const addedItinToUserTrip = {
        [addItin.id]: addItin
      }

      return {...state, ...addedItinToUserTrip}
    case 'REMOVE_ITINERARY':
      const removeItinFromUserTrip = {...state}
      const removeItin = {...removeItinFromUserTrip[action.itinerary.itinerary.user_trip_id]}

      removeItin.itineraries = removeItinFromUserTrip[action.itinerary.itinerary.user_trip_id].itineraries.filter(itin => itin !== action.itinerary.itinerary.id)

      return {...state, ...removeItin}
    default:
      return state
  }
}

export default userTripReducer
