import Pool from '../../../../pool.js';

const GetFastValue = Phaser.Utils.Objects.GetFastValue;

var Pools = {};
class PoolManager {
    constructor(config) {
        this.pools = GetFastValue(config, 'pools', Pools);
    }

    free(bob) {
        var bobType = bob.type;
        if (!this.pools.hasOwnProperty(bobType)) {
            this.pools[bobType] = new Pool();
        }
        this.pools[bobType].push(bob);
        bob.onFree();
        return this;
    }

    freeMultiple(arr) {
        for (var i = 0, cnt = arr.length; i < cnt; i++) {
            this.free(arr[i]);
        }
        return this;
    }

    allocate(bobType) {
        if (!this.pools.hasOwnProperty(bobType)) {
            return null;
        }
        return this.pools[bobType].pop();
    }
}

export default PoolManager;