import { useState } from "react"
import { type Todo as TodoType, type TodoId, type ListOfTodos } from "../types"
import { Todo } from "./Todo"
import { useAutoAnimate } from "@formkit/auto-animate/react"

interface Props {
  todos: ListOfTodos
  onToggleCompleteTodo: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void
  onRemoveTodo: ({ id }: TodoId) => void
  setTitle: ({ id, title }: Pick<TodoType, "id" | "title">) => void
}

export const Todos: React.FC<Props> = ({
  todos,
  onRemoveTodo,
  onToggleCompleteTodo,
  setTitle,
}) => {
  const [isEditing, setIsEditing] = useState("")
  const [parent] = useAutoAnimate()

  return (
    <ul className="todo-list" ref={parent}>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`
            ${todo.completed ? "completed" : ""}
            ${isEditing === todo.id ? "editing" : ""}
          `}
          onDoubleClick={() => setIsEditing(todo.id)}
        >
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onRemoveTodo={onRemoveTodo}
            onToggleCompleteTodo={onToggleCompleteTodo}
            setTitle={setTitle}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  )
}
