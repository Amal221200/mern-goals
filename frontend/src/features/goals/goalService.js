import axios from 'axios'

const URL = 'http://localhost:5000'
// const bearer = {
//     headers: {
//         Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
//     }
// }

const bearer = (token)=>{
    return {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
}

const createGoal = async (goal, token) => {
    const res = await axios.post(`${URL}/api/goals/`, goal, bearer(token))

    return res.data
}

const getGoals = async (token) => {
    const res = await axios.get(`${URL}/api/goals/`, bearer(token))

    return res.data
}

// const updateGoal = async ({ id, text }, token) => {
//     const res = await axios.put(`${URL}/api/goals/${id}`, { text }, bearer(token))

//     return res.data
// }

const deleteGoal = async (id, token) => {
    const res = await axios.delete(`${URL}/api/goals/${id}`, bearer(token))

    return res.data
}


const goalService = {
    createGoal,
    getGoals,
    // updateGoal,
    deleteGoal
}

export default goalService