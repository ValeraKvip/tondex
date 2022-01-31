import './remove_pool_btn.scss';
import React from "react";
import { connect } from "react-redux";
import WalletController from "../../controllers/WalletController";
import { PoolState } from '../../store/PoolReducer';
import ConfirmSupply from '../../pages/pools/confirm_supply/ConfirmSupply';
import { SavedPoolState } from '../../store/SavedPoolReducer';
import ConfirmRemove from '../../pages/pools/confirm_remove/ConfirmRemove';

interface State {

    showConfirmRemove: boolean
}

type Props = {
    pool: PoolState,
    index: number
};

export class RemovePoolBtn extends React.Component<Props, State> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            showConfirmRemove: false
        };
    }


    render() {
        var confirmRemove = null;
        if (this.state.showConfirmRemove) {
            confirmRemove = <ConfirmRemove data={this.props.pool} index={this.props.index} onClose={() => this.setState({ showConfirmRemove: false })} />
        }

        return (
            <div>
                <div className="remove-pool-btn btn btn-interact" onClick={()=>this.setState({showConfirmRemove:true})}>Remove</div >
                {confirmRemove}
            </div>
        )
    }
}

