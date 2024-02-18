import {Link, useNavigate} from "react-router-dom";
import {FaEdit, FaSearch, FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {logout, reset} from "../../features/auth/authSlice";
import {GoHomeFill} from "react-icons/go";
import {IoChatbubble} from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset)
        navigate('/')
    }
    return (
        <header className='navigation'>
            <ul>
                <li>
                    <Link to='/' className="nav-btn">
                        <nobr><GoHomeFill /><p>Home</p></nobr>
                    </Link>
                </li>
                <li>
                    <Link to='/' className="nav-btn">
                        <nobr><FaSearch /><p>Explore</p></nobr>
                    </Link>
                </li>
                {user ? (
                    <>

                        <li>
                            <Link to='/adminArticles' className="nav-btn">
                                <nobr><IoChatbubble  /><p>Messages</p></nobr>
                            </Link>
                        </li>

                        <li>
                            <button className="nav-btn" onClick={onLogout}>
                                <nobr><FaSignOutAlt /><p>Logout</p></nobr>
                            </button>
                        </li>

                        <li>
                            <Link to='/profile' className="nav-btn">
                                <nobr><FaCircleUser  /><p>Profile</p></nobr>
                            </Link>
                        </li>
                    </>

                ) : (
                    <>
                        <li>
                            <Link className="nav-btn" to='/register'>
                                <nobr><FaUser/><p>Register</p></nobr>
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-btn" to='/login'>
                                <nobr><FaSignInAlt/><p>Login</p></nobr>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default Header;