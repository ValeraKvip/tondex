import React from 'react';
import './confirm-supply.scss';
import { ReactComponent as CloseIcon } from '../../../icons/close.svg';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import LottieView from '../../../components/lottie/LottieView';
import { PoolState } from '../../../store/PoolReducer';
import PoolController from '../../../controllers/PoolController';
import { withTranslation } from 'react-i18next';

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
        const { t } = this.props as any;

        return ReactDOM.createPortal(
            <div className="confirm-supply modal" onClick={this.props.onClose}>
                <div className="confirm-supply-container" onClick={evt => evt.stopPropagation()}>
                    <div className="confirm-supply-header-container">
                        <div className="confirm-supply-header">
                            <span>  {this.state.done ? t('pool.confirm.successfully_supplied') : t('pool.confirm.confirm_supply')}</span>
                            <CloseIcon className="close-btn" onClick={this.props.onClose}></CloseIcon>
                        </div>
                    </div>
                    {this.state.done ? '' :
                        <div className='supply-confirm-content'>


                            <p className='supply-confirm-note'>
                                {t('pool.confirm.info')}
                            </p>

                            <div className='supply-confirm-info'>
                                <div className='flex-space-between'>
                                    <span><b> {this.props.from.token.symbol}</b> {t('pool.confirm.deposit')}:</span>
                                    <span>{Number(parseFloat(String(this.props.from.value)).toFixed(6))}({Number((this.props.from.price).toFixed(6))}$)</span>
                                </div>
                                <div className='flex-space-between'>
                                    <span><b>{this.props.to.token.symbol} </b> {t('pool.confirm.deposit')}:</span>
                                    <span>{Number(parseFloat(String(this.props.to.value)).toFixed(6))}({Number((this.props.to.price).toFixed(6))}$)</span>
                                </div>
                                <div className='flex-space-between'>
                                    <span>{t('pool.confirm.tier_fee')}:</span>
                                    <span>{this.props.tier}%</span>
                                </div>
                                <div className='flex-space-between'>
                                    <span>{t('pool.confirm.share_of_pool')}:</span>
                                    <span>1% </span>
                                </div>

                            </div>
                        </div>
                    }
                    <LottieView enable={this.state.done} path='assets/anims/anim_dive.json' ></LottieView>
                    <a className='btn confirm-btn btn-interact' onClick={this.confirm.bind(this)}>
                        {this.state.done ? t('swap.confirm.exit') : t('swap.confirm.confirm')}
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

export default withTranslation()(connect(mapStateToProps)(ConfirmSupply));
