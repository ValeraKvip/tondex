import React from 'react';
import { connect } from 'react-redux';
import  RemovePoolBtn  from '../../../components/remove_pool_btn/RemovePoolBtn';
import PoolController from '../../../controllers/PoolController';
import { SavedPoolState, updateSavedPool } from '../../../store/SavedPoolReducer';
import './saved-pools.scss';
import { withTranslation } from 'react-i18next';


export class SavedPools extends React.Component<SavedPoolState,any> {


    constructor(props: any) {
        super(props);

    }

    async componentDidMount() {
        const pools = await PoolController.instance().getPools();
        if (pools) {
            updateSavedPool(pools);
        }
    }




    render(): React.ReactNode {
        const { t } = this.props as any;

        if (!this.props.pools?.length) {
            return ''
        }
        return (
            <div className='pool-container pool-container-left '>
                <div className='pool-container-header'>
                    <h3>{t('pool.your_liquidity')}</h3>
                </div>
                <div className='saved-pools'>
                    {
                        this.props.pools?.map((pool, index) => {
                            return (
                                <div className='saved-pool' key={index}>
                                    <div className='icons'>
                                        <img src={pool.from.token.image} />
                                        <img src={pool.to.token.image} />
                                        <span><b>{Number(Number(pool.from.value).toFixed(3))}</b> {pool.from.token.symbol} / <b>{Number(Number(pool.to.value).toFixed(3))}</b> {pool.to.token.symbol}</span>
                                    </div>
                                    <span>{pool.tier}%</span>
                                    <div className=''>
                                        <RemovePoolBtn pool={pool} index={index}></RemovePoolBtn>
                                        {/* <div className='btn btn-interact' onClick={async () =>this.setState({showRemoveConfirm:true})}>Remove</div> */}
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>


        )
    }
}
// PoolController.instance().removePool(index)
const mapStateToProps = function (state: { savedPool: SavedPoolState }) {
    return {
        pools: state.savedPool.pools,
    }
}

export default withTranslation()(connect(mapStateToProps)(SavedPools));
