import './Header.css'
import Search from './Search/Search';
import { useNavigate } from 'react-router-dom';
import Logo from '../pictures/Watclub_logo_transparent.png'
import { useSelector, useDispatch  } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {logout} from '../redux/actions/authActions';
const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRedirectMainPage = () => {
        navigate('/')
    }

    const [userPfp, setUserPfp] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);


    const auth = useSelector(state => state.auth)
    const { isAuthenticated, accessToken } = auth;

    const get_user_pfp = async () => {
        try {
            const arrayToken = accessToken.split('.');
            const tokenPayload = JSON.parse(atob(arrayToken[1]));
            const userId = tokenPayload.user_id;

            const response = await fetch(`http://127.0.0.1:8000/users/get_user_pfp/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: {
                    user_id: userId
                }
            });
            if (response.ok) {
                setUserPfp(response.data.imageurl);
                console.log(response.data.imageurl)
            }


        } catch (error) {
            console.error('Error fetching user profile picture:', error);
        }
    };

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         get_user_pfp();
    //     }
    // }, [isAuthenticated]);

    const handleLogout = () => {
        // Dispatch logout action if you have one
        console.log('logging out')
        dispatch(logout());
        // Redirect to home page
        
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };


    return (
        <div className="mainContainerHeader">
            <div className="mainContainerHeaderWrapper">
                <div onClick={handleRedirectMainPage} className="individualContainer"><img src={Logo} alt="" /></div>
                <div className="individualContainer"><Search /></div>
                {!isAuthenticated ? (
                    <div className="individualContainer">
                        <a href="/login/">Login</a>
                    </div>
                ) : (
                    <div className="individualContainer2">
                        <img
                            src={userPfp || 'default_pfp.png'}
                            onClick={toggleDropdown}
                            className="profilePicture"
                        />
                        {dropdownVisible && (
                            <div className="dropdownMenu">
                                <Link className='dropdownMenuIndividual' to={`/users/:userId`}>Profile</Link>
                                <div className='dropdownMenuIndividual' onClick={handleLogout}>Logout</div>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
}
export default Header