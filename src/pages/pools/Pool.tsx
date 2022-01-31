import React from 'react';
import AddPool from './add_pool/AddPool';
import './pool.scss';
import PoolListWithNavigate from './pools_list/PoolList';
import SavedPools from './saved_pools/SavedPools';
import { ReactComponent as ArrowBack } from '../../icons/down_arrow_icon.svg';
import { withTranslation } from 'react-i18next';


const ADD_POOL = 'add-pool';
const POOL_LIST = 'pool-list';


 class Pool extends React.Component<any, { component: string }> {

    constructor(props: any) {
        super(props);

        this.state = {
            component: POOL_LIST
        }
    }
    render(): React.ReactNode {
        const { t } = this.props;

        return (
            <div id='page-pool'>

                <SavedPools></SavedPools>


                <div className='pool-container'>
                    <div className='pool-container-header'>
                        {this.state.component === ADD_POOL ? <ArrowBack className='arrow-back' onClick={() => this.setState({ component: POOL_LIST })}></ArrowBack> : ''}
                        <h3> {this.state.component == ADD_POOL ? t('pool.add_liquidity') : t('pool.pool_overview')} </h3>
                        {this.state.component === POOL_LIST ? <a className='btn btn-interact' onClick={() => this.setState({ component: ADD_POOL })}>+ {t('pool.add_liquidity')} </a> : ''}

                    </div>

                    <div className='pool-container-content'>
                        {this.state.component == ADD_POOL ? <AddPool></AddPool> :
                            <div>
                                <PoolListWithNavigate></PoolListWithNavigate>
                            </div>}

                    </div>
                </div>
            </div >
        )
    }
}


export default withTranslation()(Pool)