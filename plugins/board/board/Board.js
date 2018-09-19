import ChessBank from '../chess/ChessBank.js';
import GetChessData from '../chess/GetChessData.js';
import GetChessUID from '../chess/GetChessUID.js';
import BoardData from '../data/board/BoardData.js';

import TileXYToWorldX from './TileXYToWorldX.js';
import TileXYToWorldY from './TileXYToWorldY.js';
import WorldXYToTileX from './WorldXYToTileX.js';
import WorldXYToTileY from './WorldXYToTileY.js';
import SetBoardWidth from './SetBoardWidth.js';
import SetBoardHeight from './SetBoardHeight.js';
import AddChess from './AddChess.js';
import GridAlign from './GridAlign.js';
import RemoveChess from './RemoveChess.js';
import RemoveAllChess from './RemoveAllChess.js';
import SwapChess from './SwapChess.js';
import Contains from './Contains.js';
import ForEachTileXY from './ForEachTileXY.js';
import GetWrapTileX from './GetWrapTileX.js';
import GetWrapTileY from './GetWrapTileY.js';
import TileXYZToChess from './TileXYZToChess.js';
import TileXYToChessArray from './TileXYToChessArray.js';
import TileXYArrayToChessArray from './TileXYArrayToChessArray.js';
import ChessToTileXYZ from './ChessToTileXYZ.js';
import GetAllChess from './GetAllChess.js';
import GetEmptyTileXYArray from './GetEmptyTileXYArray.js';
import GetRandomEmptyTileXY from './GetRandomEmptyTileXY.js';
import GetNeighborTileXY from './GetNeighborTileXY.js';
import GetNeighborChess from './GetNeighborChess.js';
import GetNeighborTileDirection from './GetNeighborTileDirection.js';
import GetNeighborChessDirection from './GetNeighborChessDirection.js';
import AreNeighbors from './AreNeighbors.js';
import HasBlocker from './HasBlocker.js';
import HasEdgeBlocker from './HasEdgeBlocker.js';
import SetInteractive from './SetInteractive.js';
import GetGridPolygon from './GetGridPolygon.js';


const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class Board extends EE {
    constructor(scene, config) {
        super();

        this.scene = scene;
        this.boardData = new BoardData();
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setGrid(GetValue(o, 'grid', undefined));
        this.setWrapMode(GetValue(o, 'wrap', false));
        this.setInfinityBoard(GetValue(o, 'inifinity', false));
        this.setBoardWidth(GetValue(o, 'width', 0));
        this.setBoardHeight(GetValue(o, 'height', 0));
        return this;
    }

    shutdown() {
        super.shutdown();
        this.boardData.shutdown();

        this.scene = undefined;
        this.boardData = undefined;
        return this;
    }

    destroy() {
        this.emit('destroy');
        this.removeAllChess(true, true);
        this.shutdown();
        return this;
    }

    setGrid(grid) {
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

    uidToChess(uid) {
        if (uid == null) {
            return null;
        } else {
            // single uid
            if (!this.boardData.exists(uid)) {
                return null;
            }
            return ChessBank.get(uid).parent;
        }
    }

    uidArrayToChess(uid, out) {
        if (out === undefined) {
            out = [];
        }
        var uidArray = uid;
        for (var i = 0, cnt = uidArray.length; i < cnt; i++) {
            uid = uidArray[i];
            if (!this.boardData.exists(uid)) {
                continue;
            }
            out.push(ChessBank.get(uid));
        }
        return out;
    }

    get chessCount() {
        return this.boardData.chessCount;
    }
}

var methods = {
    tileXYToWorldX: TileXYToWorldX,
    tileXYToWorldY: TileXYToWorldY,
    worldXYToTileX: WorldXYToTileX,
    worldXYToTileY: WorldXYToTileY,
    setBoardWidth: SetBoardWidth,
    setBoardHeight: SetBoardHeight,
    getChessData: GetChessData,
    getChessUID: GetChessUID,
    addChess: AddChess,
    gridAlign: GridAlign,
    removeChess: RemoveChess,
    removeAllChess: RemoveAllChess,
    moveChess: AddChess,
    swapChess: SwapChess,
    forEachTileXY: ForEachTileXY,
    contains: Contains,
    getWrapTileX: GetWrapTileX,
    getWrapTileY: GetWrapTileY,
    tileXYZToChess: TileXYZToChess,
    tileXYToChessArray: TileXYToChessArray,
    tileXYArrayToChess: TileXYArrayToChessArray,
    chessToTileXYZ: ChessToTileXYZ,
    getAllChess: GetAllChess,
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
    getGridPolygon: GetGridPolygon,
}
Object.assign(
    Board.prototype,
    methods
);

export default Board;