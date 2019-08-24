import React from 'react'
import Map from './Map'

function DestinationShowPage(props) {
  return (
    <div>
      <div style={{ fontSize: '50px' }}>
        <h1 style={{ margin: '0' }}>{props.destination.city}</h1>
        <h3 style={{ margin: '0' }}>{props.destination.country}</h3>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1% 2%' }}>
        <p style={{ maxWidth: '30%', padding: '5% 1%' }}>{props.destination.description}</p>
        <Map destination={`${props.destination.city} ${props.destination.country}`}/>
      </div>
    </div>
  )
}

export default DestinationShowPage
