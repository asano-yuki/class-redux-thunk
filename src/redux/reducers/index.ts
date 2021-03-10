import { combineReducers } from 'redux'
import todos from './todos'
import { DataType } from '../actions/todos'

export type State = {
  todos : DataType[]
}

export const initialState: State = {
  todos : []
}

export default combineReducers({ todos })