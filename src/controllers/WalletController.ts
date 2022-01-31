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

  isConnected(): boolean {
    return this.provider?.isConnected() ?? false;
  }

  async connect() {
    if (await this.provider?.connect()) {
      store.dispatch(updateWalletAddress(this.provider?.getAddress() || ''));
      this.emit(ACCOUNT_CONNECTED, this.address);
    }
  }

  async disconnect() {
    if (await this.provider?.disconnect()) {
      store.dispatch(updateWalletAddress(''));
      this.emit(ACCOUNT_CONNECTED, this.address);
    }
  }

  async getBalance(token_address: string) {
    const balance = this.provider?.getBalance(token_address);
    return balance || 0;
  }

}


