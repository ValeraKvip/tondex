import i18n from '../locale/locale';

const SAVED_LOCALE = "SAVED_LOCALE";

export default class LocaleController {
    private static _instance: LocaleController;
    private locale: string = 'en';

    static instance(): LocaleController {
        return LocaleController._instance || (LocaleController._instance = new LocaleController());
    }

    private constructor() {
        this.loadLocale();
    }

    private async loadLocale() {
        const locale = localStorage.getItem(SAVED_LOCALE);
        if (locale) {
            this.locale = locale;
            i18n.changeLanguage(locale);
        }
    }

    async switchLocale(locale: string) {
        this.locale = locale;
        localStorage.setItem(SAVED_LOCALE, locale);
        i18n.changeLanguage(locale);
    }

    getLocale(): string {
        return this.locale;
    }

    getLocales() {
        return [
            {
                image: "/assets/icons/en.png",
                name: 'EN',
                id:"en"

            },
            {
                image: "/assets/icons/ua.png",
                name: 'UA',
                id:"ua"
            },
            {
                image: "/assets/icons/ru.png",
                name: 'RUS',
                id:"ru"
            },
            {
                image: "/assets/icons/kote.png",
                name: "Cat's",
                id:"cat"
            }
        ]
    }
}