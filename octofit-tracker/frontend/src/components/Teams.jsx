import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('teams')
      .then((data) => {
        if (isMounted) {
          setTeams(data)
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
    return <div className="alert alert-warning">Unable to load teams: {error}</div>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Teams</p>
        <h1>Training squads</h1>
      </div>
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-4" key={team._id ?? team.name}>
            <article className="data-card">
              <span className="badge text-bg-success">{team.city}</span>
              <h2>{team.name}</h2>
              <p>Mascot: {team.mascot}</p>
              <strong>{team.memberCount} members</strong>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Teams