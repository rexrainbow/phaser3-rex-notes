import GetChessData from '../chess/GetChessData';
import GetChessUID from '../chess/GetChessUID';

import SetBoardWidth from './boarddata/SetBoardWidth';
import SetBoardHeight from './boarddata/SetBoardHeight';

import TileXYZToKey from '../utils/tilexyzkey/TileXYZToKey';
import TileXYToKey from '../utils/tilexyzkey/TileXYToKey';
import KeyToTileXYZ from '../utils/tilexyzkey/KeyToTileXYZ';

import TileXYToWorldX from './worldposition/TileXYToWorldX';
import TileXYToWorldY from './worldposition/TileXYToWorldY';
import TileXYToWorldXY from './worldposition/TileXYToWorldXY';
import TileXYArrayToWorldXYArray from './worldposition/TileXYArrayToWorldXYArray';
import WorldXYToTileX from './worldposition/WorldXYToTileX';
import WorldXYToTileY from './worldposition/WorldXYToTileY';
import WorldXYToTileXY from './worldposition/WorldXYToTileXY';
import WorldXYToChessArray from './worldposition/WorldXYToChessArray';
import WorldXYToChess from './worldposition/WorldXYToChess';
import WorldXYSnapToGrid from './worldposition/WorldXYSnapToGrid';
import AngleBetween from './worldposition/AngleBetween';
import IsAngleInCone from './worldposition/IsAngleInCone';
import AngleToward from './worldposition/AngleToward';
import AngleSnapToDirection from './worldposition/AngleSnapToDirection';
import IsOverlappingPoint from './worldposition/IsOverlappingPoint';
import GridAlign from './worldposition/GridAlign';
import GetGridPoints from './worldposition/GetGridPoints';
import GetGridBounds from './worldposition/GetGridBounds';
import GetBoardBounds from './worldposition/GetBoardBounds';
import GetBoundaryPoints from './worldposition/getboundarypoints/GetBoundaryPoints';

import LineToTileXYArray from './shape/LineToTileXYArray';
import CircleToTileXYArray from './shape/CircleToTileXYArray';
import EllipseToTileXYArray from './shape/EllipseToTileXYArray';
import PolygonToTileXYArray from './shape/PolygonToTileXYArray';
import RectangleToTileXYArray from './shape/RectangleToTileXYArray';
import TriangleToTileXYArray from './shape/TriangleToTileXYArray';
import ShapeToTileXYArray from './shape/ShapeToTileXYArray';
import ForEachTileXYInShape from './shape/ForEachTileXYInShape';

import UidToChess from './chess/UidToChess';
import AddChess from './chess/AddChess';
import SetChessTileZ from './chess/SetChessTileZ';
import RemoveChess from './chess/RemoveChess';
import RemoveAllChess from './chess/RemoveAllChess';
import SwapChess from './chess/SwapChess';
import GetAllChess from './chess/GetAllChess';

import Contains from './tileposition/Contains';
import ForEachTileXY from './tileposition/ForEachTileXY';
import GetWrapTileXY from './tileposition/GetWrapTileXY';
import TileXYZToChess from './tileposition/TileXYZToChess';
import TileXYToChessArray from './tileposition/TileXYToChessArray';
import TileZToChessArray from './tileposition/TileZToChessArray';
import TileXYArrayToChessArray from './tileposition/TileXYArrayToChessArray';
import ChessToTileXYZ from './tileposition/ChessToTileXYZ';
import GetOppositeDirection from './tileposition/GetOppositeDirection';
import GetDistance from './tileposition/GetDistance';
import DirectionBetween from './tileposition/DirectionBetween';
import IsDirectionInCone from './tileposition/IsDirectionInCone';

import Offset from './transform/Offset';
import Mirror from './transform/Mirror';
import Rotate from './transform/Rotate';
import Fit from './transform/Fit';

import IsEmptyTileXYZ from './empty/IsEmptyTileXYZ';
import GetEmptyTileXYArray from './empty/GetEmptyTileXYArray';
import GetRandomEmptyTileXY from './empty/GetRandomEmptyTileXY';
import GetEmptyTileXYArrayInRange from './empty/GetEmptyTileXYArrayInRange';
import GetRandomEmptyTileXYInRange from './empty/GetRandomEmptyTileXYInRange';

import GetTileXYAtDirection from './neighbors/GetTileXYAtDirection';
import GetNeighborTileXY from './neighbors/GetNeighborTileXY';
import GetNeighborTileXYAtAngle from './neighbors/GetNeighborTileXYAtAngle';
import GetNeighborChess from './neighbors/GetNeighborChess';
import GetNeighborTileDirection from './neighbors/GetNeighborTileDirection';
import GetNeighborChessDirection from './neighbors/GetNeighborChessDirection';
import AreNeighbors from './neighbors/AreNeighbors';
import MapNeighbors from './neighbors/MapNeighobrs';

import RingToTileXYArray from './ring/RingToTileXYArray';
import RingToChessArray from './ring/RingToChessArray';
import FilledRingToTileXYArray from './ring/FilledRingToTileXYArray';
import FilledRingToChessArray from './ring/FilledRingToChessArray';

import HasBlocker from './blocker/HasBlocker';
import HasEdgeBlocker from './blocker/HasEdgeBlocker';

import GetBoard from './chess/GetBoard';

export default {
    getChessData: GetChessData,
    getChessUID: GetChessUID,

    setBoardWidth: SetBoardWidth,
    setBoardHeight: SetBoardHeight,

    tileXYZToKey: TileXYZToKey,
    tileXYToKey: TileXYToKey,
    keyToTileXYZ: KeyToTileXYZ,

    tileXYToWorldX: TileXYToWorldX,
    tileXYToWorldY: TileXYToWorldY,
    tileXYToWorldXY: TileXYToWorldXY,
    tileXYArrayToWorldXYArray: TileXYArrayToWorldXYArray,
    worldXYToTileX: WorldXYToTileX,
    worldXYToTileY: WorldXYToTileY,
    worldXYToTileXY: WorldXYToTileXY,
    worldXYToChessArray: WorldXYToChessArray,
    worldXYToChess: WorldXYToChess,
    worldXYSnapToGrid: WorldXYSnapToGrid,
    angleBetween: AngleBetween,
    isAngleInCone: IsAngleInCone,
    angleToward: AngleToward,
    angleSnapToDirection: AngleSnapToDirection,
    isOverlappingPoint: IsOverlappingPoint,
    gridAlign: GridAlign,
    getGridPoints: GetGridPoints,
    getGridBounds: GetGridBounds,
    getBoardBounds: GetBoardBounds,
    getBoundaryPoints: GetBoundaryPoints,

    lineToTileXYArray: LineToTileXYArray,
    circleToTileXYArray: CircleToTileXYArray,
    ellipseToTileXYArray: EllipseToTileXYArray,
    polygonToTileXYArray: PolygonToTileXYArray,
    rectangleToTileXYArray: RectangleToTileXYArray,
    triangleToTileXYArray: TriangleToTileXYArray,
    shapeToTileXYArray: ShapeToTileXYArray,
    forEachTileXYInShape: ForEachTileXYInShape,

    uidToChess: UidToChess,
    addChess: AddChess,
    removeChess: RemoveChess,
    removeAllChess: RemoveAllChess,
    swapChess: SwapChess,
    moveChess: AddChess,
    setChessTileZ: SetChessTileZ,
    getAllChess: GetAllChess,

    contains: Contains,
    forEachTileXY: ForEachTileXY,
    getWrapTileXY: GetWrapTileXY,
    tileXYZToChess: TileXYZToChess,
    tileXYToChessArray: TileXYToChessArray,
    tileZToChessArray: TileZToChessArray,
    tileXYArrayToChessArray: TileXYArrayToChessArray,
    chessToTileXYZ: ChessToTileXYZ,
    offset: Offset,
    mirror: Mirror,
    rotate: Rotate,
    getOppositeDirection: GetOppositeDirection,
    getDistance: GetDistance,
    directionBetween: DirectionBetween,
    isDirectionInCone: IsDirectionInCone,
    fit: Fit,

    isEmptyTileXYZ: IsEmptyTileXYZ,
    getEmptyTileXYArray: GetEmptyTileXYArray,
    getRandomEmptyTileXY: GetRandomEmptyTileXY,
    getEmptyTileXYArrayInRange: GetEmptyTileXYArrayInRange,
    getRandomEmptyTileXYInRange: GetRandomEmptyTileXYInRange,

    getTileXYAtDirection: GetTileXYAtDirection,
    getNeighborTileXY: GetNeighborTileXY,
    getNeighborTileXYAtAngle: GetNeighborTileXYAtAngle,
    getNeighborChess: GetNeighborChess,
    getNeighborTileDirection: GetNeighborTileDirection,
    getNeighborChessDirection: GetNeighborChessDirection,
    areNeighbors: AreNeighbors,
    mapNeighbors: MapNeighbors,

    ringToTileXYArray: RingToTileXYArray,
    ringToChessArray: RingToChessArray,
    filledRingToTileXYArray: FilledRingToTileXYArray,
    filledRingToChessArray: FilledRingToChessArray,

    hasBlocker: HasBlocker,
    hasEdgeBlocker: HasEdgeBlocker,

    getGridPoints: GetGridPoints,

    chessToBoard: GetBoard,
};