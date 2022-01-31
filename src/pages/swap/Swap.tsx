import React from 'react';
import { connect } from 'react-redux';
import ChartView from '../../components/chart/ChartView';
import SwapBtn from '../../components/swap-btn/SwapBtn';
import ConnectWalletBtn from '../../components/wallet/ConnectWalletBtn';
import CoinData from '../../models/CoinData';
import { SwapState } from '../../store/SwapReducer';
import { WalletState } from '../../store/WalletReducer';
import { formatPrice } from '../../utils';
import InputContainer from './CurrencyInput/InputContainer';
import SettingBtn from './settings/SettingsBtn';
import SlippageTolerance from './slippage_tolerance/SlippageTolerance';
import './swap.scss';
import TradeDeadline from './trade-deadline/TradDeadline';
import { withTranslation } from 'react-i18next';


export class Swap extends React.Component<{
    from: CoinData,
    to: CoinData,
    wallet: WalletState
}, any> {

    constructor(props: any) {
        super(props);

    }

    render() {
        const {t} = this.props as any;
        return (
            <div id="swap-page">
                <ChartView from={this.props.from} to={this.props.to}></ChartView>
                <div className="swap-container">
                    <div className='swap-container-header'>
                        <h3>{t('swap.swap')}</h3>
                        <SettingBtn></SettingBtn>
                    </div>

                    <InputContainer></InputContainer>
                    <p className='price-per-one'> 1 {this.props.from.token.symbol} = {formatPrice(this.props.from.price / this.props.to.price)} {this.props.to.token.symbol}</p>
                    <SlippageTolerance></SlippageTolerance>
                    <TradeDeadline></TradeDeadline>
                    {this.props.wallet.address ? <SwapBtn></SwapBtn> : <ConnectWalletBtn></ConnectWalletBtn>}

                </div>
            </div>
        )
    }
}


const mapStateToProps = function (state: { swap: SwapState, wallet: WalletState }) {
    return {
        from: state.swap.from,
        to: state.swap.to,
        wallet: state.wallet
    }
}

export default connect(mapStateToProps)(withTranslation()(Swap));