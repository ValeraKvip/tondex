import Crypto from "./Crypto";

const FROM = 'from';
const TO = 'to';

export default class Trade {
    from: Crypto;
    to: Crypto;
    fee: number;
    price: number;
    origin: string = FROM;
    wsFrom:any;
    wsTo:any
    interval:any[];

    constructor(from: Crypto, to: Crypto, fee: number) {
        this.from = from;
        this.to = to;
        this.fee = fee;
        this.price = 0;
        this.interval = [];

        this.watch();
        
    }

    swap() {

    }

    watch() {

    }
}

