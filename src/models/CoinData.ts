import Crypto from "./Crypto";
import Token from "./Token";

export default interface CoinData {
    value:string|number
    price:number
    token:Token;
}