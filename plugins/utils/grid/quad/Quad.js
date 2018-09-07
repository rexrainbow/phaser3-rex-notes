'use strict'

import Core from './QuadCore.js';
import GetWorldX from './GetWorldX.js';
import GetWorldY from './GetWorldY.js';

class Quad extends Core {
    constructor(config) {
        super(config);
    }

    getWorldX(tileX, tileY) {
        return GetWorldX(this, tileX, tileY);
    }

    getWorldY(tileX, tileY) {
        return GetWorldY(this, tileX, tileY);
    }
}

export default Quad;