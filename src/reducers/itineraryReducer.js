const defaultState = {}

function itineraryReducer(state=defaultState, action){
  switch(action.type) {
    case 'FETCH_TRIPS':
      let itineraryData = action.normalizedData.entities.itineraries
      if (!itineraryData) {
        itineraryData = {}
      }
      return itineraryData
    case 'REMOVE_TRIP':
      const itinerariesToDelete = action.tripObject.itineraries
      const itinerariesForRemoval = {...state}

      itinerariesToDelete.map(itin => delete itinerariesForRemoval[itin])

      return itinerariesForRemoval
    case 'ADD_ITINERARY':
      const addToItineraries = {...state}

      addToItineraries[action.newItinerary.itinerary.id] = action.newItinerary.itinerary

      return addToItineraries
    case 'REMOVE_ITINERARY':
      const removeFromItineraries = {...state}

      delete removeFromItineraries[action.itinerary.itinerary.id]
    
      return removeFromItineraries
    default:
      return state
  }
}

export default itineraryReducer
