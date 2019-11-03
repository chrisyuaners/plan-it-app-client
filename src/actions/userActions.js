import { normalize, schema } from 'normalizr'

function setUser(userId) {
  return {
    type: 'SET_USER',
    currentUserId: parseInt(userId)
  }
}

function fetchUsers() {
  return function(dispatch) {
    fetch(`http://localhost:3000/api/v1/users`, {
      headers: {
        "Authorization": localStorage.user_id
      }
    })
    .then(res => res.json())
    .then(users => {
      const userData = users
      const itinerary_destination = new schema.Entity('itinerary_destinations')
      const itinerary = new schema.Entity('itineraries')
      const user_trip = new schema.Entity('user_trips', {
        itineraries: [itinerary]
      })
      const trip = new schema.Entity('trips')
      const user = new schema.Entity('users', {
        trips: [trip],
        itineraries: [itinerary],
        itinerary_destinations: [itinerary_destination],
        user_trips: [user_trip]
      })
      const userList = [user]
      const normalizedData = normalize(userData, userList)

      dispatch({type: 'FETCH_USERS', normalizedData: normalizedData})
    })
  }
}

function addTripAndUserTripIds(tripId, userTripId, userId) {
  return {
    type: 'ADD_TRIP_AND_USERTRIP_IDS',
    tripId: tripId,
    userTripId: userTripId,
    userId: userId
  }
}

function editUser(user) {
  return {
    type: 'EDIT_USER',
    user: user
  }
}

export {
  fetchUsers,
  setUser,
  addTripAndUserTripIds,
  editUser
}
