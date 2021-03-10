import { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { StylesProvider } from '@material-ui/core/styles'
import TodoList from './components/TodoList'
import EditTodo from './components/EditTodo'
import NewTodo from './components/NewTodo'
import { readTodos } from './redux/actions/todos'

type Props = {
  readTodos : () => void
}

class App extends Component<Props> {
  componentDidMount () {
    this.props.readTodos()
  }
  
  render () {
    return (
      <StylesProvider injectFirst>
        <Router>
          <Switch>
            <Route exact path='/' component={TodoList} />
            <Route exact path='/new' component={NewTodo} />
            <Route exact path='/edit/:id' component={EditTodo} />
          </Switch>
        </Router>
      </StylesProvider>
    )  
  }
}

const mapDispatchToProps = { readTodos }

export default connect(
  null,
  mapDispatchToProps
)(App)