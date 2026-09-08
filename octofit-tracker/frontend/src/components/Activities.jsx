import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    fetchCollection('activities')
      .then((data) => {
        if (isMounted) {
          setActivities(data)
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
    return <div className="alert alert-warning">Unable to load activities: {error}</div>
  }

  return (
    <section className="content-panel">
      <div className="section-heading">
        <p className="eyebrow">Activity log</p>
        <h1>Recent activities</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Member</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id ?? `${activity.username}-${activity.activityDate}`}>
                <td>{activity.username}</td>
                <td>{activity.activityType}</td>
                <td>{activity.durationMinutes} min</td>
                <td>{activity.caloriesBurned}</td>
                <td>{new Date(activity.activityDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Activities