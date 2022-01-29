import React from 'react';
import ChartView from '../../components/chart/ChartView';
import SwapBtn from '../../components/swap-btn/SwapBtn';
import Toggle from '../../components/toggle/Toggle';
import ConnectWalletBtn from '../../components/wallet/ConnectWalletBtn';
import CoinData from '../../models/CoinData';
import MarketWatch, { CoinPrice } from '../../models/MarketWatch';
import Token from '../../models/Token';
import store from '../../store/store';
import { formatPrice } from '../../utils';
import CurrencyInput from './CurrencyInput/CurrencyInput';
import InputContainer from './CurrencyInput/InputContainer';
import SettingBtn from './settings/SettingsBtn';
import SlippageTolerance from './slippage_tolerance/SlippageTolerance';
import './swap.scss';
import TradeDeadline from './trade-deadline/TradDeadline';


export default class Swap extends React.Component<any, { coins: CoinData[] }> {
    marketWatch: MarketWatch;
    origin: number;

    constructor(props: any) {
        super(props);

        this.origin = 0;

        this.state = {
            coins: [{
                name: "TONCOIN",
                short: "TON",
                icon: "ton.svg",
                price: 0,
                value: '' as any,
                token: { "id": "toncoin", "symbol": "ton", "name": "Toncoin", "image": "assets/icons/ton.svg" }
            },
            {
                name: "Bitcon",
                short: "BTC",
                icon: "btc.svg",
                price: 0,
                value: '' as any,
                token: { "id": "ethereum", "symbol": "eth", "name": "Ethereum", "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880" }
            }]
        }

        this.marketWatch = new MarketWatch(this.state.coins[0].token, this.state.coins[1].token);
        this.onSwap = this.onSwap.bind(this);
        this.onValueSet = this.onValueSet.bind(this);
        this.onSelectCoin = this.onSelectCoin.bind(this);
    }

    componentDidMount() {
        this.marketWatch.start((priceList: CoinPrice) => {

            const coins = this.state.coins;
            const coin0 = this.state.coins[0];
            const coin1 = this.state.coins[1]
            coin0.price = priceList[`${coin0.token.id}`];
            coin1.price = priceList[`${coin1.token.id}`];

            if (this.origin === 0) {
                if (!coin0.value) {
                    coin1.value = '' as any;
                } else {
                    coin1.value = coin0.value * (coin0.price / coin1.price);
                }

            } else {

                if (!coin1.value) {
                    coin0.value = '' as any;
                } else {
                    coin0.value = coin1.value * (coin1.price / coin0.price);
                }
            }

            this.setState({
                coins: [coin0, coin1]
            })
        });
    }

    componentWillUnmount() {
        this.marketWatch.stop();
    }

    onSelectCoin(token: Token, index: number) {
        const invertIndex = index === 1 ? 0 : 1;
        if (this.state.coins[invertIndex].token.id === token.id) {
            return this.onSwap();
        }

        const coins = [...this.state.coins];
        const coin = { ...coins[index] };
        coin.token = token;
        coins[index] = coin;
        this.setState({
            coins
        })

        this.marketWatch.setTokens(coins[0].token, coins[1].token);
    }

    onValueSet(value: number, token: Token) {
      
        const coin0 = this.state.coins[0];
        const coin1 = this.state.coins[1]

        if (coin0.token.id === token.id) {
            this.origin = 0;

            if (String(value) === '') {
                coin0.value = '' as any;
                coin1.value = '' as any;
            } else {

                coin0.value = value;
                coin1.value = value * (coin0.price / coin1.price);
            }

        } else {
            this.origin = 1;
            if (String(value) === '') {
                coin1.value = '' as any;
                coin0.value = '' as any;
            } else {
                coin1.value = value;
                coin0.value = value * (coin1.price / coin0.price);
            }
        }

        console.log("##val!!!@@@@",coin0, coin1)
        this.setState({
            coins: [coin0, coin1]
        })
    }

    onSwap() {
        this.origin = !this.origin ? 1 : 0;
        this.setState({
            coins: [this.state.coins[1], this.state.coins[0]]
        })
    }


    render() {
        return (
            <div id="swap-page">
                <ChartView from={this.state.coins[0]} to={this.state.coins[1]}></ChartView>
                <div className="swap-container">
                    <div className='swap-container-header'>
                        <h3>Swap</h3>
                        <SettingBtn></SettingBtn>
                    </div>

                    <InputContainer from={this.state.coins[0]} to={this.state.coins[1]} onSwap={this.onSwap} onValueSet={this.onValueSet} onSelectCoin={this.onSelectCoin}></InputContainer>
                    <p className='price-per-one'> 1 {this.state.coins[0].token.symbol} = {formatPrice(this.state.coins[0].price / this.state.coins[1].price)} {this.state.coins[1].token.symbol}</p>
                   <SlippageTolerance></SlippageTolerance>
                   <TradeDeadline></TradeDeadline>
                    {store.getState().wallet.address ? <SwapBtn from={this.state.coins[0]} to={this.state.coins[1]}></SwapBtn> : <ConnectWalletBtn></ConnectWalletBtn>}

                </div>

            </div>
        )
    }
}