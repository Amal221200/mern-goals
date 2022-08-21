import axios from 'axios'


const bearer = (token) => {
    return {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
}

const createGoal = async (goal, token) => {
    const res = await axios.post('/api/goals/', goal, bearer(token))

    return res.data
}

const getGoals = async (token) => {
    const res = await axios.get('/api/goals/', bearer(token))

    return res.data
}

const deleteGoal = async (id, token) => {
    const res = await axios.delete(`/api/goals/${id}`, bearer(token))

    return res.data
}


const goalService = {
    createGoal,
    getGoals,
    deleteGoal
}

export default goalService