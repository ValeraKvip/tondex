import axios from "axios";
import Token from "./Token";

export default class MarketWatch {
    interval?: any;
  
    tokens: Token[] = [];
    update: (priceList: CoinPrice) => void

    constructor(...tokens: Token[]) {
        this.update = null as any;
        this.tokens = [];
        this.tokens.push(...tokens);
    }

    public setTokens(...tokens: Token[]) {
        this.tokens = [];
        this.tokens.push(...tokens);
        this.stop();
        this.start(this.update);
    }

    public async start(update: (priceList: CoinPrice) => void) {
        try {
            this.stop();
            this.update = update;
          
            const getData = async () => {
                const requests = [] as any;
                const coin0 = this.tokens[0];
                const coin1 = this.tokens[1]

                const id0 = coin0.id === 'toncoin' ? "tether" : coin0.id;
                const id1 = coin1.id === 'toncoin' ? "tether" : coin1.id;
                const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${id0},${id1}`)

                const result: CoinPrice = {
                    [coin0.id]: Number.parseFloat(response.data[id0].usd),
                    [coin1.id]: Number.parseFloat(response.data[id1].usd)
                };

             
                update(result);
            }
            getData();
            this.interval = setInterval(getData, 1000);

        } catch (e) {
            console.log("ERR", e);
        }

    }

    public stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

export interface CoinPrice {
    [key: string]: number;

}