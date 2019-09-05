import Container from '../../gameobjects/containerlite/ContainerLite.js';
import Methods from './Methods.js';
import Board from '../board/LogicBoard.js';
import MainBoardReference from './mainboard/MainBoardReference.js';
import GetValue from '../../utils/object/GetValue.js';

class MiniBoard extends Container {
    constructor(scene, x, y, config) {
        super(scene, x, y, 0, 0);
        this.type = 'rexMiniBoard';
        var boardConfig = {
            isBoard: false,
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
        this.setFace(GetValue(o, 'face', 0));
        var dragEnable = GetValue(o, 'draggable', undefined);
        if (dragEnable !== undefined) {
            this.setDraggable(dragEnable);
        }
        this.lastTransferResult = GetValue(o, 'lastTransferResult', undefined);
        return this;
    }

    boot() {
        this.scene.events.once('shutdown', this.destroy, this);
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

    setFace(direction) {
        this.face = this.board.grid.directionNormalize(direction);
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

Object.assign(
    MiniBoard.prototype,
    Methods
);

export default MiniBoard;