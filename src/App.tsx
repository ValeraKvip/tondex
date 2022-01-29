import React from 'react';
import logo from './icons/ton_symbol.svg';
import './App.css';
import Nav from './components/nav/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Swap from './pages/swap/Swap';
import Pools from './pages/Pools';
import TokenSelect from './components/tokens/TokenSelects';
import { Provider } from 'react-redux';
import store from './store/store';
import WalletController from './controllers/WalletController';
import WalletMock from './wallets/WalletMock';



function App() {
  const walletController =  WalletController.instance();
  walletController.setProvider(new WalletMock());
  walletController.checkout();
  
  return (
    <div className="App" id='app'>
      <Provider store={store}>
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<Swap />} />
            <Route path="swap" element={<Swap />} />
            <Route path="pools" element={<Pools />} />
          </Routes>

        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
