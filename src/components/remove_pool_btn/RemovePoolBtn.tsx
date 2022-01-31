import './remove_pool_btn.scss';
import React from "react";
import { PoolState } from '../../store/PoolReducer';
import ConfirmRemove from '../../pages/pools/confirm_remove/ConfirmRemove';
import { withTranslation } from 'react-i18next';

interface State {

    showConfirmRemove: boolean
}

type Props = {
    pool: PoolState,
    index: number
};

 class RemovePoolBtn extends React.Component<Props, State> {

    constructor(prop: any) {
        super(prop);
        this.state = {
            showConfirmRemove: false
        };
    }


    render() {
        const { t } = this.props as any;

        var confirmRemove = null;
        if (this.state.showConfirmRemove) {
            confirmRemove = <ConfirmRemove data={this.props.pool} index={this.props.index} onClose={() => this.setState({ showConfirmRemove: false })} />
        }

        return (
            <div>
                <div className="remove-pool-btn btn btn-interact" onClick={()=>this.setState({showConfirmRemove:true})}>{t('pool.remove')}</div >
                {confirmRemove}
            </div>
        )
    }
}


export default withTranslation()(RemovePoolBtn);
