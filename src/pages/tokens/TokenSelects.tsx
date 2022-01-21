import React from "react";
import './token-select.scss';
import Token from '../../models/Token';
import axios from "axios";
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import ReactDOM from "react-dom";
import Spinner from "../../components/spinner/Spinner";

export default class TokenSelect extends React.Component<{ onClose: () => void, onSelect: (token: Token) => void }, { tokens: Token[], search: string, isLoading: boolean }>{

    constructor(props: any) {
        super(props);

        this.state = {
            tokens: [] as Token[],
            search: '',
            isLoading: true
        }

        this.onSearchInput = this.onSearchInput.bind(this);
        this.loadTokens = this.loadTokens.bind(this);
    }

    componentDidMount() {
          this.loadTokens();
    }

    async loadTokens() {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
       
        if (res) {
            const tokens = this.state.tokens;
            tokens.push(...res.data);
            this.setState({
                tokens,
                isLoading: false
            });
        }        
    }

    async onSearchInput(evt: any) {
        this.setState({
            search: evt.target.value
        })
    }

    getFilteredCryptos() {
        var tokens;
        if (this.state.search) {
            const search = this.state.search.trim().toLowerCase();
            tokens = this.state.tokens.filter(token => token.name.toLowerCase().includes(search) || token.symbol.toLowerCase().includes(search))
        } else {
            tokens = this.state.tokens;
        }


        if (this.state.isLoading) {
            return (
                <li className="token-item" >
                    <Spinner></Spinner>
                </li>
               
            )
        }
        else if ((!tokens || !tokens.length)) {
            return (
                <span className="token-item-empty">No results found.</span>
            )
        }




        return (
            tokens.map(token => {
                return (
                    <li key={token.id} className="token-item" onClick={() => { this.props.onSelect(token); this.props.onClose() }}>
                        <img src={token.image} />
                        <div className="token-item-desc">
                            <div className="token-item-symbol">{token.symbol}</div>
                            <div className="token-item-name">{token.name}</div>
                        </div>
                    </li>)
            }))
    }

    render() {
        return ReactDOM.createPortal(
            <div className="token-select modal" onClick={this.props.onClose}>
                <div className="token-select-container" onClick={evt=>evt.stopPropagation()}>
                    <div className="token-select-header-container">
                        <div className="token-select-header">
                            <span>Select</span>
                            <CloseIcon className="close-btn" onClick={this.props.onClose}></CloseIcon>
                        </div>
                    </div>
                    <div className="token-select-search">
                        <input placeholder="Search name or paste address" type="text" value={this.state.search} onChange={this.onSearchInput} />
                    </div>
                    <ul className="token-select-list">
                        {
                            this.getFilteredCryptos()
                        }
                    </ul>
                </div>
            </div>
            , document.body!
        )
    }
}