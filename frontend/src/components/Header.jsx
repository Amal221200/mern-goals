import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogout = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    return (
        <header className='header'>
            <div className="logo">
                <Link to='/'>GoalSetter</Link>
            </div>
            <ul>
                {user ? (<li>
                    <button className='btn' onClick={onLogout}><FaSignOutAlt /> Logout</button>
                </li>) : (<>
                    <li>
                        <Link to='/login'><FaSignInAlt /> Login</Link>
                    </li>
                    <li>
                        <Link to='/signup'><FaUser /> SignUp</Link>
                    </li>
                </>)}
            </ul>
        </header>
    )
}

export default Header