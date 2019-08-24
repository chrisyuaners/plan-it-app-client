import React from 'react'
import { connect } from 'react-redux'
import { List, Button } from 'antd'
import { removeItinerary } from '../actions/itineraryActions'
import moment from 'moment'

function ItineraryListItem(props) {
  const currentUserItineraryDestinations = props.userItineraryDestinations.filter(itinDes => itinDes.itinerary_id === props.itinerary.id)
  const flyingFromId = currentUserItineraryDestinations.filter(itin => itin.from === true)[0].destination_id
  const flyingFrom = props.destinations.filter(destination => destination.id === flyingFromId)[0]
  const flyingToId = currentUserItineraryDestinations.filter(itin => itin.from === false)[0].destination_id
  const flyingTo = props.destinations.filter(destination => destination.id === flyingToId)[0]

  function handleClick() {
    fetch(`http://localhost:3000/api/v1/itineraries/${props.itinerary.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json',
        "Accepts": 'application/json'
      },
      body: JSON.stringify({
        id: props.itinerary.id
      })
    })
    .then(res => res.json())
    .then(removeItinerary => {
      props.removeItinerary(removeItinerary, props.currentUserId)
    })
  }

  return (
    <List.Item>
      <List.Item.Meta
        title={`${flyingFrom.city} to ${flyingTo.city}`}
        description={`Departure: ${moment(props.itinerary.departure).format('LLL')} - Arrival: ${moment(props.itinerary.arrival).format('LLL')}`}
      />
      <Button onClick={handleClick} type="danger" icon="close" />
    </List.Item>
  )
}

const mapStateToProps = (state) => {
  const userItineraryDestinations = state.users[state.currentUserId].itinerary_destinations.map(itinDes => state.itineraryDestinations[itinDes])

  return {
    destinations: state.destinations.destinations,
    userItineraryDestinations: userItineraryDestinations,
    currentUserId: state.currentUserId
  }
}

export default connect(mapStateToProps, { removeItinerary: removeItinerary })(ItineraryListItem)
