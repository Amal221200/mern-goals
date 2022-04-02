import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from '../components/Spinner'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, dispatch, navigate])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1><FaSignInAlt /> Login</h1>
        <p>Login and start setting goals</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input type="email" className="form-control" id='email' name='email' placeholder='Enter your email' value={email} onChange={onChange} autoComplete="" />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input type="password" className="form-control" id='password' name='password' placeholder='Enter password' value={password} onChange={onChange} autoComplete="" />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type='submit'>Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login