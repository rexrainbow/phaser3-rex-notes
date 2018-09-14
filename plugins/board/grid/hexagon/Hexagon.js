import Hexagon from 'rexPlugins/utils/grid/hexagon/Hexagon.js';
import GetNeighborTileX from 'rexPlugins/utils/grid/hexagon/GetNeighborTileX.js';
import GetNeighborTileY from 'rexPlugins/utils/grid/hexagon/GetNeighborTileY.js';

class HexagonGrid extends Hexagon {
    constructor(config) {
        super(config);
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
        this.directions = 6;
    }

    setDirectionMode(mode) {
        return this;
    }

    get allDirections() {
        return ALLDIR;
    }

    // board-match    
    get halfDirections() {
        return HALFDIR;
    }

    // getWorldX
    // getWorldY
    // getTileX
    // getTileY
}

const ALLDIR = [0, 1, 2, 3, 4, 5];
const HALFDIR = [0, 1, 2];

var methods = {
    getNeighborTileX: GetNeighborTileX,
    getNeighborTileY: GetNeighborTileY,
}
Object.assign(
    HexagonGrid.prototype,
    methods
);

export default HexagonGrid;