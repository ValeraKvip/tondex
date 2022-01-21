
import CurrencyInput from '../CurrencyInput/CurrencyInput';
import { ReactComponent as ArrowCircle } from '../../../icons/arrow_cycle.svg';
import React from 'react';
import CoinData from '../../../models/CoinData';
import Token from '../../../models/Token';

export default class InputContainer extends React.Component<{
    to: CoinData,
    from: CoinData,
    onSwap: () => void,
    onValueSet: (value: number, token: Token) => void,
    onSelectCoin: (token: Token, index: number) => void
}, any> {

    constructor(props: any) {
        super(props);
    }

    swap() {
        this.props.onSwap();
    }

    render() {
        return (
            <div className='currency-container'>
                <CurrencyInput data={this.props.from} onValueSet={this.props.onValueSet} onSelectCoin={(token) => this.props.onSelectCoin(token, 0)}></CurrencyInput>
                <CurrencyInput data={this.props.to} onValueSet={this.props.onValueSet} onSelectCoin={(token) => this.props.onSelectCoin(token, 1)}></CurrencyInput>
                <ArrowCircle className='arrow-circle' onClick={this.props.onSwap}></ArrowCircle>
            </div>
        )
    }
}
