'use strict'

import PoolKlass from 'rexPlugins/pool.js';

class ObjectPoolPlugin extends PoolKlass {
    constructor(scene, config) {
        super();
        this.scene = scene;        
        //this.boot();
    }

    boot() {
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

export default ObjectPoolPlugin;