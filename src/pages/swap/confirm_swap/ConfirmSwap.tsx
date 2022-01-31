import React from 'react';
import './confirm-swap.scss';
import { ReactComponent as ArrowDown } from '../../../icons/down_arrow_icon.svg';
import { ReactComponent as CloseIcon } from '../../../icons/close.svg';
import SwapItem from './swap_item/SwapItem';
import { connect } from 'react-redux';
import { SwapState, updateSwap } from '../../../store/SwapReducer';
import ReactDOM from 'react-dom';
import LottieView from '../../../components/lottie/LottieView';
import store from '../../../store/store';

interface Props extends SwapState {
    onClose: () => void,
}

export class ConfirmSwap extends React.Component<Props, { done: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            done: false
        }
    }

    getMinimumReceived() {
        const val = parseFloat(String(this.props.from.value));
        const min = val - (val / 100) * parseFloat(this.props.slippageTolerance);
        return (this.props.from.price / this.props.to.price) * min;
    }

    onClick() {
        if (this.state.done) {
            return this.props.onClose()
        }

        
        const from = { ...this.props.from };
        from.value = '';

        const to = { ...this.props.to };
        to.value = '';
     store.dispatch(updateSwap({
            from, to,
            slippageTolerance: '2',
            tradeDeadline: '30'
        }));
        this.setState({ done: true });
    }

    render() {
        return ReactDOM.createPortal(
            <div className="confirm-swap modal" onClick={this.props.onClose}>
                <div className="confirm-swap-container" onClick={evt => evt.stopPropagation()}>
                    <div className="confirm-swap-header-container">
                        <div className="confirm-swap-header">
                            <span>  {this.state.done ? 'Successfully Swapped' : 'Confirm Swap'}</span>
                            <CloseIcon className="close-btn" onClick={this.props.onClose}></CloseIcon>
                        </div>
                    </div>
                    {this.state.done ? '' :
                        <div className='swap-confirm-content'>
                            <SwapItem data={this.props.from}></SwapItem>
                            <ArrowDown className='arrow-down'></ArrowDown>
                            <SwapItem data={this.props.to}></SwapItem>

                            <p className='swap-confirm-note'>
                                Output is estimated. You will receive at least {this.getMinimumReceived()} {this.props.to.token.symbol} or the transaction will revert
                            </p>

                            <div className='swap-confirm-info'>
                                <div className='flex-space-between'>
                                    <span>Price:</span>
                                    <span>{Number((this.props.from.price / this.props.to.price).toFixed(6))}  {this.props.from.token.symbol}/{this.props.to.token.symbol} </span>
                                </div>
                                <div className='flex-space-between'>
                                    <span>Minimum received:</span>
                                    <span>{this.getMinimumReceived()}</span>
                                </div>
                                <div className='flex-space-between'>
                                    <span>Slippage Tolerance:</span>
                                    <span>{this.props.slippageTolerance}%</span>
                                </div>
                                <div className='flex-space-between'>
                                    <span>Trade deadline:</span>
                                    <span>{this.props.tradeDeadline} mins</span>
                                </div>
                                <div className='flex-space-between'>
                                    <span>Liquidity provider fee:</span>
                                    <span>0.01 {this.props.from.token.symbol}</span>
                                </div>
                            </div>

                        </div>
                    }
                    <LottieView enable={this.state.done} path='assets/anims/anim_yeah.json'></LottieView>
                    <a className='btn confirm-btn btn-interact' onClick={this.onClick.bind(this)}>
                        {this.state.done ? 'Exit' : 'Confirm'}
                    </a>
                </div>
            </div>
            , document.body
        )
    }
}


const mapStateToProps = function (state: { swap: SwapState }) {
    return state.swap
}

export default connect(mapStateToProps)(ConfirmSwap);
