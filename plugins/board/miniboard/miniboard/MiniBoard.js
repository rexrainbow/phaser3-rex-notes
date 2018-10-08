import ContainerLite from 'rexPlugins/gameobjects/containerlite/ContainerLite.js';
import Board from '../../board/Board.js';
import MainBoardReference from './MainBoardReference.js';

import AddChess from './AddChess.js';
import RemoveChess from './RemoveChess.js';
import RemoveAllChess from './RemoveAllChess.js';
import PullOutFromMainBoard from './PullOutFromMainBoard.js';
import CanPutOnMainBoard from './CanPutOnMainBoard.js';
import PutOnMainBoard from './PutOnMainBoard.js';
import PutBack from './PutBack.js';
import CanMirror from './CanMirror.js';

const Container = ContainerLite;

class MiniBoard extends Container {
    constructor(scene, x, y, gridConfig) {
        super(scene, x, y, 0, 0);
        this.type = 'rexMiniBoard';
        var boardConfig = {
            grid: gridConfig,
            inifinity: true,
            wrap: false
        }
        this.board = new Board(scene, boardConfig);
        this.mainBoardRef = new MainBoardReference();
        this.lastMainBoardRef = new MainBoardReference();

        this.putTestCallback = undefined;
        this.putTestCallbackScpe = undefined;
    }

    boot() {
        this.scene.events.on('destroy', this.destroy, this);
    }

    shutdown() {
        this.clear(true);
        this.board.shutdown();
        super.shutdown();

        this.scene = undefined;
        this.board = undefined;
        this.setPutTestCallback(undefined, undefined);
        return this;
    }

    destroy() {
        this.emit('destroy');
        this.shutdown();
        return this;
    }

    get mainBoard() {
        return this.mainBoardRef.mainBoard;
    }

    get tileXYZMap() {
        return this.board.boardData.UIDToXYZ; // {uid:{x,y,z}}
    }

    setMainBoard(mainBoard, tileX, tileY) {
        this.mainBoardRef.set(mainBoard, tileX, tileY);
        if (mainBoard) {
            this.lastMainBoardRef.set(mainBoard, tileX, tileY);
        }
        return this;
    }

    setPutTestCallback(callback, scope) {
        this.putTestCallback = callback;
        this.putTestCallbackScpe = scope;
        return this;
    }
}

var methods = {
    addChess: AddChess,
    removeChess: RemoveChess,
    removeAllChess: RemoveAllChess,

    pullOutFromMainBoard: PullOutFromMainBoard,
    canPutOnMainBoard: CanPutOnMainBoard,
    putOnMainBoard: PutOnMainBoard,
    putBack: PutBack,
    canMirror: CanMirror,
}
Object.assign(
    MiniBoard.prototype,
    methods
);

export default MiniBoard;