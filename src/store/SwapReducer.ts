import CoinData from "../models/CoinData";

export default function SwapReducer(state: SwapState = {
    origin: 0,
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
    slippageTolerance: '2',
    tradeDeadline: '30'
}, action: SwapAction): SwapState {
    switch (action.type) {
        case SWAP_INPUTS:
            return {
                ...state,
                origin: state.origin ? 1 : 0,
                from: state.to,
                to: state.from
            };
        case UPDATE_FROM:
            return {
                ...state,
                from: action.from as any
            };
        case UPDATE_TO:
            return {
                ...state,
                to: action.to as any
            };

        case UPDATE_ORIGIN:
            return {
                ...state,
                to: action.origin as any
            };

        case UPDATE_INPUTS:
            return {
                ...state,
                to: action.to as any,
                from: action.from as any
            };
        case UPDATE_VALUES:         
            return {
                ...state,
                ...action
                // origin: action.origin as any,
                // to: action.to as any,
                // from: action.from as any
            };


        default: return state;
    }
}

export interface SwapAction {
    type: string;
    to?: CoinData;
    from?: CoinData;
    origin?: number;
    slippageTolerance?: string;
    tradeDeadline?: string;
}

export interface SwapState {
    from: CoinData;
    to: CoinData;
    origin: number;
    slippageTolerance: string;
    tradeDeadline: string;
}

export const SWAP_INPUTS = "SWAP_INPUTS";
export const UPDATE_FROM = "UPDATE_FROM";
export const UPDATE_TO = "UPDATE_TO";
export const UPDATE_ORIGIN = "UPDATE_ORIGIN";
export const UPDATE_INPUTS = "UPDATE_INPUTS";
export const UPDATE_VALUES = "UPDATE_VALUES";
export const UPDATE_SLIPPAGE = "UPDATE_SLIPPAGE";
export const UPDATE_TRADE_DEADLINE = "UPDATE_TRADE_DEADLINE";



export function updateInputs(from: CoinData, to: CoinData): SwapAction {
    return {
        type: UPDATE_INPUTS,
        from,
        to
    }
}

export function swapInputs(): SwapAction {
    return {
        type: SWAP_INPUTS,
    }
}

export function updateSwapFrom(from: CoinData): SwapAction {
    return {
        type: UPDATE_FROM,
        from
    }
}

export function updateSwapTo(to: CoinData): SwapAction {
    return {
        type: UPDATE_TO,
        to
    }
}


export function updateSwapOrigin(origin: number): SwapAction {
    return {
        type: UPDATE_ORIGIN,
        origin
    }
}


export function updateSwap(swap:  Omit<SwapAction, "type">  ): SwapAction {
    return {       
        ...swap,
        type: UPDATE_VALUES,
    }
}