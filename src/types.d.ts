export interface Todo {
  id: string
  title: string
  completed: boolean
}

export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type ListOfTodos = Todo[]

export type TodosContextType = {
  todos: any[]
  handleRemove: (args: any) => void
  handleCompleted: (args: any) => void
  handleFilterChange: (filter: FilterValue) => void
  handleRemoveAllCompleted: () => void
  activeCount: number
  completedCount: number
  handleAddTodo: (args: any) => void
  handleUpdateTitle: (args: any) => void
  filterSelected: FilterValue
}