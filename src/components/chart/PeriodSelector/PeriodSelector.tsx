import './period-selector.scss';
import { useTranslation } from 'react-i18next';



export default function PeriodSelector(props: { active: number, changePeriod: (index: number) => void }) {

    const { t, i18n } = useTranslation();
    const btns = [t('chart.day'), t('chart.week'),t('chart.month')];

    return (
        <div className='period-selector'>
            {
                btns.map((btn, index) => {
                    const className = index === props.active ? 'active' : '';
                    return (<a className={className} href='#' key={btn} onClick={() => {
                        if (index !== props.active) {
                            props.changePeriod(index)
                        }
                    }}>{btn}</a>);
                })
            }
        </div>
    )
}