const defaultState = {}

function itineraryDestinationReducer(state=defaultState, action) {
  switch(action.type) {
    case 'FETCH_TRIPS':
    let itineraryDestinationData = action.normalizedData.entities.itinerary_destinations
    if (!itineraryDestinationData) {
      itineraryDestinationData = {}
    }
    return itineraryDestinationData
    case 'REMOVE_TRIP':
      const itinDesToDelete = action.tripObject.itinerary_destinations
      const itinDesForRemoval = {...state}

      itinDesToDelete.map(itinDes => delete itinDesForRemoval[itinDes])

      return itinDesForRemoval
    case 'ADD_ITINERARY':
      const addToItinDestinations = {...state}

      action.newItinerary.itinerary_destinations.forEach(itinDes => {
        addToItinDestinations[itinDes.id] = itinDes
      })

      return addToItinDestinations
    case 'REMOVE_ITINERARY':
      const removeFromItinDestinations = {...state}

      action.itinerary.itinerary_destinations.forEach(itinDes => {
        delete removeFromItinDestinations[itinDes.id]
      })

      return removeFromItinDestinations
    default:
      return state
  }
}

export default itineraryDestinationReducer
