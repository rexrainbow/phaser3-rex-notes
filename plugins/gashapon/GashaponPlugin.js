'use strict'

import Gashapon from './Gashapon.js';

class GashaponPlugin extends Gashapon {
    constructor(parent, config) {
        super(config);
    }

    shutdown() {
        super.destroy();
    }

    destroy() {
        this.shutdown();
    }
}

export default GashaponPlugin;