import React from 'react'
import { connect } from 'react-redux'
import AlgoliaPlaces from 'algolia-places-react'
import { addItinerary } from '../actions/itineraryActions'
import { Button, Modal, Form, DatePicker, Select, Alert } from 'antd'

class ItineraryForm extends React.Component {
  state = {
    showModal: false,
    destination: null,
    departure: '',
    arrival: '',
    address: '',
    citiesFrom: this.props.destinations.citiesByCountry[this.props.destinations.countries[0]],
    secondCityFrom: this.props.destinations.citiesByCountry[this.props.destinations.countries[0]][0],
    citiesTo: this.props.destinations.citiesByCountry[this.props.destinations.countries[0]],
    secondCityTo: this.props.destinations.citiesByCountry[this.props.destinations.countries[0]][0],
    showError: false
  }

  handleCountryChangeFrom = (value) => {
    this.setState({
      citiesFrom: this.props.destinations.citiesByCountry[value],
      secondCityFrom: this.props.destinations.citiesByCountry[value][0],
    })
  }

  onSecondCityChangeFrom = (value) => {
    this.setState({
      secondCityFrom: value,
    })
  }

  handleCountryChangeTo = (value) => {
    this.setState({
      citiesTo: this.props.destinations.citiesByCountry[value],
      secondCityTo: this.props.destinations.citiesByCountry[value][0],
    })
  }

  onSecondCityChangeTo = (value) => {
    this.setState({
      secondCityTo: value,
    })
  }

  handleDepartureChange = (date, dateString) => {
    this.setState({
      departure: dateString
    })
  }

  handleArrivalChange = (date, dateString) => {
    this.setState({
      arrival: dateString
    })
  }

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value
    })
  }

  handleDestinationChange = () => {
    this.setState({
      destination: {}
    })
  }

  showModal = () => {
    this.setState({
      showModal: true,
    })
  }

  hideModal = () => {
    this.setState({
      showModal: false,
    })
  }

  showError = () => {
    this.setState({
      showError: true
    })
  }

  hideError = () => {
    this.setState({
      showError: false
    })
  }

  renderValidateStatus = () => {
    return (
      <div>
        <Alert message="Please fill in all fields" type="error" showIcon/>
        <Button onClick={this.hideError}>
          Okay boss
        </Button>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (!this.state.departure || !this.state.arrival || !this.state.address) {
      this.showError()
    } else {
      fetch('http://localhost:3000/api/v1/itineraries', {
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
          "Accepts": 'application/json'
        },
        body: JSON.stringify({
          departure: this.state.departure,
          arrival: this.state.arrival,
          address: this.state.address,
          user_trip_id: this.props.user_trips.filter(userTrip => userTrip.trip_id === this.props.tripId)[0].id,
          cityFrom: this.state.secondCityFrom,
          countryFrom: this.props.destinations.destinations.filter(destination => destination.city === this.state.secondCityFrom)[0].country,
          cityTo: this.state.secondCityTo,
          countryTo: this.props.destinations.destinations.filter(destination => destination.city === this.state.secondCityTo)[0].country
        })
      })
      .then(res => res.json())
      .then(newItinerary => {
        this.props.addItinerary(newItinerary, this.props.currentUserId)

        this.setState({
          showModal: false,
          destination: null,
          departure: '',
          arrival: '',
          address: '',
          citiesFrom: this.props.destinations.citiesByCountry[this.props.destinations.countries[0]],
          secondCityFrom: this.props.destinations.citiesByCountry[this.props.destinations.countries[0]][0],
          citiesTo: this.props.destinations.citiesByCountry[this.props.destinations.countries[0]],
          secondCityTo: this.props.destinations.citiesByCountry[this.props.destinations.countries[0]][0]
        })
      })
    }
  }

  render() {
    const { Option } = Select

    return (
      <div>
        <div className="action-buttons">
          <Button type="primary" onClick={this.showModal}>
            Add
          </Button>
          {this.props.editMode ?
            <Button type="primary"
              onClick={() => this.props.setEditMode(false)}>
              Done
            </Button> :
            <Button type="primary"
              onClick={() => this.props.setEditMode(true)}>
              Edit
            </Button>
          }
        </div>
        <Modal
          title="New Itinerary"
          visible={this.state.showModal}
          onOk={null}
          onCancel={this.hideModal}
          footer={[
            <Button key="back" onClick={this.hideModal} type="danger">
              Cancel
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit}>
            {this.state.showError ? this.renderValidateStatus() : null}
            <Form.Item label="From">
              <Select
                defaultValue={this.props.destinations.countries[0]}
                style={{ width: 150 }}
                onChange={this.handleCountryChangeFrom}
              >
                {this.props.destinations.countries.map(country => (
                  <Option key={country}>{country}</Option>
                ))}
              </Select>
              <Select
                style={{ width: 150 }}
                value={this.state.secondCityFrom}
                onChange={this.onSecondCityChangeFrom}
              >
                {this.state.citiesFrom.map(city => (
                  <Option key={city}>{city}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="To">
              <Select
                defaultValue={this.props.destinations.countries[0]}
                style={{ width: 150 }}
                onChange={this.handleCountryChangeTo}
              >
                {this.props.destinations.countries.map(country => (
                  <Option key={country}>{country}</Option>
                ))}
              </Select>
              <Select
                style={{ width: 150 }}
                value={this.state.secondCityTo}
                onChange={this.onSecondCityChangeTo}
              >
                {this.state.citiesTo.map(city => (
                  <Option key={city}>{city}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Departure">
              <DatePicker showTime defaultValue={''} name="departure" onChange={this.handleDepartureChange} />
            </Form.Item>
            <Form.Item label="Arrival">
              <DatePicker showTime defaultValue={''} name="arrival" onChange={this.handleArrivalChange} />
            </Form.Item>
            <Form.Item label="Address">
              <AlgoliaPlaces
              onChange={({ query, rawAnswer, suggestion, suggestionIndex }) => {
                this.setState({
                  address: suggestion.value
                })
              }}
                options={{
                  appId: 'plREHEK4QC8G',
                  apiKey: 'd52c31240cffd6786c6305bff76b9a97',
                  language: 'en',
                  type: 'address'
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user_trips: state.users[state.currentUserId].user_trips.map(userTrip => state.userTrips[userTrip]),
    destinations: state.destinations,
    currentUserId: state.currentUserId
  }
}

export default connect(mapStateToProps, { addItinerary: addItinerary })(ItineraryForm)
