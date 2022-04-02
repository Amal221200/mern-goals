import axios from 'axios'

const URL = 'http://localhost:5000'

const signup = async (userData)=>{
    const res = await axios.post(`${URL}/api/users/signup/`, userData)

    if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const login = async (userData)=>{
    const res = await axios.post(`${URL}/api/users/login/`, userData)

    if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const logout = ()=>{
    localStorage.removeItem('user')
}

const authService = {
    signup,
    login,
    logout
}

export default authService