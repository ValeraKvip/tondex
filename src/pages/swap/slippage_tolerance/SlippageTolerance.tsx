import React from 'react';
import { ReactNode } from 'react';
import { connect } from 'react-redux';
import store from '../../../store/store';
import { SwapState, updateSwap } from '../../../store/SwapReducer';
import { checkInputIsFloat } from '../../../utils';
import './slippage-tolerance.scss';

export class SlippageTolerance extends React.Component<Pick<SwapState,'slippageTolerance'>, any> {

    constructor(props: any) {
        super(props);
        // this.state = {
        //     percentInput: '2'
        // }

        this.onInput = this.onInput.bind(this);
    }

    onInput(evt: React.ChangeEvent<HTMLInputElement>) {
        if (!checkInputIsFloat(evt.target.value)) {
            evt.target.value = String(this.props.slippageTolerance);
            return;
        }

        var newValue = evt.target.value ? parseFloat(evt.target.value) : '';
        const str = newValue > 10 ? '10' : evt.target.value;
        evt.target.style.width = ((str.length ? str.length : 1) * 10) + "px";

        store.dispatch(updateSwap({ slippageTolerance: str }));
        // this.setState({
        //     percentInput: str
        // })
    }

    onBlur(evt: React.FocusEvent<HTMLInputElement>) {
        if (!this.props.slippageTolerance) {
            // this.setState({
            //     percentInput: '0'
            // })
            store.dispatch(updateSwap({ slippageTolerance: '0' }));
            // this.setState({
        }

        const str = String(this.state.percentInput);

        if (str?.length && str[str.length - 1] === '.') {

            evt.target.style.width = ((str.length - 1) * 10) + "px"
            // this.setState({
            //     percentInput: str.substring(0, str.length - 1)
            // })
            store.dispatch(updateSwap({ slippageTolerance: str.substring(0, str.length - 1) }));
            // this.setState({
        }
    }

    render(): ReactNode {
        return (
            <div className='slippage-tolerance '>
                <span>
                    Slippage Tolerance
                </span>
                <div className='percentage tooltip'>
                    <input type="text" className='input' value={this.props.slippageTolerance} onInput={this.onInput} onBlur={this.onBlur.bind(this)} />%
                    <span className="tooltiptext">Click to edit</span>
                </div>

            </div>
        )
    }
}


const mapStateToProps = function (state: { swap: SwapState }) {
    return {
        slippageTolerance: state.swap.slippageTolerance
    }
}

export default connect(mapStateToProps)(SlippageTolerance);

