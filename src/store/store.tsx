import { combineReducers, createStore } from 'redux';
import WalletReducer from './WalletReducer';

const store = createStore(
    combineReducers({
        wallet: WalletReducer
        
    }));

export default store;