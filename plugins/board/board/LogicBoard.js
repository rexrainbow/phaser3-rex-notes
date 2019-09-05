import EE from '../../utils/eventemitter/EventEmitter.js';
import LogicMethods from './LogicMethods.js';
import BoardData from './boarddata/BoardData.js';
import DefaultGrids from '../grid/index.js';
import GetValue from '../../utils/object/GetValue.js';
import IsPlainObject from '../../utils/object/IsPlainObject.js';

class Board extends EE {
    constructor(scene, config) {
        super();

        this.scene = scene;
        this.boardData = new BoardData();
        this.resetFromJSON(config);
        this.boot();
    }

    resetFromJSON(o) {
        this.isBoard = GetValue(o, 'isBoard', true);
        this.setGrid(GetValue(o, 'grid', undefined));
        this.setWrapMode(GetValue(o, 'wrap', false));
        this.setInfinityBoard(GetValue(o, 'inifinity', false));
        this.setBoardWidth(GetValue(o, 'width', 0));
        this.setBoardHeight(GetValue(o, 'height', 0));
        return this;
    }

    boot() {
        if (this.scene) {
            this.scene.events.once('shutdown', this.destroy, this);
        }
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

    clear(destroy) {
        if (destroy === undefined) {
            destroy = true;
        }
        this.removeAllChess(destroy, true);
        this.boardData.clear();
        return this;
    }
}

Object.assign(
    Board.prototype,
    LogicMethods
);

export default Board;