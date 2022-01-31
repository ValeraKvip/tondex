import axios from 'axios';
import React from 'react';
import CurrencyImage from './CurrencyImage';
import './pool-list.scss';
import { bigNumberFormat } from '../../../utils';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

 class PoolList extends React.Component<any, { data: any }> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: {}
        }
    }

    async componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const response = await axios.get('https://api.pancakeswap.info/api/v2/pairs');
        console.log('PoolList', response);
        if (response?.data?.data) {
            this.setState({
                data: response.data.data
            })
        }
    }

    handleOnClick(id:string,data:any){
     
        console.log('#NAV',this.props.navigate)
       this.props.navigate(`${id}`);
    }

    render(): React.ReactNode {

        var rows = [] as any;
        var index = 1;
        for (const prop in this.state.data) {

            const ids = prop.split('_');
            rows.push(
                <tr className='pool-list-item' key={prop} onClick={()=>this.handleOnClick(prop,this.state.data[index])}>
                    
                    <td>{index++}</td>
                    <td className='pool-list-item-img'>
                        <CurrencyImage src={ids[0]} />
                        <CurrencyImage src={ids[1]} />

                        <span>
                            {this.state.data[prop]['base_symbol']}/{this.state.data[prop]['quote_symbol']}
                        </span>
                    </td>
                    <td>
                        ${bigNumberFormat(parseFloat(this.state.data[prop]['quote_volume']) + parseFloat(this.state.data[prop]['base_volume']), 3)}
                    </td>
                    <td>
                        ${bigNumberFormat(parseFloat(this.state.data[prop]['liquidity']), 3)}
                    </td>
                   
                </tr>);
        }

        return (
            <div className='pool-list'>
                <table >
                    <thead>
                        <tr className='table-header'>
                            <td>#</td>
                            <td>Pool</td>
                            <td>Volume 24</td>
                            <td>LIQUIDITY</td>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>

                </table>
            </div>
        )
    }
}


function PoolListWithNavigate(props:any) {
    let navigate = useNavigate();
    return <PoolList {...props} navigate={navigate} />
}

export default PoolListWithNavigate