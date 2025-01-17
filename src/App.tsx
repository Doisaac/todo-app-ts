import { useState } from 'react'
import { Todos } from './componets/Todos'
import { TodoId } from './types'

const mockTodos = [
  {
    id: '1',
    title: 'todo 1',
    completed: false
  },
  {
    id: '2',
    title: 'todo 2',
    completed: true
  },
  {
    id: '3',
    title: 'todo 3',
    completed: false
  }
]

const App = () => {
  const [todos, setTodos] = useState(mockTodos)

  const handleRemove = ({id}: TodoId) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)

  }

  return (
    <div className="todoapp">
      <Todos todos={todos} onRemoveTodo={handleRemove}/>
    </div>
  )
}

export default App
