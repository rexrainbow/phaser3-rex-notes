'use strict'

import Hexagon from 'rexPlugins/utils/grid/hexagon/Hexagon.js';

class HexagonGrid extends Hexagon{
    constructor(config) {
        super(config);
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
    }
}

export default HexagonGrid;