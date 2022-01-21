import React from 'react';
import logo from './icons/ton_symbol.svg';
import './App.css';
import Nav from './components/nav/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Swap from './pages/swap/Swap';
import Pools from './pages/Pools';
import TokenSelect from './pages/tokens/TokenSelects';

function App() {
  console.log('AA');
  return (
    <div className="App" id='app'>
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route path="/" element={<Swap />} />
          <Route path="swap" element={<Swap />} />
          <Route path="pools" element={<Pools />} />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
