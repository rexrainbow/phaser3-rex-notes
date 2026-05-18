import Pool from '../../../../pool';

import { Utils as PhaserUtils } from 'phaser';
const GetFastValue = PhaserUtils.Objects.GetFastValue;

var Pools = {};
class PoolManager {
    pools: any;

    constructor(config?: any) {
        this.pools = GetFastValue(config, 'pools', Pools);
    }

    free(bob?: any) {
        if (!this.pools) {
            return this;
        }

        var bobType = bob.type;
        if (!this.pools.hasOwnProperty(bobType)) {
            this.pools[bobType] = new Pool();
        }
        this.pools[bobType].push(bob);
        bob.onFree();
        return this;
    }

    freeMultiple(arr?: any) {
        if (!this.pools) {
            return this;
        }

        for (var i = 0, cnt = arr.length; i < cnt; i++) {
            this.free(arr[i]);
        }
        return this;
    }

    allocate(bobType?: any) {
        if (!this.pools || !this.pools.hasOwnProperty(bobType)) {
            return null;
        }
        return this.pools[bobType].pop();
    }
}

export default PoolManager;