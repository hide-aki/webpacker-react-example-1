import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { camelCaseKeys, snakeCaseKeys } from '../lib/case-util'
import App from './components/App'
import createAppStore from './store'
import { StoreState } from './reducers'
import { Todo } from './webApi'

interface ServerState {
  todos: Array<{
    id: number,
    content: string,
    done: boolean,
    due_date: string,
    created_at: string,
    updated_at: string,
  }>
}

function convert (state: ServerState): Partial<StoreState> {
  const byId = state.todos.reduce((prev, curr) => {
    prev[curr.id] = camelCaseKeys(curr) as Todo
    return prev
  }, {} as { [id: number]: Todo })
  const ids = state.todos.map(todo => todo.id)

  return {
    todos: {
      byId,
      ids
    }
  }
}

function getPreloadedState () {
  const node = document.getElementById('todos-data')!
  return convert(JSON.parse(node.getAttribute('data')!) as ServerState)
}

document.addEventListener('DOMContentLoaded', () => {
  const store = createAppStore(getPreloadedState())

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('todo-app')
  )
})