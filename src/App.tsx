import './App.css';
import Nav from './components/nav/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Swap from './pages/swap/Swap';
import Pool from './pages/pools/Pool';
import { Provider } from 'react-redux';
import store from './store/store';
import WalletController from './controllers/WalletController';
import WalletMock from './wallets/WalletMock';
import ThemeController from './controllers/ThemeController';
import { PoolDetails } from './pages/pool_details/PoolDetails';
import LocaleController from './controllers/LocaleController';



function App() {
  ThemeController.init();
  LocaleController.instance();
  const walletController = WalletController.instance();
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
            <Route path="pools" element={<Pool />}>

            </Route>
            <Route path='pools/:pool' element={<PoolDetails />} />
          </Routes>

        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
