import Pool from '../../pool.js';

class ObjectPool extends Pool {
    constructor() {
        super();
    }

    shutdown() {
        var items = this.items,
            item;
        for (var i = 0, len = items.length; i < len; i++) {
            item = items[i];
            if (item.destroy) { // assume that object has destroy function
                item.destroy();
            }
        }
        items.length = 0;
        this.scene = undefined;
    }

    destroy() {
        this.shutdown();
    }
}

export default ObjectPool;