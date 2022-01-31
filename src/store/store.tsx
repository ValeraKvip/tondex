import { combineReducers, createStore } from 'redux';
import SwapReducer from './SwapReducer';
import WalletReducer from './WalletReducer';
import PoolReducer from './PoolReducer';
import SavedPoolReducer from './SavedPoolReducer';

const store = createStore(
    combineReducers({
        swap: SwapReducer,
        wallet: WalletReducer,
        pool: PoolReducer,
        savedPool: SavedPoolReducer
    }));

export default store;