import './currency-input.scss';
import CoinData from '../../../models/CoinData';
import { checkInputIsFloat, formatPrice } from '../../../utils';
import React from 'react';
import TokenSelect from '../../../components/tokens/TokenSelects';
import Token from '../../../models/Token';
import WalletController from '../../../controllers/WalletController';
import { ACCOUNT_CONNECTED } from '../../../wallets/WalletEvents';
import store from '../../../store/store';

interface Props {
    data: CoinData,
    onValueSet: (value: number, token: Token) => any,
    onSelectCoin: (token: Token) => void
}


interface State {
    showSelectToken: boolean,
    balance: number
}

export default class CurrencyInput extends React.Component<Props, State>
{

    constructor(props: any) {
        super(props);

        this.state = {
            showSelectToken: false,
            balance: -1
        }

        this.onValueSet = this.onValueSet.bind(this);
    }

    async componentDidMount() {
        // this.setState({
        //     balance: await WalletController.instance().getBalance(this.props.data.token.id)
        // });

        // WalletController.instance().on(ACCOUNT_CONNECTED, async () => {
        //     console.log('Connected');
        //     this.setState({
        //         balance: await WalletController.instance().getBalance(this.props.data.token.id)
        //     })
        // });

    }

    async componentDidUpdate(prevProps: Props, prevState: State) {
       
        const balance = await WalletController.instance().getBalance(this.props.data.token.id)
       // console.log('componentDidUpdate',prevProps ,prevState)
        if(prevState.balance !== balance){
            this.setState({
                balance
            })
        }
    }



    onValueSet(evt: React.MouseEvent<HTMLInputElement>) {      
        if (!checkInputIsFloat(evt.currentTarget.value)) {
            return;
        }

        this.props.onValueSet(Number(evt.currentTarget.value), this.props.data.token);
    }

    shortPrice(price: any, fixed: number = 6) {
        const num = Number.parseFloat(price);
        if (isNaN(num) || String(price).match(/\d[.]0*$/)) {
            return price;
        }

        return Number(num.toFixed(fixed));
    }


    render(): React.ReactNode {
        var showModal = null;
        if (this.state.showSelectToken) {
            showModal = <TokenSelect onClose={() => this.setState({ showSelectToken: false })} onSelect={this.props.onSelectCoin}></TokenSelect>
        }

        return (
            <div className='currency-input' >
                <div className='currency-input-top'>
                    <div>
                        <input className='in-crypto' type="text" value={(this.props.data.value)} onInput={this.onValueSet} placeholder='0' />
                    </div>
                    <div>
                        <a className='selected-currency' onClick={() => this.setState({ showSelectToken: true })}>
                            <img className='selected-currency-icon' src={this.props.data.token.image} />
                            <span>{this.props.data.token.symbol}</span>
                        </a>
                    </div>
                </div>
                <div className='currency-input-bottom'>
                    <div >
                        {this.shortPrice(this.props.data.price * this.props.data.value, 3)}$ (1 {this.props.data.token.symbol} ~ {this.shortPrice(this.props.data.price, 2)}$)
                    </div>
                    <span >{store.getState().wallet.address ? `Balance: ${this.state.balance}` : ''}</span>

                </div>
                {showModal}
            </div>
        )
    }
}

