import { Todos } from "./componets/Todos"
import { Footer } from "./componets/Footer"
import { Header } from "./componets/Header"
import { useTodos } from "./hooks/useTodos"

const App = () => {
  const {
    todos,
    filterSelected,
    handleRemove,
    handleCompleted,
    handleFilterChange,
    handleRemoveAllCompleted,
    handleUpdateTitle,
    handleAddTodo,
    activeCount,
    completedCount,
  } = useTodos()

  return (
    <div className="todoapp">
      <Header onAddTodo={handleAddTodo} />

      <Todos
        todos={todos}
        onRemoveTodo={handleRemove}
        onToggleCompleteTodo={handleCompleted}
        setTitle={handleUpdateTitle}
      />

      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      ></Footer>
    </div>
  )
}

export default App
