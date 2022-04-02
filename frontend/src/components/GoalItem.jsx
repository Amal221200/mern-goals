import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'

const GoalItem = ({ goal }) => {

  const dispatch = useDispatch()
  const onDelete = (id) => {
    console.log(id)
    dispatch(deleteGoal(id))
  }

  return (
    <div className='goal'>
      <div>
        {new Date(goal.createdAt).toLocaleString('en-IN')}
      </div>
      <h2>{goal.text}</h2>
      <button onClick={() => onDelete(goal._id)} className="close">X</button>
    </div>
  )
}

export default GoalItem