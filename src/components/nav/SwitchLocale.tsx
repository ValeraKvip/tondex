import { ReactComponent as Locale } from '../../icons/language.svg';

export default function SwitchLocale() {

    const switchLanguage = () => {
        window.alert("You can choose any language, as long as it's English");
    }


    return (
        <Locale className="locale-btn" onClick={switchLanguage}></Locale>
    )
}