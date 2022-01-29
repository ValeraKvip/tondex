import './connect-wallet.scss';

import React from "react";
import { connect } from 'react-redux';
import ConnectWallet from '../../controllers/WalletController';

class ConnectWalletBtn extends React.Component<{ address: string }> {

  constructor(props: any) {
    super(props);

    this.connect = this.connect.bind(this);
    this.getAddress = this.getAddress.bind(this);
  }

  async connect() {
    console.log('connect');
    ConnectWallet.instance().connect();
  }

  getAddress() {
    if (!this.props.address) {
      return 'Connect Wallet'
    }
    
    if (this.props.address.length < 11) {
      return this.props.address;
    }

    return `${this.props.address.substring(0, 5)}...${this.props.address.substring(this.props.address.length - 5, this.props.address.length)} `;
  }

  render() {
    return (
      <a className="connect-wallet" onClick={()=>ConnectWallet.instance().connect()}>
        <span>{this.getAddress()}</span>
      </a>
    );
  }
}

const mapStateToProps = function (state: any) {
  return {
    address: state.wallet.address,
  }
}

export default connect(mapStateToProps)(ConnectWalletBtn);
