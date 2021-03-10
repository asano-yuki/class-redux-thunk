import { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { DataType, CreateTodo, createTodo } from '../../redux/actions/todos'
import { State } from '../../redux/reducers'
import InputTodo from '../InputTodo'

type Props = RouteComponentProps & {
  todos      : DataType[] 
  createTodo : (data: CreateTodo['data']) => void
}

class NewTodo extends Component<Props> {
  constructor (props: Props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (title: string) {
    const props = this.props
    const id = props.todos.length + 1
    props.createTodo({ id, title, is_deleted: false })
  }

  render () {
    return <InputTodo { ...this.props } btnText='登録' submit={this.handleSubmit} />
  }
}

const mapStateToProps = (state: State) => (state.todos)
const mapDispatchToProps = { createTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTodo)