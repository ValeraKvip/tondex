import './trade-deadline.scss';
import React, { ReactNode } from 'react';
import { checkInputIsInt } from '../../../utils';

export default class TradeDeadline extends React.Component<any, {
    deadlineInput: string
}> {

    constructor(props: any) {
        super(props);
        this.state = {
            deadlineInput: '30'
        }

        this.onInput = this.onInput.bind(this);
    }

    onInput(evt: React.MouseEvent<HTMLInputElement>) {
        
        if (!checkInputIsInt( evt.currentTarget.value)) {
            evt.currentTarget.value = this.state.deadlineInput;
            return;
        }

        const str =  evt.currentTarget.value;
        evt.currentTarget.style.width = ((str.length ? str.length : 1) * 11 ) + "px";
        
        this.setState({
            deadlineInput: str
        })
    }


    onBlur(evt: React.FocusEvent<HTMLInputElement>) {
        var str = String(this.state.deadlineInput);

        if (!this.state.deadlineInput) {
            this.setState({
                deadlineInput: '30'
            })
            str = '30';
        }

        if (Number(this.state.deadlineInput) > 4300) {
            this.setState({
                deadlineInput: '4300'
            })
            str = '4300';
        }

        evt.target.style.width = ((str.length ? str.length : 1) * 11 ) + "px";
    }

    render(): ReactNode {
        return (
            <div className='trade-deadline'>
                <span>
                    Trade deadline
                </span>
                <div className='deadline'>
                    <input type="text" className='input' value={this.state.deadlineInput} onInput={this.onInput} onBlur={this.onBlur.bind(this)} />mins
                </div>
            </div>
        )
    }
}