import Crypto from "./Crypto";
import Token from "./Token";

export default interface CoinData extends Crypto{
    value:number
    price:number
    token:Token;
}