import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api.js'

const workoutsEndpoint = '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchEndpoint(workoutsEndpoint)
      .then((data) => {
        if (isMounted) {
          setWorkouts(data)
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
    return <div className="alert alert-warning">Unable to load workouts: {error}</div>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Suggestions</p>
        <h1>Workout library</h1>
      </div>
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6" key={workout._id ?? workout.title}>
            <article className="data-card workout-card">
              <span className="badge text-bg-warning">{workout.difficulty}</span>
              <h2>{workout.title}</h2>
              <p>{workout.category} · {workout.durationMinutes} min</p>
              <div className="focus-list">
                {(workout.focusAreas ?? []).map((area) => (
                  <span key={area}>{area}</span>
                ))}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Workouts