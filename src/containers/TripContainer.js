import React from 'react'
import TripList from './TripList'
import TripCard from '../components/TripCard'
import UserList from './UserList'
import ExpenseList from './ExpenseList'
import TodoList from './TodoList'
import CommentList from './CommentList'
import ItineraryList from './ItineraryList'
import TripForm from '../components/TripForm'
import { Layout, Empty, Button, Alert, Modal } from 'antd'

class TripContainer extends React.Component {
  state = {
    selectedTrip: 0,
    showTripForm: false,
    showDeleteMessage: false
  }

  selectTrip = (tripId) => {
    this.setState({
      selectedTrip: tripId
    })
  }

  showForm = () => {
    this.setState({
      showTripForm: true
    })
  }

  hideForm = () => {
    this.setState({
      showTripForm: false
    })
  }

  setSelectedTripToNull = () => {
    this.setState({
      selectedTrip: null
    })
  }

  showDeleteMessage = () => {
    this.setState({
      showDeleteMessage: true
    })
  }

  resetDeleteMessage = () => {
    this.setState({
      showDeleteMessage: false
    })
  }

  renderDeleteMessage = () => {
    return (
      <Alert message="Trip Removed" type="success" showIcon closable/>
    )
  }

  renderTrip = () => {
    return (
      <div>
        <div>
          <TripCard
            selectedTrip={this.state.selectedTrip}
            setSelectedTripToNull={this.setSelectedTripToNull}
            showDeleteMessage={this.showDeleteMessage}
            currentUserId={this.props.currentUserId}
          />
        </div>
        <div style={{ padding: '1%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1%' }}>
            <ItineraryList selectedTrip={this.state.selectedTrip} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1%' }}>
            <ExpenseList selectedTrip={this.state.selectedTrip} />
            <TodoList selectedTrip={this.state.selectedTrip} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1%' }}>
            <UserList selectedTrip={this.state.selectedTrip} />
            <CommentList selectedTrip={this.state.selectedTrip} />
          </div>
        </div>
      </div>
    )
  }

  renderEmpty = () => {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_DEFAULT}
        imageStyle={{
          height: 100,
        }}
        style={{ padding: '20%' }}
        description={
          <span>
            Select a Trip
          </span>
        }
      >
         <p>or</p>
         <Button type="primary" onClick={this.showForm}>
          Create One
        </Button>
      </Empty>
    )
  }

  render() {
    const { Sider, Content } = Layout
    const { selectedTrip, showDeleteMessage } = this.state

    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width={'20%'} style={{ background: '#fff' }}>
            <TripList
              selectTrip={this.selectTrip}
              resetDeleteMessage={this.resetDeleteMessage}
            />
            <Button onClick={this.showForm}>
              Add Trip
            </Button>
          </Sider>
          <Content height={'100vh'} width={'80%'}>
            {showDeleteMessage ? this.renderDeleteMessage() : null}
            {selectedTrip ? this.renderTrip() : this.renderEmpty()}
            <Modal
              title="Create Trip"
              visible={this.state.showTripForm}
              onOk={null}
              onCancel={this.hideForm}
              footer={[
                <Button key="back" onClick={this.hideForm} type="danger">
                  Cancel
                </Button>
              ]}
            >
              <TripForm hideForm={this.hideForm}/>
            </Modal>
          </Content>
        </Layout>
      </div>
    )
  }
}

export default TripContainer
