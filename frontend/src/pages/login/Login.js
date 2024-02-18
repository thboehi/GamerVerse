import {FaSignInAlt} from "react-icons/fa";
import {useEffect, useState} from "react";
import Spinner from "../../components/spinner/Spinner";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {login, reset} from "../../features/auth/authSlice";

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''

    })

    const { email, password } = formData
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            toast.success('Bienvenue'+ ' ' + user.first_name)
            navigate('/')
        }
        if (user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isSuccess, isError, message, navigate, dispatch])
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
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
            <div className='main-center login-container'>
                <section className='heading'>
                    <h1>
                        Login
                    </h1>
                </section>

                <section className='form'>
                    <form onSubmit={onSubmit}>

                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                name='email'
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className='form-group'>

                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                            <label htmlFor='password'>Password</label>
                        </div>
                        <button type='submit' className='main-button'>
                            Connexion
                        </button>

                    </form>

                </section>
            </div>

        </>
    );
};

export default Login;