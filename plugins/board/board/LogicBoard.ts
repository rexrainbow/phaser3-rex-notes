import EventEmitter from '../../utils/eventemitter/EventEmitter';
import LogicMethods from './LogicMethods';
import BoardData from './boarddata/BoardData';
import DefaultGrids from '../grid/index';
import GetValue from '../../utils/object/GetValue';
import IsPlainObject from '../../utils/object/IsPlainObject';
import GetBoard from './chess/GetBoard';

class Board extends EventEmitter {
    scene: any;

    boardData: any;
    emit: any;
    getChessUID: any;
    grid: any;
    infinityMode: any;
    isBoard: any;
    isShutdown: any;
    removeAllChess: any;
    setBoardHeight: any;
    setBoardWidth: any;
    wrapMode: any;

    constructor(scene?: any, config?: any) {
        if (IsPlainObject(scene) && (config === undefined)) {
            config = scene;
            scene = undefined;
        }

        // scene: scene instance, or undefined
        super();

        this.isShutdown = false;
        this.scene = scene;
        this.boardData = new BoardData();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o?: any) {
        this.isBoard = GetValue(o, 'isBoard', true);  // false: in Miniboard
        this.setGrid(GetValue(o, 'grid', undefined));
        this.setWrapMode(GetValue(o, 'wrap', false));
        this.setInfinityMode(GetValue(o, 'infinity', false));
        this.setBoardWidth(GetValue(o, 'width', 0));
        this.setBoardHeight(GetValue(o, 'height', 0));
        return this;
    }

    boot() {
    }

    shutdown(fromScene?: any) {
        if (this.isShutdown) {
            return;
        }

        if (this.isBoard) {
            this.removeAllChess(!fromScene, true);
        } else {

        }

        super.shutdown();
        this.boardData.shutdown(fromScene);

        this.scene = undefined;
        this.boardData = undefined;
        this.isShutdown = true;

        return this;
    }

    destroy(fromScene?: any) {
        if (this.isShutdown) {
            return;
        }
        this.emit('destroy', this, fromScene);
        this.shutdown(fromScene);
    }

    setGrid(grid?: any) {
        if (IsPlainObject(grid)) {
            var config = grid;
            var gridType = GetValue(config, 'gridType', 'quadGrid');
            var grid = new DefaultGrids[gridType](config);
        }
        this.grid = grid;
        return this;
    }

    setWrapMode(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.wrapMode = enable;
        return this;
    }

    setInfinityMode(enable?: any) {
        if (enable === undefined) {
            enable = true;
        }
        this.infinityMode = enable;
        return this;
    }

    setBoardSize(width?: any, height?: any) {
        this.setBoardWidth(width);
        this.setBoardHeight(height);
        return this;
    }

    exists(gameObject?: any) {
        // game object or uid
        return this.boardData.exists(this.getChessUID(gameObject));
    }

    get chessCount() {
        return this.boardData.chessCount;
    }

    clear(destroy?: any) {
        if (destroy === undefined) {
            destroy = true;
        }
        this.removeAllChess(destroy, true);
        this.boardData.clear();
        return this;
    }

    static GetBoard(chess?: any) {
        return GetBoard(chess);
    }
}

Object.assign(
    Board.prototype,
    LogicMethods
);

export default Board;