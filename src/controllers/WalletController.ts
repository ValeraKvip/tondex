import store from "../store/store";
import { updateWalletAddress } from "../store/WalletReducer";
import axios from "axios";
import { WalletBase } from "../wallets/WalletBase";
import EventEmitter from "events";
import { ACCOUNT_CONNECTED } from "../wallets/WalletEvents";


export default class WalletController extends EventEmitter {
  private static _instance: WalletController;
  ethereum: any;
  address?: string;
  provider?: WalletBase;


  public static instance(): WalletController {
    return WalletController._instance || (WalletController._instance = new WalletController());
  }

  private constructor() {
    super();
    this.setMaxListeners(10);
  }



  public getProvider(): WalletBase | undefined {
    return this.provider;
  }

  public setProvider(provider: WalletBase) {
    this.provider = provider
    if (this.provider.getAddress()) {
      this.emit(ACCOUNT_CONNECTED, this.address);
    }
  }

  async getAbi(address: string) {
    const abi = await axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=K9RZDMVXRCE2N8W8UFA84FX5XM3PDQYDDZ`)
    console.log('getAbi', abi.data);
    if (abi.data.status == 1) {
      return JSON.parse(abi.data.result);
    }

    return null;
  }

  async checkout() {
    if (!this.provider) {
      console.log(`provider doesn't exists`);
      return;
    }

    const address = await this.provider.getAddress();

    if (address) {
      store.dispatch(updateWalletAddress(address));
    }
  }

  async connect() {
    if (this.provider?.connect()) {
      store.dispatch(updateWalletAddress(this.provider.getAddress() || ''));
      this.emit(ACCOUNT_CONNECTED, this.address);
    }
  }

  async getBalance(token_address: string) {
    const balance = this.provider?.getBalance(token_address);
  //  console.log("#BALANCE", balance);
    return balance || 0;
    // if (!this.address) {
    //     console.log('Wallet does not connected');
    //     return;
    // }

    // return this.ethereum.request({ method: 'eth_getBalance', params: [token_address, 'latest'] });
  }

}


