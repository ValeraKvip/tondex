import CurrencyInput from '../CurrencyInput/CurrencyInput';
import { ReactComponent as ArrowCircle } from '../../../icons/arrow_cycle.svg';
import React from 'react';
import Token from '../../../models/Token';
import store from '../../../store/store';
import { connect } from 'react-redux';
import { swapInputs, SwapState, updateInputs, updateSwap } from '../../../store/SwapReducer';
import MarketWatch, { CoinPrice } from '../../../models/MarketWatch';

//Omit<SwapState,"slippageTolerance|tradeDeadline">
export class InputContainer extends React.Component<any,any> {

    marketWatch: MarketWatch = null as any;

    constructor(props: any) {
        super(props);

        this.marketWatch = new MarketWatch(this.props.from.token, this.props.to.token);

        this.onSwap = this.onSwap.bind(this);
        this.onValueSet = this.onValueSet.bind(this);
        this.onSelectCoin = this.onSelectCoin.bind(this);
    }

    componentDidMount() {
        this.marketWatch.start((priceList: CoinPrice) => {

            const coin0 = {...this.props.from};
            const coin1 = {...this.props.to};
            coin0.price = priceList[`${coin0.token.id}`];
            coin1.price = priceList[`${coin1.token.id}`];

            if (this.props.origin === 0) {
                if (!coin0.value) {
                    coin1.value = '' as any;
                } else {
                    coin1.value = Number(coin0.value) * (coin0.price / coin1.price);
                }

            } else {

                if (!coin1.value) {
                    coin0.value = '' as any;
                } else {
                    coin0.value = Number(coin1.value) * (coin1.price / coin0.price);
                }
            }

            console.log('ICON', coin0, coin1)
            store.dispatch(updateInputs(coin0, coin1));
        });
    }

    componentWillUnmount() {
        this.marketWatch.stop();
    }

    onSwap() {
        store.dispatch(swapInputs());
    }

    onSelectCoin(token: Token, index: number) {       
        const invertIndex = index === 1 ? 0 : 1;
        const coins = [this.props.from, this.props.to];
        if (coins[invertIndex].token.id === token.id) {
            return this.onSwap();
        }


        const coin = { ...coins[index] };
        coin.token = token;
        coins[index] = coin;
        // this.setState({
        //     coins
        // })

        store.dispatch(updateSwap({ from: coins[0], to: coins[1], origin: this.props.origin }));
        this.marketWatch.setTokens(coins[0].token, coins[1].token);
    }

    onValueSet(value: string, token: Token) {

        const coin0 = {...this.props.from};
        const coin1 = {...this.props.to};
        var origin = 0;
        const valueNumber = parseFloat(value);

        if (coin0.token.id === token.id) {
            origin = 0;

            if (String(value) === '') {
                coin0.value = '' as any;
                coin1.value = '' as any;
            } else {

                coin0.value = value;
                coin1.value = valueNumber * (coin0.price / coin1.price);
            }

        } else {
            origin = 1;
            if (String(value) === '') {
                coin1.value = '' as any;
                coin0.value = '' as any;
            } else {
                coin1.value = value;
                coin0.value = valueNumber * (coin1.price / coin0.price);
            }
        }

        store.dispatch(updateSwap({ from: coin0, to: coin1, origin }));
    }

    render() {
        return (
            <div className='currency-container'>
                <CurrencyInput data={this.props.from} onValueSet={this.onValueSet} onSelectCoin={(token) => this.onSelectCoin(token, 0)}></CurrencyInput>
                <CurrencyInput data={this.props.to} onValueSet={this.onValueSet} onSelectCoin={(token) => this.onSelectCoin(token, 1)}></CurrencyInput>
                <ArrowCircle className='arrow-circle' onClick={this.onSwap}></ArrowCircle>
            </div>
        )
    }
}


const mapStateToProps = function (state: {swap:SwapState}) {   
    return {
        from: state.swap.from,
        to: state.swap.to,
        origin: state.swap.origin
    }
}

export default connect(mapStateToProps)(InputContainer);

