import { FILTER_BUTTONS, type FilterValue } from "../consts";

interface Props {
  filterSelected: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export const Filters: React.FC<Props> = ({
  filterSelected,
  onFilterChange,
}) => {

  return (
    <ul className="filters">
      {Object.entries(FILTER_BUTTONS).map(([key, { literal, href }]) => {
        const isSelectead = key === filterSelected
        const className = isSelectead ? 'selected' : ''

        return (
            <li key={key}>
              <a
                href={href}
                className={className}
                onClick={event => {
                  event.preventDefault()
                  onFilterChange(key as FilterValue)
                }}
              >
                {literal}
              </a>
            </li>
        )
      })}
    </ul>
  )
}
