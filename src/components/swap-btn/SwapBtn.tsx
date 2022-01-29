import React from "react";
import WalletController from "../../controllers/WalletController";
import CoinData from "../../models/CoinData";
import './swap-btn.scss';

interface Props{
    to: CoinData,
    from: CoinData,
}

interface State{
    balance: number
}

export default class SwapBtn extends React.Component<Props,State> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            balance: 0
        };
    }


    async componentDidUpdate(prevProps: Props, prevState: State) {
       
        const balance = await WalletController.instance().getBalance(this.props.from.token.id)
  
        if(prevState.balance !== balance){
            this.setState({
                balance
            })
        }
    }

    render() {
        var btn = this.state.balance >= this.props.from.value && this.props.from.value != 0
            ? <div className="swap-btn">Swap</div >
            : <div className="swap-btn-disabled">Insufficient  balance</div >

            if(!this.props.from.value){
                btn = <div className="swap-btn-disabled">Enter an amount</div >
            }
        return (
            btn
        )
    }
}