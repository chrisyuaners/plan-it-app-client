import React from 'react'
import UserListItem from '../components/UserListItem'
import UserForm from '../components/UserForm'
import { connect } from 'react-redux'
import { List, Card } from 'antd'

function UserList(props) {
  const trip = props.trips[props.selectedTrip]
  const currentTripUsers = trip.users.map(user => props.users[user])

  function renderUsers() {
    return (
      <Card title="People" style={{ width: '100%' }}>
        <List
          itemLayout="horizontal"
          dataSource={currentTripUsers}
          renderItem={user => (
            <UserListItem key={user.id} user={user} />
          )}
        />
        <UserForm key={props.selectedTrip} selectedTrip={props.selectedTrip} />
      </Card>
    )
  }

  return (
    <div>
      {renderUsers()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    trips: state.trips
  }
}

export default connect(mapStateToProps)(UserList)
