const defaultState = {}

function commentReducer(state=defaultState, action) {
  switch(action.type) {
    case 'FETCH_TRIPS':
      let commentData = action.normalizedData.entities.comments
      if (!commentData) {
        commentData = {}
      }
      return commentData
    case 'REMOVE_TRIP':
      const commentsToDelete = action.tripObject.trip.comments
      const commentsForRemoval = {...state}

      commentsToDelete.map(comment => delete commentsForRemoval[comment])

      return commentsForRemoval
    case 'ADD_COMMENT':
      const tripComments = {...state}
      tripComments[action.newComment.id] = action.newComment
      return tripComments
    case 'REMOVE_COMMENT':
      const removeFromComments = {...state}
      delete removeFromComments[action.comment.id]
      return removeFromComments
    default:
      return state
  }
}

export default commentReducer
