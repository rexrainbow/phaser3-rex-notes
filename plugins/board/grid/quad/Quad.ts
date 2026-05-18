import Quad from '../../../utils/grid/quad/Quad';
import SaveOrigin from '../utils/SaveOrigin';
import RestoreOrigin from '../utils/RestoreOrigin';
import GetTileXYAtDirection from '../../../utils/grid/quad/GetTileXYAtDirection';
import GetNeighborTileXY from '../../../utils/grid/quad/GetNeighborTileXY';
import GetNeighborTileDirection from '../../../utils/grid/quad/GetNeighborTileDirection';
import GetOppositeDirection from '../../../utils/grid/quad/GetOppositeDirection';
import Offset from '../../../utils/grid/quad/Offset';
import Mirror from '../../../utils/grid/quad/Mirror';
import Rotate from '../../../utils/grid/quad/Rotate';
import GetDistance from '../../../utils/grid/quad/GetDistance';
import DirectionBetween from '../../../utils/grid/quad/DirectionBetween';
import DirectionNormalize from '../utils/DirectionNormalize';
import GetGridPoints from './GetGridPoints';
import GetBounds from './GetBounds';
import RingToTileXYArray from '../../../utils/grid/quad/RingToTileXYArray';

class QuadGrid extends Quad {
    directions: any;
    sides: any;

    constructor(config?: any) {
        super(config);
        this.sides = 4;
    }

    // resetFromJSON(o) {
    //     super.resetFromJSON(o);
    // }

    // Direction of neighbors
    get allDirections() {
        return (this.directions === 4) ? ALLDIR4 : ALLDIR8;
    }

    // Board-match
    get halfDirections() {
        return (this.directions === 4) ? HALFDIR4 : HALFDIR8;
    }

    // setOriginPosition
    // setCellSize
    // setType
    // getWorldXY
    // getTileXY
    // getGridPolygon        
}

const ALLDIR4 = [0, 1, 2, 3];
const ALLDIR8 = [0, 1, 2, 3, 4, 5, 6, 7];
const HALFDIR4 = [0, 1];
const HALFDIR8 = [0, 1, 4, 5];

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
    QuadGrid.prototype,
    methods
);

export default QuadGrid;