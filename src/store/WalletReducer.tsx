export default function WalletReducer(state:WalletState = {
    address:''
}, action: WalletAction) {
  
    switch (action.type) {
        case UPDATE_WALLET_ADDRESS: 
        return {address: action.address};
      

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