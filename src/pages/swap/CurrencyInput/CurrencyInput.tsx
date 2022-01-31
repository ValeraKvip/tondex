import './currency-input.scss';
import CoinData from '../../../models/CoinData';
import { checkInputIsFloat } from '../../../utils';
import React from 'react';
import TokenSelect from '../../../components/tokens/TokenSelects';
import Token from '../../../models/Token';
import WalletController from '../../../controllers/WalletController';
import store from '../../../store/store';
import { WalletState } from '../../../store/WalletReducer';
import { connect } from 'react-redux';

interface Props {
    data: CoinData,
    onValueSet: (value: string, token: Token) => any,
    onSelectCoin: (token: Token) => void,
    wallet:WalletState
}

interface State {
    showSelectToken: boolean,
    balance: number
}

export  class CurrencyInput extends React.Component<Props, State>
{
    constructor(props: any) {
        super(props);

        this.state = {
            showSelectToken: false,
            balance: -1
        }

        this.onValueSet = this.onValueSet.bind(this);
    }

    async componentDidUpdate(prevProps: Props, prevState: State) {
        this.updateBalance(prevState);

    }

    componentDidMount(){
        this.updateBalance();
    }

    async updateBalance(prevState?: State) {
        const balance = await WalletController.instance().getBalance(this.props.data.token.id)        
        if (prevState?.balance !== balance) {
            this.setState({
                balance
            })
        }
    }

    onValueSet(evt: React.ChangeEvent<HTMLInputElement>) {
        if (!checkInputIsFloat(evt.target.value)) {
            return;
        }

        this.props.onValueSet((evt.target.value) as any, this.props.data.token);
    }

    shortPrice(price: any, fixed: number = 6) {
        const num = Number.parseFloat(price);
        if (isNaN(num) || String(price).match(/^[0-9]+.[0]*$/)) {// || String(price).match(/\d[.]0*$/)
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
                        <input className='in-crypto' type="text" value={this.shortPrice(this.props.data.value)} onInput={this.onValueSet} placeholder='0' />
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
                        {this.shortPrice(this.props.data.price * Number(this.props.data.value), 3)}$ (1 {this.props.data.token.symbol} ~ {this.shortPrice(this.props.data.price, 2)}$)
                    </div>
                    <span >{this.props.wallet.address ? `Balance: ${this.state.balance}` : ''}</span>

                </div>
                {showModal}
            </div>
        )
    }
}

const mapStateToProps = function (state: {wallet: WalletState }) {
    return {      
        wallet: state.wallet
    }
}

export default connect(mapStateToProps)(CurrencyInput);