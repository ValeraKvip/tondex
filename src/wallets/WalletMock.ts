import { WalletBase } from "./WalletBase";

const WALLET_ADDRESS = 'WALLET_ADDRESS';

export default class WalletMock extends WalletBase {

    data: {
        id: string,
        balance: string
    }[];

    address?: string;

    isConnected(): boolean {
        return this.address != null;
    }

    async checkout(): Promise<void> {
        this.address = window.localStorage.getItem(WALLET_ADDRESS) as any;
    }

    async connect(): Promise<boolean> {
        if (!this.address) {
            if (window.confirm("Connect to mock wallet?")) {
                this.address = '0x3e21F43DeaBC23833E7T0Ba601x447122B4B917A';
                window.localStorage.setItem(WALLET_ADDRESS, this.address);            
                return true;
            }
            return true;
        }

        return false;
    }
    getNetwork(): number {
        return 17;
    }
    getAddress(): string | null {
        console.log("adr", this.address)
        return this.address || null;
    }
    getTokens(): string[] {
        throw new Error("Method not implemented.");
    }

    getBalance(id: string): number {
        if (!this.address) {
            return 0;
        }

        const index = this.data.findIndex(d => d.id === id);
        if (index === -1) {
            return 0;
        }

        return Number(this.data[index].balance);
    }

    constructor() {
        super();
    //    window.localStorage.setItem(WALLET_ADDRESS, '');
        this.address = window.localStorage.getItem(WALLET_ADDRESS) as any;
       

        this.data = [{
            "id": "toncoin",
            "balance": "0"
        }, {
            "id": "ethereum",
            "balance": "163"
        }, {
            "id": "tether",
            "balance": "87"
        }, {
            "id": "binancecoin",
            "balance": "75"
        }, {
            "id": "usd-coin",
            "balance": "267"
        }, {
            "id": "cardano",
            "balance": "125"
        }, {
            "id": "ripple",
            "balance": "124"
        }, {
            "id": "solana",
            "balance": "335"
        }, {
            "id": "terra-luna",
            "balance": "54"
        }, {
            "id": "polkadot",
            "balance": "44"
        }, {
            "id": "dogecoin",
            "balance": "415"
        }, {
            "id": "avalanche-2",
            "balance": "151"
        }, {
            "id": "binance-usd",
            "balance": "405"
        }, {
            "id": "terrausd",
            "balance": "93"
        }, {
            "id": "shiba-inu",
            "balance": "484"
        }, {
            "id": "cosmos",
            "balance": "233"
        }, {
            "id": "matic-network",
            "balance": "408"
        }, {
            "id": "wrapped-bitcoin",
            "balance": "49"
        }, {
            "id": "dai",
            "balance": "6"
        }, {
            "id": "crypto-com-chain",
            "balance": "221"
        }, {
            "id": "litecoin",
            "balance": "306"
        }, {
            "id": "chainlink",
            "balance": "146"
        }, {
            "id": "near",
            "balance": "160"
        }, {
            "id": "algorand",
            "balance": "227"
        }, {
            "id": "tron",
            "balance": "359"
        }, {
            "id": "okb",
            "balance": "375"
        }, {
            "id": "fantom",
            "balance": "216"
        }, {
            "id": "bitcoin-cash",
            "balance": "436"
        }, {
            "id": "magic-internet-money",
            "balance": "90"
        }, {
            "id": "uniswap",
            "balance": "384"
        }, {
            "id": "ftx-token",
            "balance": "38"
        }, {
            "id": "stellar",
            "balance": "10"
        }, {
            "id": "internet-computer",
            "balance": "171"
        }, {
            "id": "staked-ether",
            "balance": "444"
        }, {
            "id": "hedera-hashgraph",
            "balance": "42"
        }, {
            "id": "axie-infinity",
            "balance": "460"
        }, {
            "id": "leo-token",
            "balance": "30"
        }, {
            "id": "vechain",
            "balance": "91"
        }, {
            "id": "ethereum-classic",
            "balance": "484"
        }, {
            "id": "klay-token",
            "balance": "49"
        }, {
            "id": "compound-ether",
            "balance": "123"
        }, {
            "id": "cdai",
            "balance": "90"
        }, {
            "id": "filecoin",
            "balance": "352"
        }, {
            "id": "frax",
            "balance": "400"
        }, {
            "id": "the-sandbox",
            "balance": "321"
        }, {
            "id": "monero",
            "balance": "112"
        }, {
            "id": "elrond-erd-2",
            "balance": "15"
        }, {
            "id": "decentraland",
            "balance": "69"
        }, {
            "id": "theta-token",
            "balance": "208"
        }, {
            "id": "tezos",
            "balance": "209"
        }, {
            "id": "compound-usd-coin",
            "balance": "188"
        }, {
            "id": "osmosis",
            "balance": "313"
        }, {
            "id": "helium",
            "balance": "159"
        }, {
            "id": "harmony",
            "balance": "92"
        }, {
            "id": "eos",
            "balance": "435"
        }, {
            "id": "iota",
            "balance": "303"
        }, {
            "id": "bittorrent-old",
            "balance": "345"
        }, {
            "id": "the-graph",
            "balance": "182"
        }, {
            "id": "aave",
            "balance": "141"
        }, {
            "id": "theta-fuel",
            "balance": "363"
        }, {
            "id": "pancakeswap-token",
            "balance": "157"
        }, {
            "id": "bitcoin-cash-sv",
            "balance": "243"
        }, {
            "id": "maker",
            "balance": "240"
        }, {
            "id": "radix",
            "balance": "59"
        }, {
            "id": "kusama",
            "balance": "325"
        }, {
            "id": "ecomi",
            "balance": "104"
        }, {
            "id": "arweave",
            "balance": "256"
        }, {
            "id": "flow",
            "balance": "346"
        }, {
            "id": "true-usd",
            "balance": "346"
        }, {
            "id": "huobi-token",
            "balance": "154"
        }, {
            "id": "huobi-btc",
            "balance": "465"
        }, {
            "id": "blockstack",
            "balance": "275"
        }, {
            "id": "gala",
            "balance": "103"
        }, {
            "id": "enjincoin",
            "balance": "384"
        }, {
            "id": "ecash",
            "balance": "480"
        }, {
            "id": "amp-token",
            "balance": "172"
        }, {
            "id": "quant-network",
            "balance": "159"
        }, {
            "id": "neo",
            "balance": "261"
        }, {
            "id": "celo",
            "balance": "300"
        }, {
            "id": "convex-finance",
            "balance": "249"
        }, {
            "id": "kucoin-shares",
            "balance": "213"
        }, {
            "id": "oasis-network",
            "balance": "154"
        }, {
            "id": "zcash",
            "balance": "71"
        }, {
            "id": "thorchain",
            "balance": "268"
        }, {
            "id": "paxos-standard",
            "balance": "426"
        }, {
            "id": "basic-attention-token",
            "balance": "492"
        }, {
            "id": "curve-dao-token",
            "balance": "52"
        }, {
            "id": "loopring",
            "balance": "36"
        }, {
            "id": "gatechain-token",
            "balance": "103"
        }, {
            "id": "nexo",
            "balance": "309"
        }, {
            "id": "dash",
            "balance": "17"
        }, {
            "id": "bitkub-coin",
            "balance": "392"
        }, {
            "id": "chiliz",
            "balance": "148"
        }, {
            "id": "celsius-degree-token",
            "balance": "248"
        }, {
            "id": "nem",
            "balance": "297"
        }, {
            "id": "kadena",
            "balance": "38"
        }, {
            "id": "safemoon",
            "balance": "243"
        }, {
            "id": "waves",
            "balance": "485"
        }, {
            "id": "yearn-finance",
            "balance": "201"
        }, {
            "id": "sushi",
            "balance": "272"
        }]
    }
}

