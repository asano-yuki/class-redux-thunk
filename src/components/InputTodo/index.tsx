import { Component, FormEvent, ChangeEvent } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { DataType } from '../../redux/actions/todos'
import './index.css'

type Props = RouteComponentProps & {
  title?  : string
  btnText : string
  submit  : (title: string) => void
  todos   : DataType[]
}

type FormState = {
  title : string
}

class InputTodo extends Component<Props, FormState> {
  constructor (props: Props) {
    super(props)
    this.state = { title: props.title || '' }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit (e: FormEvent) {
    e.preventDefault()
    const { submit, history } = this.props
    submit(this.state.title)
    history.push('/')
  }

  handleChange (e: ChangeEvent<HTMLInputElement>) {
    this.setState({ title: e.target.value })
  }

  render () {
    const cn = 'new-todo'
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          label='Title'
          value={this.state.title}
          className={`${cn}__title`}
          required
          inputProps={{ maxLength: 30 }}
          onChange={this.handleChange}
        />
        <div className={`${cn}__btns`}>
          <Button type='submit' variant='contained' color='primary'>{this.props.btnText}</Button>
          <Link to='/' className={`${cn}__btn-back`}>
            <Button variant='contained'>戻る</Button>
          </Link>
        </div>
      </form>
    )
  }
}

export default InputTodo