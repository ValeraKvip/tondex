import React from "react";
import './token-select.scss';
import Token from '../../models/Token';
import axios from "axios";
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import ReactDOM from "react-dom";
import Spinner from "../spinner/Spinner";

const MOST_USED_TOKENS = "MOST_USED_TOKENS";


export default class TokenSelect extends React.Component<{ onClose: () => void, onSelect: (token: Token) => void },
    {
        mostUsedTokens: Token[]
        tokens: Token[],
        search: string,
        isLoading: boolean
    }>{

    constructor(props: any) {
        super(props);

        this.state = {
            mostUsedTokens: this.getMostUsedTokens(),
            tokens: [] as Token[],
            search: '',
            isLoading: true
        }

        this.onSearchInput = this.onSearchInput.bind(this);
        this.loadTokens = this.loadTokens.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidMount() {
        this.loadTokens();
    }

    async loadTokens() {
        //  const res =  await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
        const res = await axios.get('assets/tokens.json');

        if (res) {
            console.log('res.data', res.data);

            const tokens = this.state.tokens;
            // const tokens = await import('../../assets/tokens');
            //   console.log('token',tokens)
            // if (tokens?.length === 0) {
            //     tokens.push({
            //         "id": "toncoin",
            //         "symbol": "ton",
            //         "name": "Toncoin",
            //         "image": "assets/icons/ton.svg"
            //     });
            // }
            tokens.push(...res.data);
            this.setState({
                tokens: tokens as any,
                isLoading: false
            });
        }
    }

    async onSearchInput(evt: any) {
        this.setState({
            search: evt.target.value
        })
    }

    getMostUsedTokens(): Token[] {
        const mostUsed = window.localStorage.getItem(MOST_USED_TOKENS);
        console.log('mostUsed', mostUsed)
        return mostUsed ? JSON.parse(mostUsed) : [];
    }

    onSelect(token: Token) {
        console.log('onSelect', token)
        const mostUsed = this.getMostUsedTokens();

        if (!mostUsed.some(s => s.id === token.id)) {
            if (mostUsed.length >= 5) {
                mostUsed.splice(0, 1);
            }

            mostUsed.push(token);
            console.log('onSelect', 'add')
            window.localStorage.setItem(MOST_USED_TOKENS, JSON.stringify(mostUsed));
        }

        this.props.onSelect(token);
        this.props.onClose()
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
                    <li key={token.id} className="token-item" onClick={() => this.onSelect(token)}>
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
                <div className="token-select-container" onClick={evt => evt.stopPropagation()}>
                    <div className="token-select-header-container">
                        <div className="token-select-header">
                            <span>Select</span>
                            <CloseIcon className="close-btn" onClick={this.props.onClose}></CloseIcon>
                        </div>
                    </div>
                    <div className="token-select-search">
                        <input placeholder="Search name or paste address" type="text" value={this.state.search} onChange={this.onSearchInput} />
                    </div>
                    <div className="token-most-used-container">
                        {
                            this.state.mostUsedTokens.map(token => {
                                return (

                                    <div key={token.id} className="most-used-item" onClick={() => this.onSelect(token)}>
                                        <img src={token.image} />
                                        <div>{token.symbol}</div>
                                    </div>)
                            })
                        }

                    </div>
                    <ul className="token-select-list">
                        {
                            this.getFilteredCryptos()
                        }
                    </ul>
                </div>
            </div>
            , document.body
        )
    }
}