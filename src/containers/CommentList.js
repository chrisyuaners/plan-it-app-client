import React from 'react'
import { connect } from 'react-redux'
import CommentListItem from '../components/CommentListItem'
import CommentForm from '../components/CommentForm'
import { List, Card } from 'antd'

function CommentList(props) {
  const currentTripComments = props.trips[props.selectedTrip].comments.map(comment => props.comments[comment])

  return (
    <Card title="Comments" style={{ width: '100%' }}>
      <List
        itemLayout="horizontal"
        dataSource={currentTripComments}
        renderItem={comment => (
          <CommentListItem key={comment.id} comment={comment} />
        )}
      />
      <CommentForm tripId={props.selectedTrip} />
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    trips: state.trips
  }
}

export default connect(mapStateToProps)(CommentList)
