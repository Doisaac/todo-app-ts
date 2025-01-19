import { useState } from "react"
import { Todo } from "./Todo"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useTodos } from "../hooks/useTodos"


export const Todos: React.FC = () => {
  const { todos } = useTodos()
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
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </li>
      ))}
    </ul>
  )
}
