import GetChessData from '../chess/GetChessData.js';
import GetChessUID from '../chess/GetChessUID.js';

import SetBoardWidth from './boarddata/SetBoardWidth.js';
import SetBoardHeight from './boarddata/SetBoardHeight.js';

import TileXYToWorldX from './worldposition/TileXYToWorldX.js';
import TileXYToWorldY from './worldposition/TileXYToWorldY.js';
import TileXYToWorldXY from './worldposition/TileXYToWorldXY.js';
import WorldXYToTileX from './worldposition/WorldXYToTileX.js';
import WorldXYToTileY from './worldposition/WorldXYToTileY.js';
import WorldXYToTileXY from './worldposition/WorldXYToTileXY.js';
import WorldXYSnapToGrid from './worldposition/WorldXYSnapToGrid.js';
import AngleBetween from './worldposition/AngleBetween.js';
import AngleToward from './worldposition/AngleToward.js';
import IsOverlappingPoint from './worldposition/IsOverlappingPoint.js';
import GridAlign from './worldposition/GridAlign.js';
import LineToTileXYArray from './line/LineToTileXYArray.js';

import UidToChess from './chess/UidToChess.js';
import AddChess from './chess/AddChess.js';
import RemoveChess from './chess/RemoveChess.js';
import RemoveAllChess from './chess/RemoveAllChess.js';
import SwapChess from './chess/SwapChess.js';
import GetAllChess from './chess/GetAllChess.js';

import Contains from './tileposition/Contains.js';
import ForEachTileXY from './tileposition/ForEachTileXY.js';
import GetWrapTileX from './tileposition/GetWrapTileX.js';
import GetWrapTileY from './tileposition/GetWrapTileY.js';
import TileXYZToChess from './tileposition/TileXYZToChess.js';
import TileXYToChessArray from './tileposition/TileXYToChessArray.js';
import TileZToChessArray from './tileposition/TileZToChessArray.js';
import TileXYArrayToChessArray from './tileposition/TileXYArrayToChessArray.js';
import ChessToTileXYZ from './tileposition/ChessToTileXYZ.js';
import GetOppositeDirection from './tileposition/GetOppositeDirection.js';
import GetDistance from './tileposition/GetDistance.js';
import DirectionBetween from './tileposition/DirectionBetween.js';

import Offset from './transform/Offset.js';
import Mirror from './transform/Mirror.js';
import Rotate from './transform/Rotate.js';
import Fit from './transform/Fit.js';

import GetEmptyTileXYArray from './empty/GetEmptyTileXYArray.js';
import GetRandomEmptyTileXY from './empty/GetRandomEmptyTileXY.js';

import GetNeighborTileXY from './neighbors/GetNeighborTileXY.js';
import GetNeighborChess from './neighbors/GetNeighborChess.js';
import GetNeighborTileDirection from './neighbors/GetNeighborTileDirection.js';
import GetNeighborChessDirection from './neighbors/GetNeighborChessDirection.js';
import AreNeighbors from './neighbors/AreNeighbors.js';

import RingToTileXYArray from './ring/RingToTileXYArray.js';

import HasBlocker from './blocker/HasBlocker.js';
import HasEdgeBlocker from './blocker/HasEdgeBlocker.js';

import GetGridPoints from './gridpoints/GetGridPoints.js';

export default {
    getChessData: GetChessData,
    getChessUID: GetChessUID,

    setBoardWidth: SetBoardWidth,
    setBoardHeight: SetBoardHeight,

    tileXYToWorldX: TileXYToWorldX,
    tileXYToWorldY: TileXYToWorldY,
    tileXYToWorldXY: TileXYToWorldXY,
    worldXYToTileX: WorldXYToTileX,
    worldXYToTileY: WorldXYToTileY,
    worldXYToTileXY: WorldXYToTileXY,
    worldXYSnapToGrid: WorldXYSnapToGrid,
    angleBetween: AngleBetween,
    angleToward: AngleToward,
    isOverlappingPoint: IsOverlappingPoint,
    gridAlign: GridAlign,
    lineToTileXYArray: LineToTileXYArray,

    uidToChess: UidToChess,
    addChess: AddChess,
    removeChess: RemoveChess,
    removeAllChess: RemoveAllChess,
    swapChess: SwapChess,
    moveChess: AddChess,
    getAllChess: GetAllChess,

    contains: Contains,
    forEachTileXY: ForEachTileXY,
    getWrapTileX: GetWrapTileX,
    getWrapTileY: GetWrapTileY,
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
    fit: Fit,

    getEmptyTileXYArray: GetEmptyTileXYArray,
    getRandomEmptyTileXY: GetRandomEmptyTileXY,

    getNeighborTileXY: GetNeighborTileXY,
    getNeighborChess: GetNeighborChess,
    getNeighborTileDirection: GetNeighborTileDirection,
    getNeighborChessDirection: GetNeighborChessDirection,
    areNeighbors: AreNeighbors,

    ringToTileXYArray: RingToTileXYArray,

    hasBlocker: HasBlocker,
    hasEdgeBlocker: HasEdgeBlocker,

    getGridPoints: GetGridPoints,
};