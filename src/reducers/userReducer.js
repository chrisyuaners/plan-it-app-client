const defaultState = {}

function userReducer(state=defaultState, action) {
  switch(action.type) {
    case 'FETCH_USERS':
      let usersData = action.normalizedData.entities.users;

      if (!usersData) {
        usersData = {};
      }

      return usersData
    // case 'FETCH_TRIPS':
    //   let userData = action.normalizedData.entities.users
    //   if (!userData) {
    //     userData = {}
    //   }
    //   return userData
    case 'EDIT_USER':
      const findUserToUpdate = {...state};
      const userToUpdate = {...findUserToUpdate[action.user.id]};

      userToUpdate.full_name = action.user.fullName;
      userToUpdate.email = action.user.email;

      const updatedUser = {
        [userToUpdate.id]: userToUpdate
      }

      return {...state, ...updatedUser};
    case 'REMOVE_TRIP':
      const usersForModify = {...state};
      const trip = action.tripObject.trip;
      const itins = action.tripObject.itineraries;
      const itinDestinations = action.tripObject.itinerary_destinations;
      const modifyUsers = trip.users.map(user => usersForModify[user]);

      const modifiedUsers = modifyUsers.map(user => {
        let updateUser = {...user};
        updateUser.trips = user.trips.filter(trip => trip !== trip.id);
        updateUser.user_trips = user.user_trips.filter(ut => !trip.user_trips.includes(ut));
        updateUser.itineraries = user.itineraries.filter(itin => !itins.includes(itin));
        updateUser.itinerary_destinations = user.itinerary_destinations.filter(itinDes => {
          return !itinDestinations.includes(itinDes);
        });
        return updateUser;
      })

      const newUsers = {};
      modifiedUsers.forEach(user => {
  	      newUsers[user.id] = user;
      })

      return {...state, ...newUsers};
    case 'ADD_TRIP_AND_USERTRIP_IDS':
      let users = {...state};
      users[action.userId].trips.push(action.tripId);
      users[action.userId].user_trips.push(action.userTripId);
      return {...state, [action.userId]: users[action.userId]};
    case 'ADD_USERS_TO_TRIP':
      const findUsersToAddTrip = {...state};
      const usersToAddTrip = action.users.newUsers.map(user => findUsersToAddTrip[user]);

      usersToAddTrip.forEach(user => user.trips.push(action.users.tripId));
      usersToAddTrip.forEach(user => {
        action.users.newUserTrips.forEach(userTrip => {
          if (userTrip.user_id === user.id) {
            user.user_trips.push(userTrip.id);
          }
        })
      })

      const updatedUsersToAddTrip = {};

      usersToAddTrip.forEach(user => {
        updatedUsersToAddTrip[user.id] = user;
      })

      return {...state, ...updatedUsersToAddTrip};
    case 'ADD_ITINERARY':
      const userToAddItin = {...state};
      const addItin = {...userToAddItin[action.currentUserId]};

      addItin.itineraries.push(action.newItinerary.itinerary.id);
      action.newItinerary.itinerary_destinations.forEach(itinDes => {
        addItin.itinerary_destinations.push(itinDes.id);
      })

      const addedItinToUser = {
        [addItin.id]: addItin
      }

      return {...state, ...addedItinToUser};
    case 'REMOVE_ITINERARY':
      const userToRemoveItin = {...state};
      const removeItin = {...userToRemoveItin[action.currentUserId]};

      removeItin.itineraries = userToRemoveItin[action.currentUserId].itineraries.filter(itin => itin !== action.itinerary.itinerary.id);

      const itinDesIds = action.itinerary.itinerary_destinations.map(itinDes => itinDes.id);

      removeItin.itinerary_destinations = userToRemoveItin[action.currentUserId].itinerary_destinations.filter(itinDes => !itinDesIds.includes(itinDes));

      const removedItinFromUser = {
        [removeItin.id]: removeItin
      }

      return {...state, ...removedItinFromUser};
    default:
      return state;
  }
}

export default userReducer;
