import Hexagon from 'rexPlugins/utils/grid/hexagon/Hexagon.js';
import GetNeighborTileXY from 'rexPlugins/utils/grid/hexagon/GetNeighborTileXY.js';

class HexagonGrid extends Hexagon{
    constructor(config) {
        super(config);
        this.directions = 6;
    }

    resetFromJSON(o) {
        super.resetFromJSON(o);
    }
}

var methods = {
    getNeighborTileXY: GetNeighborTileXY,
}
Object.assign(
    HexagonGrid.prototype,
    methods
);

export default HexagonGrid;