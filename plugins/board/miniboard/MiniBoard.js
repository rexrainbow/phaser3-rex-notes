import ContainerLite from '../../gameobjects/containerlite/ContainerLite.js';
import Board from '../board/Board.js';

import AddChess from './chess/AddChess.js';
import RemoveChess from './chess/RemoveChess.js';
import RemoveAllChess from './chess/RemoveAllChess.js';

import MainBoardReference from './mainboard/MainBoardReference.js';
import SetMainBoard from './mainboard/SetMainboard.js';
import CanPutOnMainBoard from './mainboard/CanPutOnMainBoard.js';
import PutOnMainBoard from './mainboard/PutOnMainBoard.js';
import PullOutFromMainBoard from './mainboard/PullOutFromMainBoard.js';
import PutBack from './mainboard/PutBack.js';
import IsOverlapping from './mainboard/IsOverlapping.js';
import AlignToMainBoard from './mainboard/AlignToMainBoard.js';

import SetInteractive from './input/SetInteractive.js';
import SetDragEnable from './input/SetDragEnable.js';
import DragEnd from './input/DragEnd.js';

import CanMirror from './transfer/CanMirror.js';
import Mirror from './transfer/Mirror.js';
import CanRotate from './transfer/CanRotate.js';
import Rotate from './transfer/Rotate.js';
import CanRotateTo from './transfer/CanRotateTo.js';
import RotateTo from './transfer/RotateTo.js';

import GetValue from '../../utils/object/GetValue.js';
import Wrap from '../../utils/math/Wrap.js';

const Container = ContainerLite;

class MiniBoard extends Container {
    constructor(scene, x, y, config) {
        super(scene, x, y, 0, 0);
        this.type = 'rexMiniBoard';
        var boardConfig = {
            grid: GetValue(config, 'grid', undefined),
            inifinity: true,
            wrap: false
        }
        this.board = new Board(scene, boardConfig);
        this.mainBoardRef = new MainBoardReference();
        this.lastMainBoardRef = new MainBoardReference();

        this.putTestCallback = undefined;
        this.putTestCallbackScpe = undefined;

        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.setFaceDirection(GetValue(o, 'face', 0));
        var dragEnable = GetValue(o, 'draggable', undefined);
        if (dragEnable !== undefined) {
            this.setDragEnable(dragEnable);
        }
        this.lastTransferResult = GetValue(o, 'lastTransferResult', undefined);
        return this;
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

    setFaceDirection(direction) {
        this.face = Wrap(direction, 0, this.board.grid.directions - 1);
        return this;
    }

    get mainBoard() {
        return this.mainBoardRef.mainBoard;
    }

    get tileX() {
        return this.mainBoardRef.tileX;
    }

    get tileY() {
        return this.mainBoardRef.tileY;
    }

    get grid() {
        return this.board.grid;
    }

    get tileXYZMap() {
        return this.board.boardData.UIDToXYZ; // {uid:{x,y,z}}
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
    isOverlapping: IsOverlapping,
    alignToMainBoard: AlignToMainBoard,

    setInteractive: SetInteractive,
    setDragEnable: SetDragEnable,
    dragEnd: DragEnd,

    setMainBoard: SetMainBoard,
    canMirror: CanMirror,
    mirror: Mirror,
    canRotate: CanRotate,
    rotate: Rotate,
    canRotateTo: CanRotateTo,
    rotateTo: RotateTo,
}
Object.assign(
    MiniBoard.prototype,
    methods
);

export default MiniBoard;