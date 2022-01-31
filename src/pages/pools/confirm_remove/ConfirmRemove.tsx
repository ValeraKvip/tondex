import './confirm-remove.scss';
import React from 'react';
import { ReactComponent as CloseIcon } from '../../../icons/close.svg';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import LottieView from '../../../components/lottie/LottieView';
import { PoolState } from '../../../store/PoolReducer';
import PoolController from '../../../controllers/PoolController';
import { SavedPoolState } from '../../../store/SavedPoolReducer';

interface Props {
    onClose: () => void,
    data: PoolState,
    index: number
}

export default class ConfirmRemove extends React.Component<Props, { done: boolean }> {

    constructor(props: any) {
        super(props);

        this.state = {
            done: false
        }
    }

    async remove() {
        if (this.state.done) {
            return this.props.onClose();
        }

        await PoolController.instance().removePool(this.props.index);
        this.setState({ done: true })
    }

    render() {
        return ReactDOM.createPortal(
            <div className="confirm-supply modal" onClick={this.props.onClose}>
                <div className="confirm-supply-container" onClick={evt => evt.stopPropagation()}>
                    <div className="confirm-supply-header-container">
                        <div className="confirm-supply-header">
                            <span>  {this.state.done ? 'Successfully Removed' : 'Confirm Remove'}</span>
                            <CloseIcon className="close-btn" onClick={this.props.onClose}></CloseIcon>
                        </div>
                    </div>
                    {this.state.done ? '' :
                        <div className='supply-confirm-content'>


                            <div className='supply-confirm-info'>
                                <div className='flex-space-between'>
                                    <span> <b>{this.props.data.from.token.symbol}</b> You will receive:</span>
                                    <span>{Number(parseFloat(String(this.props.data.from.value)).toFixed(6))}({Number((this.props.data.from.price).toFixed(6))}$)</span>
                                </div>
                                <div className='flex-space-between'>
                                    <span><b> {this.props.data.to.token.symbol}</b> You will receive:</span>
                                    <span>{Number(parseFloat(String(this.props.data.to.value)).toFixed(6))}({Number((this.props.data.to.price).toFixed(6))}$)</span>
                                </div>
                               

                            </div>
                        </div>
                    }
                    <LottieView enable={this.state.done} path='assets/anims/anim_dive.json' ></LottieView>
                    <a className='btn remove-btn btn-interact' onClick={this.remove.bind(this)}>
                        {this.state.done ? 'Exit' : 'Remove'}
                    </a>
                </div>
            </div>
            , document.body
        )
    }
}

