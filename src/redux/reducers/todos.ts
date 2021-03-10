import types from '../actions/actionTypes'
import { Actions, DataType } from '../actions/todos'
import { State, initialState } from './index'

const reducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case types.CREATE_TODO : {
      const todos = [ ...state.todos, action.data ]
      return { ...state, todos }
    }
    case types.READ_TODO : {
      return { ...state, todos: action.data }
    }
    case types.UPDATE_TODO : {
      const { id, title } = action.data
      const { todos, index } = getTargetTodoInfo(state, id)
      todos[index].title = title
      return { ...state, todos }
    }
    case types.DELETE_TODO : {
      const { id } = action.data
      const { todos, index } = getTargetTodoInfo(state, id)
      todos[index].is_deleted = true
      return { ...state, todos }
    }
    default: {
      return state
    }
  }
}

export default reducer

function getTargetTodoInfo (state: State, id: number) {
  const todos: DataType[] = JSON.parse(JSON.stringify(state.todos))
  const index = todos.findIndex(todo => todo.id === id)
  return { todos, index }
}