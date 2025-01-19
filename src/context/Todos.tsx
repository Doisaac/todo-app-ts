import { createContext, useState, ReactNode } from "react"
import { FilterValue, TODO_FILTERS } from "../consts"
import { Todo as TodoType, TodoId, TodoTitle, TodosContextType } from "../types"

const mockTodos = [
  {
    id: "1",
    title: "todo 1",
    completed: false,
  },
  {
    id: "2",
    title: "todo 2",
    completed: true,
  },
  {
    id: "3",
    title: "todo 3",
    completed: false,
  },
]



// Initial context value
const initialContext: TodosContextType = {
  todos: [],
  handleRemove: () => {},
  handleCompleted: () => {},
  handleFilterChange: () => {},
  handleRemoveAllCompleted: () => {},
  activeCount: 0,
  completedCount: 0,
  handleAddTodo: () => {},
  handleUpdateTitle: () => {},
  filterSelected: TODO_FILTERS.ALL,
}

export const TodosContext = createContext(initialContext)

export const useTodosFunctions = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(() => {
    // Reads url query params
    const params = new URLSearchParams(window.location.search)
    const filter = params.get("filter") as FilterValue | null

    if (filter === null) return TODO_FILTERS.ALL

    // checks if the filter is valid
    return Object.values(TODO_FILTERS).includes(filter)
      ? filter
      : TODO_FILTERS.ALL
  })

  const handleRemove = ({ id }: TodoId) => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleCompleted = ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue) => {
    console.log(filter)
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.length - activeCount

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleAddTodo = ({ title }: TodoTitle) => {
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  const handleUpdateTitle = ({ id, title }: Pick<TodoType, "id" | "title">) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title,
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  return {
    todos: filteredTodos,
    handleRemove,
    handleCompleted,
    handleFilterChange,
    handleRemoveAllCompleted,
    activeCount,
    completedCount,
    handleAddTodo,
    handleUpdateTitle,
    filterSelected,
  }
}

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const {
    todos: filteredTodos,
    handleRemove,
    handleCompleted,
    handleFilterChange,
    handleRemoveAllCompleted,
    activeCount,
    completedCount,
    handleAddTodo,
    handleUpdateTitle,
    filterSelected,
  } = useTodosFunctions()

  return (
    <TodosContext.Provider
      value={{
        todos: filteredTodos,
        handleRemove,
        handleCompleted,
        handleFilterChange,
        handleRemoveAllCompleted,
        activeCount,
        completedCount,
        handleAddTodo,
        handleUpdateTitle,
        filterSelected,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}
