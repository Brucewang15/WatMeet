import './Header.css'
import Search from './Search/Search';
import { useNavigate } from 'react-router-dom';
import Logo from '../pictures/Watclub_logo_transparent.png'
import { useSelector } from 'react-redux';
const Header = ({ setSearchPropt }) => {

    const navigate = useNavigate();
    const handleRedirectMainPage = () => {
        navigate('/')
    }
    const auth = useSelector(state => state.auth)
    const { isAuthenticated } = auth;
    return (
        <div className="mainContainerHeader">
            <div onClick={handleRedirectMainPage} className="individualContainer"><img src={Logo} alt="" /></div>
            <div className="individualContainer"><Search setSearchPropt={setSearchPropt} /></div>
            {!isAuthenticated ? (<div className="individualContainer"><a href="/login/">Login</a></div>)
                : (<div className="individualContainer"><a href="/account">Account</a></div>)}

        </div>
    );
}
export default Header