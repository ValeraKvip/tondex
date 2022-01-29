import EventEmitter from "events";


export abstract class WalletBase{
 
    abstract isConnected():boolean;
    abstract getBalance(id: string): number;
    abstract checkout(): Promise<void>;
    abstract connect(): Promise<boolean>;
    abstract getNetwork(): number;
    abstract getAddress(): string | null;
    abstract getTokens(): string[];
  }