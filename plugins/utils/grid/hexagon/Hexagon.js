'use strict'

import Core from './HexagonCore.js';
import GetWorldX from './GetWorldX.js';
import GetWorldY from './GetWorldY.js';

class Hexagon extends Core {
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

export default Hexagon;