import './currency-input.scss';
import { ReactComponent as Coin } from '../../../icons/ton_symbol.svg';
import Crypto from '../../../models/Crypto';
import CoinData from '../../../models/CoinData';
import { formatPrice } from '../../../utils';
import React from 'react';
import TokenSelect from '../../tokens/TokenSelects';
import ReactDOM from 'react-dom';
import Token from '../../../models/Token';

export default class CurrencyInput extends React.Component<{
    data: CoinData,
    onValueSet: (value: number, token: Token) => any,
    onSelectCoin: (token: Token) => void
}, { showSelectToken: boolean }>{

    constructor(props: any) {
        super(props);

        this.state = {
            showSelectToken: false
        }

        this.onValueSet = this.onValueSet.bind(this);
       
    }

    onValueSet(evt: any) {
        console.log('NEW VALUE', evt.target, evt.target.value, String(this.props.data.value).length);



        const val = (evt.target.value);
        if (!val.match(/^[0-9]*[.]?[0-9]*$/) || (String(this.props.data.value).length === 0 && evt.target.value === '.')) {
            return;
        }

        const v = Number(evt.target.value);
        if (!isNaN(v) && v > 100000000000) {
            return
        }

        this.props.onValueSet(val, this.props.data.token);
    }

    shortPrice(price:any){
      //  console.log('shortPrice',price,Number(price));
        const num = Number.parseFloat(price);
        if(isNaN(num) || String(price).match(/\d[.]$/)){
            return price;
        }

        return Number(num.toFixed(6));
    }



    render(): React.ReactNode {


        var showModal = null;
        if (this.state.showSelectToken) {
            showModal = <TokenSelect onClose={() => this.setState({ showSelectToken: false })} onSelect={this.props.onSelectCoin}></TokenSelect>
        }

        return (
            <div className='currency-input' >
                <div>
                    <input className='in-crypto' type="text" value={this.shortPrice(this.props.data.value)} onChange={this.onValueSet} placeholder='0' />

                    <div className='in-usd'>
                        {formatPrice(this.props.data.price)}$
                    </div>
                </div>
                <a className='selected-currency' onClick={() => this.setState({ showSelectToken: true })}>
                    <img className='selected-currency-icon' src={this.props.data.token.image} />
                    <span>{this.props.data.token.symbol}</span>
                </a>
                {showModal}
            </div>


        )
    }

}

