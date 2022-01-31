import dark_styles from '../style/dark-theme.json';
import light_styles from '../style/light-theme.json';

const THEME = 'THEME';
const THEME_DARK = 'THEME_DARK';
const THEME_LIGHT = 'THEME_LIGHT';


export default class ThemeController {
    private theme: typeof THEME_LIGHT | typeof THEME_DARK;

    static _instance: ThemeController;

    public static instance(): ThemeController {
        return ThemeController._instance || (ThemeController._instance = new ThemeController());
    }

    public static init() {
        return this.instance();
    }

    private constructor() {
        this.theme = THEME_LIGHT;
        this.loadTheme();
    }

    public isDark(): boolean {
        return this.theme === THEME_DARK;
    }

    private loadTheme() {
        const savedTheme = localStorage.getItem(THEME);
        if (savedTheme && (savedTheme === THEME_DARK || savedTheme === THEME_LIGHT)) {
            this.theme = savedTheme;
        }
        else {// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.theme = THEME_DARK;
        }

        this.applyTheme();
    }

    public switchTheme(): boolean {
        this.theme = (this.isDark() ? THEME_LIGHT : THEME_DARK);
        localStorage.setItem(THEME, this.theme);

        this.applyTheme();
        return this.isDark();
    }

    private applyTheme() {
        const _style = document.body.style;
        const styles = this.isDark() ? dark_styles : light_styles as any;
        for (const prop in styles) {
            _style.setProperty(prop, styles[prop]);
        }
    }
}