import React from 'react'
import NavBar from '../components/NavBar'
import Profile from '../components/Profile'
import ProfileEdit from '../components/ProfileEdit'
import TripContainer from './TripContainer'
import DestinationList from './DestinationList'
import DestinationShowPage from '../components/DestinationShowPage'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

class MainContainer extends React.Component {
  componentDidMount() {
    const user_id = localStorage.user_id

    if (user_id) {
      this.props.autoLoginUser(user_id)
    }
  }

  render() {
    return (
      <div>
        <NavBar logout={this.props.logout} />
        <Switch>
          <Route exact path="/home" render={(routerProps) => <TripContainer />} />
          <Route exact path="/home/destinations" component={DestinationList} />
          <Route path="/home/destinations/:id" render={(routerProps) => {
            const foundDestination = this.props.destinations.find(destination => destination.id === parseInt(routerProps.match.params.id)) || {}

            return (
              <DestinationShowPage key={foundDestination.id} destination={foundDestination} routerProps={routerProps} />
            )}} />
          <Route exact path="/home/profile" render={(routerProps) => <Profile {...routerProps}/>} />
          <Route path="/home/profile/edit" component={ProfileEdit} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const destinations = state.destinations.destinations || []
  return {
    destinations: destinations
  }
}

export default connect(mapStateToProps)(MainContainer)
