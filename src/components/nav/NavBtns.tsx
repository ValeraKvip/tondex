import { Link, NavLink } from "react-router-dom";

export default function () {
    return (
        <ul className="nav-btns">
            <li className="nav-btn ">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-btns-active' : 'inactive')}>Swap</NavLink>
            </li>
            <li className="nav-btn">

                <NavLink to="/pools" className={({ isActive }) => (isActive ? 'nav-btns-active' : 'inactive')}>Pools</NavLink>
            </li>
            <li className="nav-btn">About</li>
        </ul>
    )
}