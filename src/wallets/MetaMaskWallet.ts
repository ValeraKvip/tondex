import { WalletBase } from "./WalletBase";


export default class MetaMaskWallet extends WalletBase {
  

    ethereum: any;
    address?: string;

    constructor() {
        super();

        this.ethereum = (window as any).ethereum;

        // this.ethereum?.on('accountsChanged', (accounts: string[]) => {
        //     if (accounts?.length > 0) {
        //         store.dispatch(updateWalletAddress(accounts[0]));
        //     }
        // });
    }

    isConnected(): boolean {
        return this.address != null;
    }

    getBalance(id: string): number {
        throw new Error("Method not implemented.");
    }
    checkout(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async connect(): Promise<boolean> {
        if (!this.ethereum) {
            console.log(`ethereum doesn't exists`);
            window.open('https://metamask.io/', '_blank');
            return false;
        }

        const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts?.length > 0) {
            this.address = accounts[0];
            return true;
        }
        return false;
    }

    getNetwork(): number {
        throw new Error("Method not implemented.");
    }
    getAddress(): string {
        throw new Error("Method not implemented.");
    }
    getTokens(): string[] {
        throw new Error("Method not implemented.");
    }

}