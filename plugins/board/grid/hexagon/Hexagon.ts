import Hexagon from '../../../utils/grid/hexagon/Hexagon';
import SaveOrigin from '../utils/SaveOrigin';
import RestoreOrigin from '../utils/RestoreOrigin';
import GetTileXYAtDirection from '../../../utils/grid/hexagon/GetTileXYAtDirection';
import GetNeighborTileXY from '../../../utils/grid/hexagon/GetNeighborTileXY';
import GetNeighborTileDirection from '../../../utils/grid/hexagon/GetNeighborTileDirection';
import GetOppositeDirection from '../../../utils/grid/hexagon/GetOppositeDirection';
import Offset from '../../../utils/grid/hexagon/Offset';
import Mirror from '../../../utils/grid/hexagon/Mirror';
import Rotate from '../../../utils/grid/hexagon/Rotate';
import GetDistance from '../../../utils/grid/hexagon/GetDistance';
import DirectionBetween from '../../../utils/grid/hexagon/DirectionBetween';
import DirectionNormalize from '../utils/DirectionNormalize';
import GetGridPoints from './GetGridPoints';
import GetBounds from './GetBounds';
import RingToTileXYArray from '../../../utils/grid/hexagon/RingToTileXYArray';

class HexagonGrid extends Hexagon {
    sides: any;

    constructor(config?: any) {
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
    getTileXYAtDirection: GetTileXYAtDirection,
    getNeighborTileXY: GetNeighborTileXY,
    getNeighborTileDirection: GetNeighborTileDirection,
    getOppositeDirection: GetOppositeDirection,
    offset: Offset,
    mirror: Mirror,
    rotate: Rotate,
    getDistance: GetDistance,
    directionBetween: DirectionBetween,
    directionNormalize: DirectionNormalize,
    getGridPoints: GetGridPoints,
    getBounds: GetBounds,
    ringToTileXYArray: RingToTileXYArray,
}
Object.assign(
    HexagonGrid.prototype,
    methods
);

export default HexagonGrid;