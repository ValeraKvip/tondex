import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChartView from '../../components/chart/ChartView';
import { bigNumberFormat } from '../../utils';
import CurrencyImage from '../pools/pools_list/CurrencyImage';
import './pool-details.scss';


const fromMock = {
    price: 0,
    value: '',
    token: { "id": "toncoin", "symbol": "ton", "name": "Toncoin", "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880" }
};
const toMock = {
    price: 0,
    value: '',
    token: { "id": "ethereum", "symbol": "eth", "name": "Ethereum", "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880" }
};


export function PoolDetails() {
    const params = useParams() as any;
    const ids = params.pool.split('_');

    const [pool, setPool] = useState([]) as any

    useEffect(() => {
        axios.get('https://api.pancakeswap.info/api/v2/pairs').then(res => {
            if (res?.data?.data) {
                console.log('params', res.data.data[params.pool])

                fromMock.token.image = `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${ids[0]}/logo.png`;
                toMock.token.image = `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${ids[1]}/logo.png`;
              
                setPool(res.data.data[params.pool] as any);
            }
        });
    }, [])

    console.log('POOL', pool)
    if(pool){
        fromMock.token.symbol = pool['base_symbol'];
        toMock.token.symbol = pool['quote_symbol'];
    }
    
    return (
        <div className='page-pool-details page'>

            <ChartView to={toMock} from={fromMock}></ChartView>
            <div className='page-pool-container'>
                <div className='page-pool-header'>
                    <div className='flex'>
                        <CurrencyImage src={ids[0]} />
                        <CurrencyImage src={ids[1]} />
                        <b>{pool['base_symbol']}/{pool['quote_symbol']}</b>
                    </div>
                    <b>
                        Liquidity: {bigNumberFormat(pool['liquidity'], 3)}
                    </b>

                </div>
                <p>
                    <b> 24h Volume</b>
                </p>

                <p className='flex flex-space-between'>
                    <b>{pool['base_symbol']}</b>
                    <b>{bigNumberFormat(pool['base_volume'], 3)}</b>
                </p>
                <p className='flex flex-space-between'>
                    <b>{pool['quote_symbol']}</b>
                    <b>{bigNumberFormat(pool['quote_volume'], 3)}</b>
                </p>


                <p className='flex flex-space-between'>
                    <b>Price</b>
                    <b>{bigNumberFormat(pool['price'], 3)}</b>
                </p>

                <p className='flex flex-space-between'>
                    <b>Tier fee</b>
                    <b>0.3%</b>
                </p>

            </div>
        </div>
    )

}
