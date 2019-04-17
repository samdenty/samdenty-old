import React from 'react'
import ReactDOM from 'react-dom'

const GithubUser = () => {
  const { data } = useQuery()
  const user = data.user({ login: 'torvalds' })

  return (
    <div>
      <h1>
        {user.login} ({user.followers.totalCount} followers)
      </h1>
      <p>{user.bio}</p>

      <h2>Following:</h2>
      {user.following.nodes.map(user => (
        <a href={user.url} key={user.id}>
          {user.login}
        </a>
      ))}
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<div>test</div>, rootElement)
