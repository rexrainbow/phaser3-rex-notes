import Hexagon from 'rexPlugins/utils/grid/hexagon/Hexagon.js';
import GetNeighborTileX from 'rexPlugins/utils/grid/hexagon/GetNeighborTileX.js';
import GetNeighborTileY from 'rexPlugins/utils/grid/hexagon/GetNeighborTileY.js';

class HexagonGrid extends Hexagon{
    constructor(config) {
        super(config);
        this.directions = 6;
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
    }

    // getWorldX
    // getWorldY
    // getTileX
    // getTileY
}

var methods = {
    getNeighborTileX: GetNeighborTileX,
    getNeighborTileY: GetNeighborTileY,
}
Object.assign(
    HexagonGrid.prototype,
    methods
);

export default HexagonGrid;