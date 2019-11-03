function fetchComments(userId) {
  return function(dispatch) {
    fetch(`http://localhost:3000/api/v1/users/${userId}`)
    .then(res => res.json())
    .then(user => {
      dispatch({type: 'FETCH_COMMENTS', comments: user.trips.map(trip => {
        const commentObject = {
          tripId: trip.id,
          comments: trip.comments
        }
        return commentObject
      })})
    })
  }
}

function addComment(newComment) {
  return {
    type: 'ADD_COMMENT',
    newComment: newComment
  }
}

function removeComment(comment) {
  return {
    type: 'REMOVE_COMMENT',
    comment: comment
  }
}

export {
  fetchComments,
  addComment,
  removeComment
}
