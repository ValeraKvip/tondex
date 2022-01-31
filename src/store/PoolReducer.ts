import CoinData from "../models/CoinData";
import store from "./store";

export default function PoolReducer(state: PoolState = {
    origin: 0,
    tier: 0.01,
    from: {
        price: 0,
        value: '',
        token: { "id": "toncoin", "symbol": "ton", "name": "Toncoin", "image": "assets/icons/ton.svg" }
    },
    to: {
        price: 0,
        value: '',
        token: { "id": "ethereum", "symbol": "eth", "name": "Ethereum", "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880" }
    },

}, action: PoolAction): PoolState {
    switch (action.type) {
        case UPDATE_POOL:
            const newState = {
                ...state,
                ...action
            };
            //  delete newState.type ;
            return newState;


        default: return state;
    }
}

export interface PoolAction {
    type: string;
    to?: CoinData;
    from?: CoinData;
    origin?: number;
    tier?: number;
}

export interface PoolState {
    from: CoinData;
    to: CoinData;
    origin: number;
    tier: number;
}

export const UPDATE_POOL = "UPDATE_POOL";






export function updatePool(pool: Omit<PoolAction, "type">) {
    store.dispatch({
        ...pool,
        type: UPDATE_POOL,
    })
}