import './connect-wallet.scss';

import React from "react";

export default class ConnectWalletBtn extends React.Component {

  constructor(props: any) {
    super(props);

    const ethereum = (window as any).ethereum;

    if (ethereum !== 'undefined') {


      // Time to reload your interface with accounts[0]!


      console.log('accountsChanged', ethereum.selectedAddress, ethereum.networkVersion, ethereum.isConnected());

    }

    this.connect = this.connect.bind(this);
    this.checkoutConnectedWallet = this.checkoutConnectedWallet.bind(this);
    this.checkoutConnectedWallet(ethereum);
  }

  async checkoutConnectedWallet(ethereum: any) {
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    console.log('checkoutConnectedWallet', accounts, accounts);
  }

  async connect() {
    console.log('connect');

    const ethereum = (window as any).ethereum;

    if (ethereum !== 'undefined') {
      console.log('MetaMask is installed!', (window as any).ethereum);
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const address = await ethereum.enable();
      console.log('Accounts', accounts, address);

      ethereum.on('accountsChanged', function (_accounts: any) {
        // Time to reload your interface with accounts[0]!
        console.log('accountsChanged', _accounts);
      });
    }
  }

  render() {
    return (
      <a className="connect-wallet" onClick={this.connect}>
        <span>Connect Wallet</span>
      </a>
    );
  }
}