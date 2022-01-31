import React from "react";
import { connect } from "react-redux";
import WalletController from "../../controllers/WalletController";
import CoinData from "../../models/CoinData";
import  ConfirmSwap  from "../../pages/swap/confirm_swap/ConfirmSwap";
import { SwapState } from "../../store/SwapReducer";
import './swap-btn.scss';

interface Props {
    to: CoinData,
    from: CoinData,
}

interface State {
    balance: number,
    showConfirmSwap: boolean
}

export class SwapBtn extends React.Component<Props, State> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            balance: 0,
            showConfirmSwap: false
        };
    }


    async componentDidUpdate(prevProps: Props, prevState: State) {

        const balance = await WalletController.instance().getBalance(this.props.from.token.id)

        if (prevState.balance !== balance) {
            this.setState({
                balance
            })
        }
    }

    render() {
        var confirmSwap = null;
        if (this.state.showConfirmSwap) {
            confirmSwap = <ConfirmSwap onClose={() => this.setState({ showConfirmSwap: false })} ></ConfirmSwap>
        }

        var btn = this.state.balance >= this.props.from.value && this.props.from.value != 0
            ? <div className="swap-btn btn-interact" onClick={() => this.setState({ showConfirmSwap: true })}>Swap</div >
            : <div className="swap-btn-disabled btn-interact">Insufficient  balance</div >

        if (!this.props.from.value) {
            btn = <div className="swap-btn-disabled btn-interact">Enter an amount</div >
        }
        return (
            <div>
                {btn}
                {confirmSwap}
            </div>
        )
    }
}

const mapStateToProps = function (state: { swap: SwapState }) {
    return {
        from: state.swap.from,
        to: state.swap.to,

    }
}

export default connect(mapStateToProps)(SwapBtn);