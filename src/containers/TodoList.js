import React, { useState } from 'react'
import TodoListItem from '../components/TodoListItem'
import TodoForm from '../components/TodoForm'
import { connect } from 'react-redux'
import { List, Card } from 'antd'

function TodoList(props) {
  const currentTripTodos = props.trips[props.selectedTrip].todos.map(todo => props.todos[todo])
  const [editMode, setEditMode] = useState(false);

  function renderTodos() {
    return (
      <Card title="Todos" style={{ width: '100%' }}>
        <List
          itemLayout="horizontal"
          dataSource={currentTripTodos}
          renderItem={todo => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              tripId={props.selectedTrip}
              editMode={editMode}
            />
          )}
        />
        <TodoForm
          key={props.selectedTrip}
          tripId={props.selectedTrip}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      </Card>
    )
  }

  return (
    <div>
      {renderTodos()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    trips: state.trips
  }
}

export default connect(mapStateToProps)(TodoList)
