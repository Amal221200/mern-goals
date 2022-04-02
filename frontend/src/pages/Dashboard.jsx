import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getGoals, reset } from '../features/goals/goalSlice'
import AddGoal from '../components/AddGoal'
import Spinner from '../components/Spinner'
import GoalItem from '../components/GoalItem'

const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { goals, isError, isSucces, isLoading, message } = useSelector((state) => state.goals)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getGoals())

    if (user === null) {
      navigate('/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [navigate, user, isError, isSucces, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <AddGoal />
      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map(goal => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (<h3>You have not set any goals yet</h3>)}
      </section>
    </>
  )
}

export default Dashboard