function fetchItineraries(userId) {
  return function(dispatch) {
    fetch(`https://plan-it-app-api.herokuapp.com/api/v1/users/${userId}`)
    .then(res => res.json())
    .then(user => {
      dispatch({type: 'FETCH_ITINERARIES', itineraries: user.itineraries})
    })
  }
}

function addItinerary(newItinerary, currentUserId) {
  return {
    type: 'ADD_ITINERARY',
    newItinerary: newItinerary,
    currentUserId: currentUserId
  }
}

function removeItinerary(itinerary, currentUserId) {
  return {
    type: 'REMOVE_ITINERARY',
    itinerary: itinerary,
    currentUserId: currentUserId
  }
}

export {
  fetchItineraries,
  addItinerary,
  removeItinerary
}
