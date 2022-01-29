import CoinData from "../models/CoinData";

export default function SwapReducer(state:SwapData = {
    from:null as any,
    to: null as any
}, action: SwapAction) {
    console.log("SwapAction",state,action)
    switch (action.type) {
        case SWAP_INPUTS: 
        return {address: action.address};
        //case ACTION_2: return { value: action.value_2 };

        default: return state;
    }
}

export interface SwapAction {
    type: string;
    address: string;
}

export interface SwapData {
    from: CoinData;
    to: CoinData;
}

export const SWAP_INPUTS = "SWAP_INPUTS";

export function updateWalletAddress(address: string) {
    console.log("updateWalletAddress",address)
    return {
        type: SWAP_INPUTS,
        address
    }
}