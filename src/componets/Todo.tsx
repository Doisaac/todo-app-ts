import { useEffect, useRef, useState } from "react"
import { type Todo as TodoType } from "../types"
import { useTodos } from "../hooks/useTodos"

interface Props extends TodoType {
  setTitle: ({ id, title }: Pick<TodoType, "id" | "title">) => void
  isEditing: string
  setIsEditing: (completed: string) => void
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  isEditing,
  setIsEditing,
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)
  const { handleRemove, handleCompleted, handleUpdateTitle } = useTodos()

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      setEditedTitle(editedTitle.trim())

      if (editedTitle !== title) {
        handleUpdateTitle({ id, title: editedTitle })
      }

      if (editedTitle === "") handleRemove({ id })

      setIsEditing("")
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleCompleted({ id, completed: event.target.checked })
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
            handleRemove({ id })
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
