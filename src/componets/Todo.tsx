import {type Todo as TodoType } from '../types'

type Props = TodoType

export const Todo: React.FC<Props> = ({ id, title, completed }) => {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={completed}
        className="toggle"
        onChange={() => {}}
      />
      <label>{title}</label>
      <button
        className="destroy"
        onClick={() => {}}
      >

      </button>
    </div>
  )
}