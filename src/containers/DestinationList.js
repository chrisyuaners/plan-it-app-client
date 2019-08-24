import React from 'react'
import { List } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function DestinationList(props) {
  return (
    <div style={{ padding: '5% 20%'}}>
      <List
        size="large"
        header={<div>Destinations</div>}
        bordered
        dataSource={props.destinations}
        renderItem={destination => {
          return <List.Item><Link to={`/home/destinations/${destination.id}`}>{`${destination.city}, ${destination.country}`}</Link></List.Item>
        }}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    destinations: state.destinations.destinations
  }
}

export default connect(mapStateToProps)(DestinationList)
