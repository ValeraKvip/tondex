import React from 'react';
import './confirm-supply.scss';
import { ReactComponent as CloseIcon } from '../../../icons/close.svg';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import LottieView from '../../../components/lottie/LottieView';
import { PoolState } from '../../../store/PoolReducer';
import PoolController from '../../../controllers/PoolController';

interface Props extends PoolState {
    onClose: () => void,
}

export class ConfirmSupply extends React.Component<Props, { done: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            done: false
        }
    }

    async confirm() {
        if (this.state.done) {
            return this.props.onClose();
        }

        await PoolController.instance().createPool(this.props);
        this.setState({ done: true })
    }

    render() {
        return ReactDOM.createPortal(
            <div className="confirm-supply modal" onClick={this.props.onClose}>
                <div className="confirm-supply-container" onClick={evt => evt.stopPropagation()}>
                    <div className="confirm-supply-header-container">
                        <div className="confirm-supply-header">
                            <span>  {this.state.done ? 'Successfully Supplied' : 'Confirm Supply'}</span>
                            <CloseIcon className="close-btn" onClick={this.props.onClose}></CloseIcon>
                        </div>
                    </div>
                    {this.state.done ? '' :
                        <div className='supply-confirm-content'>


                            <p className='supply-confirm-note'>
                                If the price changes by more than 1% your transaction will revert.
                            </p>

                            <div className='supply-confirm-info'>
                                <div className='flex-space-between'>
                                    <span> {this.props.from.token.symbol} Deposit:</span>
                                    <span>{Number(parseFloat(String(this.props.from.value)).toFixed(6))}({Number((this.props.from.price).toFixed(6))}$)</span>
                                </div>
                                <div className='flex-space-between'>
                                    <span> {this.props.to.token.symbol} Deposit:</span>
                                    <span>{Number(parseFloat(String(this.props.to.value)).toFixed(6))}({Number((this.props.to.price).toFixed(6))}$)</span>
                                </div>
                                <div className='flex-space-between'>
                                    <span>Tier fee:</span>
                                    <span>{this.props.tier}%</span>
                                </div>
                                <div className='flex-space-between'>
                                    <span> Share of Pool:</span>
                                    <span>1% </span>
                                </div>

                            </div>
                        </div>
                    }
                    <LottieView enable={this.state.done} path='assets/anims/anim_dive.json' ></LottieView>
                    <a className='btn confirm-btn btn-interact' onClick={this.confirm.bind(this)}>
                        {this.state.done ? 'Exit' : 'Confirm'}
                    </a>
                </div>
            </div>
            , document.body
        )
    }
}


const mapStateToProps = function (state: { pool: PoolState }) {
    return state.pool
}

export default connect(mapStateToProps)(ConfirmSupply);
