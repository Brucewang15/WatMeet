import './Header.css'
import Search from './Search/Search';
const Header = () => {

    return (
        <div className="mainContainerHeader">
            <div className="individualContainer">Test</div>
            <div className="individualContainer"><Search /></div>
            <div className="individualContainer"><a href="/login/">Login</a></div>
        </div>
    );
}
export default Header