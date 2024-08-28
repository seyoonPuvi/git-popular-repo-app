// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repoDetails} = props
  const {name, forksCount, starsCount, avatarUrl, issuesCount} = repoDetails

  return (
    <li className="repo-list">
      <img src={avatarUrl} alt={name} className="repo-img" />
      <h1 className="name">{name}</h1>
      <div className="count-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="count-category-img"
        />
        <p className="count">{starsCount} stars</p>
      </div>

      <div className="count-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="count-category-img"
        />
        <p className="count">{forksCount} forks</p>
      </div>

      <div className="count-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="count-category-img"
        />
        <p className="count">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
