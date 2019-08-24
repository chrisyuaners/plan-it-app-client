import React from 'react'
import { connect } from 'react-redux'
import TripListItem from '../components/TripListItem'
import { List } from 'antd'

function TripList(props) {
  function renderTrips() {
    return (
      <List
        itemLayout="horizontal"
        dataSource={props.trips}
        renderItem={trip => (
          <TripListItem key={trip.id} trip={trip} selectTrip={props.selectTrip} resetDeleteMessage={props.resetDeleteMessage} />
        )}
      />
    )
  }

  return (
    <div>
      {renderTrips()}
    </div>
  )
}

const mapStateToProps = (state) => {

  const trips = state.result.map(result => state.trips[result])
  // state.result.forEach(result => {
  //   if(state.trips[result]){
  //     trips.push(state.trips[result])
  //   }
  // })
  return {
    trips: trips
  }
}

export default connect(mapStateToProps)(TripList)
