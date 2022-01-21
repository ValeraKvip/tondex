//import sun from '../../icons/sun.svg';
//import moon from '../../icons/moon.svg';
import { ReactComponent as Sun } from '../../icons/sun.svg';
import { ReactComponent as Moon } from  '../../icons/moon.svg';
//import store from '../../store/store';

export default function DayNightButton(){

   // store.subscribe()
    const Icon = true? Sun:Moon;

    return(
        <a className="theme-switch">
          <Icon className='icon'></Icon>
        </a>
    )
}