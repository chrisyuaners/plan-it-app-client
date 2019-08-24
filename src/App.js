import React from 'react'
import './App.css'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import MainContainer from './containers/MainContainer'
import { fetchTrips } from './actions/tripActions'
import { setUser, fetchUsers } from './actions/userActions'
import { fetchDestinations } from './actions/destinationActions'

class App extends React.Component {
  // componentDidMount(){
  //   fetch("http://localhost:3000/api/v1/auto_login", {
  //     headers: {Authorization: localStorage.user_id}
  //   })
  //   .then(res => res.json())
  //   .then(console.log)
  // }

  state = {
    currentUserId: null,
    loginPage: {
      style: { paddingTop: '16%', paddingLeft: '30%', paddingRight: '30%' },
      showText: true,
      layout: ''
    },
    loginHome: {
      style: { float: 'right', padding: '1%' },
      showText: false,
      layout: 'inline'
    }
  }

  //refactor for actual auto login
  autoLoginUser = (user_id) => {
    this.setState({
      currentUserId: parseInt(user_id)
    }, () => {
      this.props.setUser(this.state.currentUserId)
      this.props.fetchUsers()
      this.props.fetchTrips(this.state.currentUserId)
      this.props.fetchDestinations()
    })
  }

  setUser = (user) => {
    this.setState({
      currentUserId: user.id
    }, () => {
      localStorage.user_id = user.id
      this.props.history.push("/home")
    })
  }

  logout = () => [
    this.setState({
      currentUserId: null
    }, () => {
      localStorage.removeItem("user_id")
      this.props.history.push("/login")
    })
  ]

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={(routerProps) => <LandingPage {...routerProps} setUser={this.setUser} loginProps={this.state.loginHome} />} />
          <Route path="/login" render={(routerProps) => <LoginForm {...routerProps} setUser={this.setUser} loginProps={this.state.loginPage} />} />
          <Route path="/signup" render={(routerProps) => <SignupForm {...routerProps} setUser={this.setUser} />} />
          <Route path="/home" render={(routerProps) => <MainContainer {...routerProps} autoLoginUser={this.autoLoginUser} logout={this.logout} />} />
        </Switch>
      </div>
    )
  }
}

export default connect(null, {fetchTrips: fetchTrips, setUser: setUser, fetchUsers: fetchUsers, fetchDestinations: fetchDestinations})(App)
