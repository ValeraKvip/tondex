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
    //     this.wsTo?.close();
    //     this.wsFrom?.close();
    //     this.interval.forEach(f=> clearInterval(f));
    //     this.interval = [];

    //     this.interval.push(setInterval(function() {
    //         // method to be executed;
    //       }, 500));


    //     console.log("WATCH");
    //    this.wsTo = new WebSocket("wss://ftx.com/ws/api/markets/TONCOIN/USD");//https://ftx.com/api/markets/TONCOIN/USD
    //    this.wsTo.onopen = () =>{
    //         console.log("Соединение открыто");
    //         const apiCall = {
    //            'op': 'subscribe', 'channel': 'ticker', 'market': 'BTC-PERP'       
    //           };
    //           this.wsTo.send(JSON.stringify(apiCall))
    //     } 	// callback на ивент открытия соединения
    //     this.wsTo.onclose = () => console.log("Соединение закрыто"); // callback на ивент закрытия соединени
    //     this.wsTo.onmessage = (e:any) => {                //подписка на получение данных по вебсокету

    //         const message = JSON.parse(e.data);
    //         console.log("ON MSG", message);
    //     };

    }
}

