import React from 'react';
import { ReactNode } from 'react';
import { checkInputIsFloat } from '../../../utils';
import './slippage-tolerance.scss';

export default class SlippageTolerance extends React.Component<any, {
    percentInput: string
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            percentInput: '2'
        }

        this.onInput = this.onInput.bind(this);
    }

    onInput(evt: React.MouseEvent<HTMLInputElement>) {
        if (!checkInputIsFloat(evt.currentTarget.value)) {
            evt.currentTarget.value = String(this.state.percentInput);
            return;
        }

        var newValue = evt.currentTarget.value ? parseFloat(evt.currentTarget.value) : '';    
        const str = newValue > 10 ? '10' :  evt.currentTarget.value;
        evt.currentTarget.style.width = ((str.length ? str.length : 1) * 10) + "px";

        this.setState({
            percentInput: str
        })
    }

    onBlur(evt: React.FocusEvent<HTMLInputElement>) {
        if (!this.state.percentInput) {
            this.setState({
                percentInput: '0'
            })
        }

        const str = String(this.state.percentInput);

        if (str?.length && str[str.length - 1] === '.') {

            evt.currentTarget.style.width = ((str.length - 1) * 10) + "px"
            this.setState({
                percentInput: str.substring(0, str.length - 1)
            })
        }
    }

    render(): ReactNode {
        return (
            <div className='slippage-tolerance'>
                <span>
                    Slippage Tolerance
                </span>
                <div className='percentage'>
                    <input type="text" className='input' value={this.state.percentInput} onInput={this.onInput} onBlur={this.onBlur.bind(this)} />%
                </div>
            </div>
        )
    }
}