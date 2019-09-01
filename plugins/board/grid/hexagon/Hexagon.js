import Hexagon from '../../../utils/grid/hexagon/Hexagon.js';
import SaveOrigin from '../utils/SaveOrigin.js';
import RestoreOrigin from '../utils/RestoreOrigin.js';
import GetNeighborTileX from '../../../utils/grid/hexagon/GetNeighborTileX.js';
import GetNeighborTileY from '../../../utils/grid/hexagon/GetNeighborTileY.js';
import GetNeighborTileDirection from '../../../utils/grid/hexagon/GetNeighborTileDirection.js';
import GetOppositeDirection from '../../../utils/grid/hexagon/GetOppositeDirection.js';
import Offset from '../../../utils/grid/hexagon/Offset.js';
import Mirror from '../../../utils/grid/hexagon/Mirror.js';
import Rotate from '../../../utils/grid/hexagon/Rotate.js';
import GetDistance from '../../../utils/grid/hexagon/GetDistance.js';
import DirectionBetween from '../../../utils/grid/hexagon/DirectionBetween.js';
import DirectionNormalize from '../utils/DirectionNormalize.js';
import GetGridPoints from './GetGridPoints.js';
import RingToTileXYArray from '../../../utils/grid/hexagon/RingToTileXYArray.js';

class HexagonGrid extends Hexagon {
    constructor(config) {
        super(config);
        this.sides = 6;
    }

    // resetFromJSON(o) {
    //     super.resetFromJSON(o);
    // }

    // Direction of neighbors
    get allDirections() {
        return ALLDIR;
    }

    // Board-match
    get halfDirections() {
        return HALFDIR;
    }

    // setOriginPosition
    // setCellSize
    // setType
    // getWorldXY
    // getTileXY
}

const ALLDIR = [0, 1, 2, 3, 4, 5];
const HALFDIR = [0, 1, 2];

var methods = {
    saveOrigin: SaveOrigin,
    restoreOrigin: RestoreOrigin,
    getNeighborTileX: GetNeighborTileX,
    getNeighborTileY: GetNeighborTileY,
    getNeighborTileDirection: GetNeighborTileDirection,
    getOppositeDirection: GetOppositeDirection,
    offset: Offset,
    mirror: Mirror,
    rotate: Rotate,
    getDistance: GetDistance,
    directionBetween: DirectionBetween,
    directionNormalize: DirectionNormalize,
    getGridPoints: GetGridPoints,
    ringToTileXYArray: RingToTileXYArray,
}
Object.assign(
    HexagonGrid.prototype,
    methods
);

export default HexagonGrid;