import './nav.scss';
import logo from '../../icons/ton_symbol.svg';
import DayNightButton from './DayNightButton';
import ConnectWalletBtn from '../wallet/ConnectWalletBtn';
import SwitchLocale from './SwitchLocale';
import NavBtns from './NavBtns';
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <div className="logo-container">
            <Link className="logo-link" to="/">
         
                <img className="icon" src={logo} alt="logo" />
                <span className="app-name">TON DEX</span>
            
            </Link>
            <NavBtns></NavBtns>
            </div>
   

            <div className='nav-container'>
                <SwitchLocale></SwitchLocale>
                <DayNightButton></DayNightButton>
                <ConnectWalletBtn></ConnectWalletBtn>
            </div>

        </nav>
    );
}