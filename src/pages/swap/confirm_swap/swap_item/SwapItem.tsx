import CoinData from '../../../../models/CoinData';
import './swap-item.scss';


export default function SwapItem(props: { data: CoinData }) {
    return (
        <div className='swap-item'>
            <div className='flex'>
                <img className='swap-item-img' src={props.data.token.image} />
                <span className='swap-item-price'>{props.data.value}55</span>
            </div>
            <span className='swap-item-symbol'>{props.data.token.symbol}</span>
        </div>
    )
}   