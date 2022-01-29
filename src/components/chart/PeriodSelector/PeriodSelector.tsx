import './period-selector.scss';


export default function PeriodSelector(props: { active: number, changePeriod: (index: number) => void }) {

    const btns = ['D', 'W', 'M'];

    return (
        <div className='period-selector'>
            {
                btns.map((btn, index) => {
                    const className = index === props.active ? 'active' : '';
                    return (<a className={className} href='#' onClick={() => {
                        if (index !== props.active) {
                            props.changePeriod(index)
                        }
                    }}>{btn}</a>);
                })
            }
        </div>
    )
}