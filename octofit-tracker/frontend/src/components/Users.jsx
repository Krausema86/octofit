import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('users')
      .then((data) => {
        if (isMounted) {
          setUsers(data)
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (error) {
    return <div className="alert alert-warning">Unable to load users: {error}</div>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h1>OctoFit members</h1>
      </div>
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-4" key={user._id ?? user.username}>
            <article className="data-card">
              <span className="badge text-bg-info">{user.teamName}</span>
              <h2>{user.displayName}</h2>
              <p>@{user.username}</p>
              <strong>{user.fitnessGoal}</strong>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Users