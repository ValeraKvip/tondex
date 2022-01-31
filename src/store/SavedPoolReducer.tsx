import { PoolState } from "./PoolReducer";
import store from "./store";

export default function SavedPoolReducer(state: SavedPoolState = {
    pools: [],

}, action: SavedPoolAction): SavedPoolState {
  
    switch (action.type) {
        case UPDATE_SAVED_POOL:
            console.log('SavedPoolReducer',action)
       
            const newState = {
                ...state,
                pools:[...action.pools]
            };
            return newState;


        default: return state;
    }
}

export interface SavedPoolAction {
    type: string;
    pools: PoolState[]
}

export interface SavedPoolState {
    pools: PoolState[]
}

export const UPDATE_SAVED_POOL = "UPDATE_SAVED_POOL";

export function updateSavedPool(pools:PoolState[]) {
    store.dispatch({
        pools,
        type: UPDATE_SAVED_POOL,
    })
}