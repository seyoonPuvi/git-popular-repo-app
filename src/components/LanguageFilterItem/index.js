// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {filterdata, onUpdateActiveFilterId, activeFilterId} = props
  const {id, language} = filterdata
  const filterBtnClassName = activeFilterId === id ? 'active-filter' : null

  const onChangeFilter = () => onUpdateActiveFilterId(id)

  return (
    <li className="filter-list">
      <button
        type="button"
        onClick={onChangeFilter}
        className={`filter-btn ${filterBtnClassName}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
