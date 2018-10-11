import GetChessData from '../chess/GetChessData.js';
import GetChessUID from '../chess/GetChessUID.js';

import BoardData from './boarddata/BoardData.js';
import SetBoardWidth from './boarddata/SetBoardWidth.js';
import SetBoardHeight from './boarddata/SetBoardHeight.js';

import TileXYToWorldX from './worldposition/TileXYToWorldX.js';
import TileXYToWorldY from './worldposition/TileXYToWorldY.js';
import WorldXYToTileX from './worldposition/WorldXYToTileX.js';
import WorldXYToTileY from './worldposition/WorldXYToTileY.js';
import IsOverlappingPoint from './worldposition/IsOverlappingPoint.js';
import GridAlign from './worldposition/GridAlign.js';

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
import Offset from './tileposition/Offset.js';
import Rotate from './tileposition/Rotate.js';
import GetOppositeDirection from './tileposition/GetOppositeDirection.js';
import GetDistance from './tileposition/GetDistance.js';
import Fit from './tileposition/Fit.js';

import GetEmptyTileXYArray from './empty/GetEmptyTileXYArray.js';
import GetRandomEmptyTileXY from './empty/GetRandomEmptyTileXY.js';

import GetNeighborTileXY from './neighbors/GetNeighborTileXY.js';
import GetNeighborChess from './neighbors/GetNeighborChess.js';
import GetNeighborTileDirection from './neighbors/GetNeighborTileDirection.js';
import GetNeighborChessDirection from './neighbors/GetNeighborChessDirection.js';
import AreNeighbors from './neighbors/AreNeighbors.js';

import HasBlocker from './blocker/HasBlocker.js';
import HasEdgeBlocker from './blocker/HasEdgeBlocker.js';

import SetInteractive from './input/SetInteractive.js';

import GetGridPoints from './gridpolygon/GetGridPoints.js';
import GetGridPolygon from './gridpolygon/GetGridPolygon.js';

import DefaultGrids from '../grid/index.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;
const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;

class Board extends EE {
    constructor(scene, config) {
        super();

        this.scene = scene;
        this.boardData = new BoardData();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setGrid(GetValue(o, 'grid', undefined));
        this.setWrapMode(GetValue(o, 'wrap', false));
        this.setInfinityBoard(GetValue(o, 'inifinity', false));
        this.setBoardWidth(GetValue(o, 'width', 0));
        this.setBoardHeight(GetValue(o, 'height', 0));
        return this;
    }

    boot() {
        this.scene.events.on('destroy', this.destroy, this);
    }

    shutdown() {
        this.removeAllChess(true, true);
        super.shutdown();
        this.boardData.shutdown();

        this.scene = undefined;
        this.boardData = undefined;
        return this;
    }

    destroy() {
        this.emit('destroy');
        this.shutdown();
        return this;
    }

    setGrid(grid) {
        if (IsPlainObject(grid)) {
            var config = grid;
            var gridType = GetValue(config, 'gridType', 'quadGrid');
            var grid = new DefaultGrids[gridType](config);
        }
        this.grid = grid;
        return this;
    }

    setWrapMode(mode) {
        if (mode === undefined) {
            mode = true;
        }
        this.wrapMode = mode;
        return this;
    }

    setInfinityBoard(mode) {
        if (mode === undefined) {
            mode = true;
        }
        this.infinityMode = mode;
        return this;
    }

    setBoardSize(width, height) {
        this.setBoardWidth(width);
        this.setBoardHeight(height);
        return this;
    }

    exists(gameObject) {
        // game object or uid
        return this.boardData.exists(this.getChessUID(gameObject));
    }

    get chessCount() {
        return this.boardData.chessCount;
    }
}

var methods = {
    getChessData: GetChessData,
    getChessUID: GetChessUID,

    setBoardWidth: SetBoardWidth,
    setBoardHeight: SetBoardHeight,

    tileXYToWorldX: TileXYToWorldX,
    tileXYToWorldY: TileXYToWorldY,
    worldXYToTileX: WorldXYToTileX,
    worldXYToTileY: WorldXYToTileY,
    isOverlappingPoint: IsOverlappingPoint,
    gridAlign: GridAlign,

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
    tileXYArrayToChess: TileXYArrayToChessArray,
    chessToTileXYZ: ChessToTileXYZ,
    offset: Offset,
    rotate: Rotate,
    getOppositeDirection: GetOppositeDirection,
    getDistance: GetDistance,
    fit: Fit,

    getEmptyTileXYArray: GetEmptyTileXYArray,
    getRandomEmptyTileXY: GetRandomEmptyTileXY,

    getNeighborTileXY: GetNeighborTileXY,
    getNeighborChess: GetNeighborChess,
    getNeighborTileDirection: GetNeighborTileDirection,
    getNeighborChessDirection: GetNeighborChessDirection,
    areNeighbors: AreNeighbors,

    hasBlocker: HasBlocker,
    hasEdgeBlocker: HasEdgeBlocker,

    setInteractive: SetInteractive,

    getGridPoints: GetGridPoints,
    getGridPolygon: GetGridPolygon,
}
Object.assign(
    Board.prototype,
    methods
);

export default Board;