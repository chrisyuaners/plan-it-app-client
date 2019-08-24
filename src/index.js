import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import userReducer from './reducers/userReducer'
import destinationReducer from './reducers/destinationReducer'
import tripReducer from './reducers/tripReducer'
import commentReducer from './reducers/commentReducer'
import todoReducer from './reducers/todoReducer'
import expenseReducer from './reducers/expenseReducer'
import itineraryReducer from './reducers/itineraryReducer'
import userTripReducer from './reducers/userTripReducer'
import itineraryDestinationReducer from './reducers/itineraryDestinationReducer'
import resultReducer from './reducers/resultReducer'
import userIdReducer from './reducers/userIdReducer'
import thunk from 'redux-thunk'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const rootReducer = combineReducers({
  currentUserId: userIdReducer,
  users: userReducer,
  trips: tripReducer,
  todos: todoReducer,
  expenses: expenseReducer,
  comments: commentReducer,
  itineraries: itineraryReducer,
  userTrips: userTripReducer,
  itineraryDestinations: itineraryDestinationReducer,
  destinations: destinationReducer,
  result: resultReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
