import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    return (
        <div className='suggestions'>
            <div className='suggestions-container'>
                <h2>Jeux tendances actuellement</h2>
                <p>TEST</p>
            </div>

        </div>
    );
};

export default Header;