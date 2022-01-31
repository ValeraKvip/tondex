import { PoolState, updatePool } from "../store/PoolReducer";
import { updateSavedPool } from "../store/SavedPoolReducer";

const SAVED_POOLS = "SAVED_POOLS";

export default class PoolController {
    private static _instance: PoolController;
    private pools: PoolState[] = [];

    static instance(): PoolController {
        return PoolController._instance || (PoolController._instance = new PoolController());
    }

    private constructor() {
        this.loadPools();
    }

    private async loadPools() {
        const items = localStorage.getItem(SAVED_POOLS);
        if (items) {
            const pools = JSON.parse(items);
            if (pools) {
                this.pools = pools;
            }
        }
    }

    async getPools(): Promise<PoolState[]> {
        return this.pools;
    }

    async removePool(index: number) {       
       this.pools.splice(index, 1);     
        localStorage.setItem(SAVED_POOLS, JSON.stringify(this.pools));
        updateSavedPool(this.pools);
    }

  

    async createPool(pool: PoolState) {
        const from = { ...pool.from };
        from.value = '';

        const to = { ...pool.to };
        to.value = '';

        this.pools.push(pool);
        localStorage.setItem(SAVED_POOLS, JSON.stringify(this.pools));

        updatePool({
            from, to
        })

        updateSavedPool(this.pools);
    }
}