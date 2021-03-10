import axios from 'axios'
import { ThunkDispatch } from 'redux-thunk'
import types from './actionTypes'

const SERVICE_PATH = 'http://127.0.0.1:4010'

export type DataType = {
  id         : number,
  title      : string,
  is_deleted : boolean
}

export type CreateTodo = {
  type : typeof types.CREATE_TODO
  data : DataType
}

export type ReadTodos = {
  type : typeof types.READ_TODO
  data : DataType[]
}

export type UpdateTodo = {
  type : typeof types.UPDATE_TODO
  data : { id: DataType['id'], title: DataType['title'] }
}

export type DeleteTodo = {
  type : typeof types.DELETE_TODO
  data : { id: DataType['id'] }
}

export type Actions = CreateTodo | ReadTodos | UpdateTodo | DeleteTodo

export const createTodo = (data: DataType) => async (dispatch: ThunkDispatch<any, any, CreateTodo>) => {
  await axios.post(`${SERVICE_PATH}/todos`, data)
  dispatch({ type: types.CREATE_TODO, data })
}

export const readTodos = () => async (dispatch: ThunkDispatch<any, any, ReadTodos>) => {
  const res = await axios(`${SERVICE_PATH}/todos`)
  dispatch({ type: types.READ_TODO, data: res.data })
}

export const updateTodo = (data: UpdateTodo['data']) => async (dispatch: ThunkDispatch<any, any, UpdateTodo>) => {
  await axios.put(`${SERVICE_PATH}/todos/${data.id}`, data)
  dispatch({ type: types.UPDATE_TODO, data })
}

export const deleteTodo = (data: DeleteTodo['data']) => async (dispatch: ThunkDispatch<any, any, DeleteTodo>) => {
  await axios.delete(`${SERVICE_PATH}/todos/${data.id}`)
  dispatch({ type: types.DELETE_TODO, data })
}