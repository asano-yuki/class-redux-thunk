import { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { DataType, UpdateTodo, updateTodo } from '../../redux/actions/todos'
import { State } from '../../redux/reducers'
import InputTodo from '../InputTodo'

type Props = RouteComponentProps & {
  todos      : DataType[] 
  updateTodo : (data: UpdateTodo['data']) => void
}

class EditTodo extends Component<Props> {
  constructor (props: Props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getId () {
    const param = window.location.pathname.split('/').pop()
    return Number(param)
  }

  handleSubmit (title: string) {
    const props = this.props
    const id = this.getId()
    props.updateTodo({ id, title })
  }

  render () {
    const id = this.getId()
    const todo = this.props.todos.find(todo => todo.id === id)
    if (!todo) {
      this.props.history.push('/')
      return <></>
    }
    return <InputTodo { ...this.props } title={todo.title} btnText='更新' submit={this.handleSubmit} />
  }
}

const mapStateToProps = (state: State) => (state.todos)
const mapDispatchToProps = { updateTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTodo)