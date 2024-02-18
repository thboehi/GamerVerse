import {FaUser} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {register, reset} from "../../features/auth/authSlice";
import Spinner from "../../components/spinner/Spinner";

const Register = () => {

    const [formData, setFormData] = useState({
        last_name: '',
        first_name: '',
        email: '',
        password: '',
        password_confirm: ''
    })

    const {last_name, first_name, email, password, password_confirm} = formData
    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess){
            toast.success("Bienvenue " + user.first_name + " !")
            navigate('/')
        }
        if (user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isSuccess, isError, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (password !== password_confirm) {
            toast.error("Les mots de passe de correspondent pas.")
        } else {
            const userData = {
                first_name,
                last_name,
                email,
                password
            }
            dispatch(register(userData))
        }

    }
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className='main-center login-container'>
                <section className='heading'>
                    <h1>
                        Register
                    </h1>
                </section>

                <section>
                    <form onSubmit={onSubmit}>

                        <div className='form-group'>
                            <label htmlFor='last_name'>Last Name</label>
                            <input
                                type='text'
                                className='form-control'
                                id='last_name'
                                name='last_name'
                                value={last_name}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='first_name'>First Name</label>
                            <input
                                type='text'
                                className='form-control'
                                id='first_name'
                                name='first_name'
                                value={first_name}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                name='email'
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password_confirm'>Confirm Password</label>
                            <input
                                type='password'
                                className='form-control'
                                id='password_confirm'
                                name='password_confirm'
                                value={password_confirm}
                                onChange={onChange}
                            />
                        </div>



                            <button type='submit' className='main-button'>
                            Register
                            </button>
                    </form>
                </section>
            </div>

        </>
    );
};

export default Register;