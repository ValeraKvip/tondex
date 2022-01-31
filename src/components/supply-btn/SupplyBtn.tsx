import './supply-btn.scss';
import React from "react";
import { connect } from "react-redux";
import WalletController from "../../controllers/WalletController";
import { PoolState } from '../../store/PoolReducer';
import ConfirmSupply from '../../pages/pools/confirm_supply/ConfirmSupply';

interface State {
    balanceFrom: number,
    balanceTo: number,
    showConfirmSupply: boolean
}

type Props = Pick<PoolState, 'to' | 'from'>;

export class SupplyBtn extends React.Component<Props, State> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            balanceFrom: 0,
            balanceTo: 0,
            showConfirmSupply: false
        };
    }


    async componentDidUpdate(prevProps: Props, prevState: State) {

        const [balanceFrom, balanceTo] = await Promise.all([
            WalletController.instance().getBalance(this.props.from.token.id),
            WalletController.instance().getBalance(this.props.to.token.id)
        ])


        if (prevState.balanceFrom !== balanceFrom || prevState.balanceTo !== balanceTo) {
            this.setState({
                balanceFrom,
                balanceTo
            })
        }
    }

    render() {
        var confirmSupply = null;
        if (this.state.showConfirmSupply) {
            confirmSupply = <ConfirmSupply onClose={() => this.setState({ showConfirmSupply: false })} />
        }

        var btn = (this.state.balanceFrom >= this.props.from.value && this.props.from.value != 0)
            && (this.state.balanceTo >= this.props.to.value && this.props.to.value != 0)
            ? <div className="supply-btn btn-interact" onClick={() => this.setState({ showConfirmSupply: true })}>Supply</div >
            : <div className="supply-btn-disabled btn-interact">Insufficient  balance</div >

        if (!this.props.from.value) {
            btn = <div className="supply-btn-disabled btn-interact">Enter an amount</div >
        }
        return (
            <div>
                {btn}
                {confirmSupply}
            </div>
        )
    }
}

const mapStateToProps = function (state: { pool: PoolState }) {
    return {
        from: state.pool.from,
        to: state.pool.to,
    }
}

export default connect(mapStateToProps)(SupplyBtn);