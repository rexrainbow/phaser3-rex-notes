import Container from '../../gameobjects/container/containerlite/ContainerLite';
import Methods from './Methods';
import Board from '../board/LogicBoard';
import MainBoardReference from './mainboard/MainBoardReference';
import GetValue from '../../utils/object/GetValue';

class MiniBoard extends Container {
    board: any;
    clear: any;
    face: any;
    lastMainBoardRef: any;
    lastTransferResult: any;
    mainBoardRef: any;
    putTestCallback: any;
    putTestCallbackScpe: any;
    scene: any;
    setDraggable: any;
    type: any;

    constructor(scene?: any, x?: any, y?: any, config?: any) {
        super(scene, x, y, 0, 0);
        this.type = 'rexMiniBoard';
        var boardConfig = {
            isBoard: false,
            grid: GetValue(config, 'grid', undefined),
            infinity: true,
            wrap: false
        }
        this.board = new Board(scene, boardConfig);
        this.mainBoardRef = new MainBoardReference();
        this.lastMainBoardRef = new MainBoardReference();

        this.resetFromJSON(config);
    }

    resetFromJSON(o?: any) {
        this.setFace(GetValue(o, 'face', 0));
        var dragEnable = GetValue(o, 'draggable', undefined);
        if (dragEnable !== undefined) {
            this.setDraggable(dragEnable);
        }
        this.setPutTestCallback(GetValue(o, 'putTestCallback', undefined), GetValue(o, 'putTestCallbackScpe', undefined));       
        this.lastTransferResult = GetValue(o, 'lastTransferResult', undefined);
        return this;
    }

    destroy(fromScene?: any) {
        if (!this.scene) {
            return
        }

        this.clear(!fromScene);
        this.board.shutdown(fromScene);
        this.board = undefined;
        this.setPutTestCallback(undefined, undefined);

        super.destroy(fromScene);
    }

    setFace(direction?: any) {
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

    setPutTestCallback(callback?: any, scope?: any) {
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