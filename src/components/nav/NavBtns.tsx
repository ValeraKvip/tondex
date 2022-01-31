import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';


export default function () {
    const { t, i18n } = useTranslation();

    return (
        <ul className="nav-btns">
            <li className="nav-btn ">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-btns-active' : 'inactive')}>{t('nav.swap')}</NavLink>
            </li>
            <li className="nav-btn">

                <NavLink to="/pools" className={({ isActive }) => (isActive ? 'nav-btns-active' : 'inactive')}>{t('nav.pools')}</NavLink>
            </li>
            <li className="nav-btn">{t('nav.about')}</li>
        </ul>
    )
}