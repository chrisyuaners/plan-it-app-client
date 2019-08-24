import React from 'react';
import ReactMapGL from 'react-map-gl';
const API_KEY ='pk.eyJ1IjoiY2hyaXN5dWFuNyIsImEiOiJjanpsczF1ZnMwMzRyM21sYzZ3YXNlbnIzIn0.kdStZsjSsUkbtB1OO9PuoQ'

class Map extends React.Component {
  state = {
    viewport: {
      width: 700,
      height: 500,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  }

  componentDidMount() {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.props.destination}.json?&access_token=${API_KEY}`)
    .then(res => res.json())
    .then(query => {
      const coordinates = query.features[0].geometry.coordinates
      this.setState((prevState) => ({
        viewport: {
          ...prevState.viewport,
          longitude: coordinates[0],
          latitude: coordinates[1]
        }
      }))
    })
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={API_KEY}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      />
    )
  }
}

export default Map
