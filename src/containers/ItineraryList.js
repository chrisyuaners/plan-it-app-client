import React, { useState } from 'react'
import { List, Card } from 'antd'
import { connect } from 'react-redux'
import ItineraryListItem from '../components/ItineraryListItem'
import ItineraryForm from '../components/ItineraryForm'

function ItineraryList(props) {
  const currentUserTrip = props.userTrips.filter(userTrip => userTrip.trip_id === props.selectedTrip)[0];
  const userItineraries = props.itineraries.filter(itin => itin.user_trip_id === currentUserTrip.id);
  const [editMode, setEditMode] = useState(false);

  function renderItineraries() {
    return (
      <Card title="Itinerary" style={{ width: '100%' }}>
        <List
          itemLayout="horizontal"
          dataSource={userItineraries}
          renderItem={itinerary => (
            <ItineraryListItem
              key={itinerary.id}
              itinerary={itinerary}
              tripId={props.selectedTrip}
              editMode={editMode}
            />
          )}
        />
        <ItineraryForm
          key={props.selectedTrip}
          tripId={props.selectedTrip}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </Card>
    )
  }

  return (
    <div>
      {renderItineraries()}
    </div>
  )
}

const mapStateToProps = (state) => {
  const userItineraries = state.users[state.currentUserId].itineraries.map(itin => state.itineraries[itin])
  const userTrips = state.users[state.currentUserId].user_trips.map(userTrip => state.userTrips[userTrip])

  return {
    itineraries: userItineraries,
    userTrips: userTrips
  }
}

export default connect(mapStateToProps)(ItineraryList)
