import { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { connect } from 'react-redux'
import { DataType, DeleteTodo, deleteTodo } from '../../redux/actions/todos'
import { State } from '../../redux/reducers'
import './index.css'

type Props = RouteComponentProps & {
  todos      : DataType[]
  deleteTodo : (data: DeleteTodo['data']) => void
}

class TodoList extends Component<Props> {
  render () {
    const { todos } = this.props
    const cn = 'todo-list'
    return (
      <div className={cn}>
        <Table className={`${cn}__table`}>
          <TableHead>
            <TableRow>
              <TableCell className={`${cn}__cell`}>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell className={`${cn}__cell`}>Edit</TableCell>
              <TableCell className={`${cn}__cell`}>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              todos.map((todo, i) => {
                const { id, title, is_deleted } = todo
                if (is_deleted) return <></>
                return (
                  <TableRow key={i}>
                    <TableCell className={`${cn}__cell`}>{id}</TableCell>
                    <TableCell>{title}</TableCell>
                    <TableCell className={`${cn}__cell`}>
                      <IconButton onClick={() => this.props.history.push(`/edit/${id}`)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell className={`${cn}__cell`}>
                      <IconButton onClick={() => this.props.deleteTodo({ id })}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <Link to='/new' className={`${cn}__link`}>
          <Button variant='contained' color='primary'>新規作成</Button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => (state.todos)
const mapDispatchToProps = { deleteTodo }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)