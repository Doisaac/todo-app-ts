import { useTodos } from "../hooks/useTodos"
import { Filters } from "./Filters"

export const Footer: React.FC = () => {
  const {
    activeCount,
    completedCount,
    filterSelected,
    handleRemoveAllCompleted,
    handleFilterChange,
  } = useTodos()

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount}</strong> Pending Tasks
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />

      {completedCount > 0 && (
        <button className="clear-completed" onClick={handleRemoveAllCompleted}>
          Clear Completed
        </button>
      )}
    </footer>
  )
}
