import axios from "axios";
import Token from "./Token";

export default class MarketWatch {
    interval?: any;
    //  token: string;
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
         //   console.log("START ");
            const getData = async ()=>{
                const requests = [] as any;
                const coin0 = this.tokens[0];
                const coin1 = this.tokens[1]               
                const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${coin0.id},${coin1.id}`)
               
                const result: CoinPrice = {
                    [coin0.id]: Number.parseFloat(response.data[coin0.id].usd),
                    [coin1.id]: Number.parseFloat(response.data[coin1.id].usd)
                };

             //   console.log("result ", result);
                update(result);
            }
            getData();
            this.interval = setInterval(getData,1000);

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