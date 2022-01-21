import { Link } from "react-router-dom";

export default function () {
    return (
        <ul className="nav-btns">
            <li className="nav-btn nav-btns-active">
                <Link to="/">Swap</Link>
            </li>
            <li className="nav-btn">

                <Link to="/pools">Pools</Link>
            </li>
            <li className="nav-btn">Vote</li>
        </ul>
    )
}
