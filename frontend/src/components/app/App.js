import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "../header/Header";
import Home from "../../pages/home/Home";
import Register from "../../pages/register/Register";
import Login from "../../pages/login/Login";
import Error from "../../pages/error/Error";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import ArticlesAdmin from "../../pages/articlesAdmin/ArticlesAdmin";
import {useSelector} from "react-redux";
import Profile from "../../pages/profile/Profile";

function App() {

    const {user} = useSelector((state) => state.auth)

    return (
        <>
            <Router>
                <div className='container'>
                    <Header/>
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/login' element={<Login/>}/>
                        {user &&
                            <>
                                <Route path='/adminArticles' element={<ArticlesAdmin/>}/>
                            </>
                        }
                        <Route path='/profile' element={<Profile/>}/>
                        <Route path='/*' element={<Error/>}/>
                    </Routes>
                </div>
            </Router>
            <ToastContainer/>
        </>
    );
}

export default App;
