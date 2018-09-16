import ChessBank from '../data/chess/ChessBank.js';
import GetChessData from '../data/chess/GetChessData.js';
import GetChessUID from '../data/chess/GetChessUID.js';
import BoardData from '../data/board/BoardData.js';

import SetBoardWidth from './SetBoardWidth.js';
import SetBoardHeight from './SetBoardHeight.js';
import AddChess from './AddChess.js';
import GridAlign from './GridAlign.js';
import RemoveChess from './RemoveChess.js';
import MoveChess from './MoveChess.js';
import SwapChess from './SwapChess.js';
import Contains from './Contains.js';
import ForEachTileXY from './ForEachTileXY.js';
import GetWrapTileX from './GetWrapTileX.js';
import GetWrapTileY from './GetWrapTileY.js';
import TileXYZToChess from './TileXYZToChess.js';
import TileXYToChess from './TileXYToChess.js';
import TileXYArrayToChess from './TileXYArrayToChess.js';
import ChessToTileXYZ from './ChessToTileXYZ.js';
import GetNeighborTileX from './GetNeighborTileX.js';
import GetNeighborTileY from './GetNeighborTileY.js';
import GetNeighborChess from './GetNeighborChess.js';
import TileXYToWorldX from './TileXYToWorldX.js';
import TileXYToWorldY from './TileXYToWorldY.js';
import WorldXYToTileX from './WorldXYToTileX.js';
import WorldXYToTileY from './WorldXYToTileY.js';
import SetInteractive from './SetInteractive.js';


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
}

var methods = {
    setBoardWidth: SetBoardWidth,
    setBoardHeight: SetBoardHeight,
    getChessData: GetChessData,
    getChessUID: GetChessUID,
    addChess: AddChess,
    gridAlign: GridAlign,
    removeChess: RemoveChess,
    moveChess: MoveChess,
    swapChess: SwapChess,
    forEachTileXY: ForEachTileXY,
    contains: Contains,
    getWrapTileX: GetWrapTileX,
    getWrapTileY: GetWrapTileY,
    tileXYZToChess: TileXYZToChess,
    tileXYToChess: TileXYToChess,
    tileXYArrayToChess: TileXYArrayToChess,
    chessToTileXYZ: ChessToTileXYZ,
    getNeighborTileX: GetNeighborTileX,
    getNeighborTileY: GetNeighborTileY,
    getNeighborChess: GetNeighborChess,
    tileXYToWorldX: TileXYToWorldX,
    tileXYToWorldY: TileXYToWorldY,
    worldXYToTileX: WorldXYToTileX,
    worldXYToTileY: WorldXYToTileY,
    setInteractive: SetInteractive,
}
Object.assign(
    Board.prototype,
    methods
);

export default Board;