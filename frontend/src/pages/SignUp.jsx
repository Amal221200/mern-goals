import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { signup, reset, } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    )
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Password do not match')
    } else {
      const userData = {
        name, email, password
      }

      dispatch(signup(userData))
    }
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1><FaUser /> Signup</h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name"></label>
            <input type="text" className="form-control" id='name' name='name' placeholder='Enter your name' value={name} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email"></label>
            <input type="email" className="form-control" id='email' name='email' placeholder='Enter your email' value={email} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password"></label>
            <input type="password" className="form-control" id='password' name='password' placeholder='Enter password' value={password} onChange={onChange} autoComplete="" />
          </div>
          <div className="form-group">
            <label htmlFor="password2"></label>
            <input type="password" className="form-control" id='password2' name='password2' placeholder='Confirm password' value={password2} onChange={onChange} autoComplete="" />
          </div>
          <div className="form-group">
            <button className="btn btn-block" type='submit'>Signup</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default SignUp