import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
// Write your code here

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    activeFilterId: languageFiltersData[0].id,
    repoList: [],
  }

  componentDidMount() {
    this.getFilteredGithubRepo()
  }

  onSuccess = data => {
    const formattedList = data.map(eachRepo => ({
      name: eachRepo.name,
      id: eachRepo.id,
      issuesCount: eachRepo.issues_count,
      forksCount: eachRepo.forks_count,
      starsCount: eachRepo.stars_count,
      avatarUrl: eachRepo.avatar_url,
    }))
    this.setState({
      repoList: formattedList,
      apiStatus: apiStatusConstant.success,
    })
  }

  onFailure = () => {
    this.setState({apiStatus: apiStatusConstant.failure})
  }

  getFilteredGithubRepo = async () => {
    const {activeFilterId} = this.state
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const url = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    try {
      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()
        this.onSuccess(data.popular_repos)
      } else {
        this.onFailure() // This runs if the response status is not ok
      }
    } catch (error) {
      console.error('Error:', error) // Logs the actual error for debugging
    }
  }

  onUpdateActiveFilterId = id => {
    this.setState({activeFilterId: id}, this.getFilteredGithubRepo)
  }

  onRenderLanguageFilteredItems = () => {
    const {activeFilterId} = this.state

    return (
      <ul className="filter-list-cont">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            filterdata={each}
            key={each.id}
            onUpdateActiveFilterId={this.onUpdateActiveFilterId}
            activeFilterId={activeFilterId}
          />
        ))}
      </ul>
    )
  }

  onRenderRepositoryItem = () => {
    const {repoList} = this.state

    return (
      <ul className="repo-list-cont">
        {repoList.map(eachRepo => (
          <RepositoryItem repoDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  onRenderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  onRenderFailureCont = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-name">Something Went Wrong</h1>
    </div>
  )

  onDisplayRepository = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.onRenderLoader()
      case apiStatusConstant.success:
        return this.onRenderRepositoryItem()
      case apiStatusConstant.failure:
        return this.onRenderFailureCont()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-cont">
        <div className="main-cont">
          <h1 className="title">Popular</h1>
          {this.onRenderLanguageFilteredItems()}
          {this.onDisplayRepository()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
