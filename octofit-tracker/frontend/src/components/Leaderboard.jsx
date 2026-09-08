import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api.js'

const leaderboardEndpoint = '/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchEndpoint(leaderboardEndpoint)
      .then((data) => {
        if (isMounted) {
          setLeaderboard(data)
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
    return <div className="alert alert-warning">Unable to load leaderboard: {error}</div>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="leaderboard-list">
        {leaderboard.map((entry) => (
          <article className="leaderboard-row" key={entry._id ?? entry.username}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.username}</h2>
              <p>{entry.teamName}</p>
            </div>
            <div className="score">
              <strong>{entry.points}</strong>
              <span>{entry.weeklyMinutes} weekly min</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard