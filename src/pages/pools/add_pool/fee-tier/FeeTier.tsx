import React from 'react';
import { connect } from 'react-redux';
import { PoolState, updatePool } from '../../../../store/PoolReducer';
import './fee-tier.scss';

export class FeeTier extends React.Component<Pick<PoolState, 'tier'>, any>{
    data: [{ percent: number, hint: string }] = [
        {
            percent: 0.01,
            hint: 'Best for very stable pairs.'
        },
        {
            percent: 0.05,
            hint: 'Best for stable pairs.'
        },
        {
            percent: 0.3,
            hint: 'Best for most pairs.'
        },
        {
            percent: 1,
            hint: 'Best for exotic pairs.'
        },
    ] as any

    render(): React.ReactNode {

        return (
            <div className='fee-tiers'>
                {
                    this.data.map(d => {
                        return (
                            <a className={`${this.props.tier == d.percent ? 'active':''} btn-interact fee-tier`} key={d.percent} onClick={() => updatePool({ tier: d.percent })}>
                                <div className='fee-tier-percent'>{d.percent}%</div>
                                <div>{d.hint}</div>
                            </a>
                        )
                    })}
            </div>
        )
    }
}

const mapStateToProps = function (state: { pool: PoolState }) {
    return {
        tier: state.pool.tier,
    }
}

export default connect(mapStateToProps)(FeeTier);