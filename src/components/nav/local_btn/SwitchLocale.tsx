import { useEffect } from 'react';
import LocaleController from '../../../controllers/LocaleController';
import { ReactComponent as Locale } from '../../../icons/language.svg';
import './locale-btn.scss';



export default function SwitchLocale() {

    useEffect(() => {

    }, []);

    const switchLanguage = (locale: string) => {
        console.log("SWITCH",locale)
        LocaleController.instance().switchLocale(locale);
    }

    return (
        <div className='dropdown'>
            <Locale className="locale-btn dropbtn" ></Locale>
            <div className="dropdown-content">
                {
                    LocaleController.instance().getLocales().map(locale => {
                        return (
                            <a className='locale-link' href="#" key={locale.id} onClick={() => switchLanguage(locale.id)}>
                                <img src={locale.image} />
                                <b>{locale.name}</b>
                            </a>
                        )
                    })
                }
            </div>
        </div>

    )
}