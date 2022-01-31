import './trade-deadline.scss';
import React, { ReactNode } from 'react';
import { checkInputIsInt } from '../../../utils';
import { SwapState, updateSwap } from '../../../store/SwapReducer';
import { connect } from 'react-redux';
import store from '../../../store/store';

export class TradeDeadline extends React.Component<Pick<SwapState,'tradeDeadline'>,any> {

    constructor(props: any) {
        super(props);
        this.onInput = this.onInput.bind(this);
    }

    onInput(evt: React.ChangeEvent<HTMLInputElement>) {

        if (!checkInputIsInt(evt.target.value)) {
            evt.target.value = this.props.tradeDeadline;
            return;
        }

        const str = evt.target.value;
        evt.target.style.width = ((str.length ? str.length : 1) * 11) + "px";

        store.dispatch(updateSwap({ tradeDeadline: str }));
    }


    onBlur(evt: React.FocusEvent<HTMLInputElement>) {
        var str = String(this.props.tradeDeadline);

        if (!this.props.tradeDeadline) {
            str = '30';
            store.dispatch(updateSwap({ tradeDeadline: str }));
        }

        if (Number(this.props.tradeDeadline) > 4300) {
            str = '4300';
            store.dispatch(updateSwap({ tradeDeadline: str }));
        }

        evt.target.style.width = ((str.length ? str.length : 1) * 11) + "px";
    }

    render(): ReactNode {
        return (
            <div className='trade-deadline'>
                <span>
                    Trade deadline
                </span>
                <div className='deadline tooltip'>
                    <input type="text" className='input' value={this.props.tradeDeadline} onInput={this.onInput} onBlur={this.onBlur.bind(this)} />mins
                    <span className="tooltiptext">Click to edit</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state: { swap: SwapState }) {
    return {
        tradeDeadline: state.swap.tradeDeadline
    }
}

export default connect(mapStateToProps)(TradeDeadline);
