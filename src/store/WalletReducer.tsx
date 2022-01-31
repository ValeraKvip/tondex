export default function WalletReducer(state:WalletState = {
    address:''
}, action: WalletAction) {
   // console.log("WalletAction gg",state,action)
    switch (action.type) {
        case UPDATE_WALLET_ADDRESS: 
        return {address: action.address};
        //case ACTION_2: return { value: action.value_2 };

        default: return state;
    }
}

export interface WalletAction {
    type: string;
    address: string;
}

export interface WalletState {   
    address: string;
}

export const UPDATE_WALLET_ADDRESS = "UPDATE_WALLET_ADDRESS";

export function updateWalletAddress(address: string) {
    console.log("updateWalletAddress",address)
    return {
        type: UPDATE_WALLET_ADDRESS,
        address
    }
}