import React from 'react';
import { connect } from 'react-redux';
import { PoolState, updatePool } from '../../../../store/PoolReducer';
import './fee-tier.scss';
import { withTranslation } from 'react-i18next';

export class FeeTier extends React.Component<Pick<PoolState, 'tier'>, any>{



    render(): React.ReactNode {
        const { t } = this.props as any;
        const data: [{ percent: number, hint: string }] = [
            {
                percent: 0.01,
                hint: t('pool.add.best_for_very')
            },
            {
                percent: 0.05,
                hint: t('pool.add.best_for_stable')
            },
            {
                percent: 0.3,
                hint: t('pool.add.best_for_most')
            },
            {
                percent: 1,
                hint: t('pool.add.best_for_exotic')
            },
        ] as any

        return (
            <div className='fee-tiers'>
                {
                    data.map(d => {
                        return (
                            <a className={`${this.props.tier == d.percent ? 'active' : ''} btn-interact fee-tier`} key={d.percent} onClick={() => updatePool({ tier: d.percent })}>
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

export default withTranslation()(connect(mapStateToProps)(FeeTier));