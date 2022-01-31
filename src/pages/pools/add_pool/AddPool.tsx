import React from "react";
import { connect } from "react-redux";
import  SupplyBtn  from "../../../components/supply-btn/SupplyBtn";
import SwapBtn from "../../../components/swap-btn/SwapBtn";
import ConnectWalletBtn from "../../../components/wallet/ConnectWalletBtn";
import MarketWatch, { CoinPrice } from "../../../models/MarketWatch";
import Token from "../../../models/Token";
import { PoolState, updatePool } from "../../../store/PoolReducer";
import { WalletState } from "../../../store/WalletReducer";
import CurrencyInput from "../../swap/CurrencyInput/CurrencyInput";
import './add-pool.scss';
import  FeeTier  from "./fee-tier/FeeTier";

type Prop = Omit<PoolState,'tier'> & WalletState;

export class AddPool extends React.Component<Prop, any> {
    marketWatch: MarketWatch = null as any;

    constructor(props: any) {
        super(props);

        this.onValueSet = this.onValueSet.bind(this);
        this.onSelectCoin = this.onSelectCoin.bind(this);
        this.marketWatch = new MarketWatch(this.props.from.token, this.props.to.token);
    }


    componentDidMount() {
        this.marketWatch.start((priceList: CoinPrice) => {

            const coin0 = { ...this.props.from };
            const coin1 = { ...this.props.to };
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
            updatePool({
                from: coin0,
                to: coin1,
            });
        });
    }

    componentWillUnmount() {
        this.marketWatch.stop();
    }


    onSelectCoin(token: Token, index: number) {

        const invertIndex = index === 1 ? 0 : 1;
        const coins = [{ ...this.props.from }, { ...this.props.to }];
        if (coins[invertIndex].token.id === token.id) {
            return updatePool({
                to: { ...this.props.from },
                from: { ...this.props.to },
                origin: this.props.origin ? 1 : 0,
            });
        }


        const coin = { ...coins[index] };
        coin.token = token;
        coins[index] = coin;
        // this.setState({
        //     coins
        // })

        updatePool({
            from: coins[0],
            to: coins[1],
        });

        //  store.dispatch(updateSwap({ from: coins[0], to: coins[1], origin: this.props.origin }));
        this.marketWatch.setTokens(coins[0].token, coins[1].token);
    }

    onValueSet(value: string, token: Token) {

        const coin0 = { ...this.props.from };
        const coin1 = { ...this.props.to };
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
        updatePool({
            from: coin0,
            to: coin1,
            origin
        });
    }

    render(): React.ReactNode {
        return (
            <div className="add-pool">
                <CurrencyInput data={this.props.from} onValueSet={this.onValueSet} onSelectCoin={(token) => this.onSelectCoin(token, 0)}></CurrencyInput>
                <div>+</div>
                <CurrencyInput data={this.props.to} onValueSet={this.onValueSet} onSelectCoin={(token) => this.onSelectCoin(token, 1)}></CurrencyInput>
                <FeeTier></FeeTier>
                {this.props.address ? <SupplyBtn></SupplyBtn> : <ConnectWalletBtn></ConnectWalletBtn>}
            </div>
        )
    }
}


const mapStateToProps = function (state: { pool: PoolState, wallet: WalletState }) {
    return {
        from: state.pool.from,
        to: state.pool.to,
        origin: state.pool.origin,       
        address: state.wallet.address
    }
}

export default connect(mapStateToProps)(AddPool);

