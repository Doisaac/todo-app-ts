import { useEffect, useRef, useState } from "react"
import { TodoId, type Todo as TodoType } from "../types"

interface Props extends TodoType {
  onToggleCompleteTodo: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void
  onRemoveTodo: ({ id }: TodoId) => void
  setTitle: ({ id, title }: Pick<TodoType, "id" | "title">) => void
  isEditing: string
  setIsEditing: (completed: string) => void
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onToggleCompleteTodo,
  setTitle,
  isEditing,
  setIsEditing,
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        setTitle({ id, title: editedTitle })
      }

      if (editedTitle === "") onRemoveTodo({ id })

      setIsEditing("")
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggleCompleteTodo({ id, completed: event.target.checked })
  }

  return (
    <>
      <div className="view">
        <input
          type="checkbox"
          checked={completed}
          className="toggle"
          onChange={handleChangeCheckBox}
        />
        <label>{title}</label>
        <button
          className="destroy"
          onClick={() => {
            onRemoveTodo({ id })
          }}
        />
      </div>

      <input
        className="edit"
        value={editedTitle}
        onChange={(e) => {
          setEditedTitle(e.target.value)
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          setIsEditing("")
        }}
        ref={inputEditTitle}
      />
    </>
  )
}
