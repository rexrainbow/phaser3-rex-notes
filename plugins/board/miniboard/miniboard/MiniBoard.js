import ContainerLite from 'rexPlugins/gameobjects/containerlite/ContainerLite.js';
import Board from '../../board/Board.js';

import AddChess from './AddChess.js';
import RemoveChess from './RemoveChess.js';
import RemoveAllChess from './RemoveAllChess.js';

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
        this.syncGridOrigin();
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
        return this;
    }

    destroy() {
        this.emit('destroy');
        this.shutdown();
        return this;
    }

    get x() {
        return super.x;
    }

    set x(value) {
        if (super.x === value) {
            return;
        }
        super.x = value;

        this.syncGridOrigin();
    }

    get y() {
        return super.y;
    }

    set y(value) {
        if (super.y === value) {
            return;
        }
        super.y = value;

        this.syncGridOrigin();
    }

    syncGridOrigin() {
        if (!this.board) {
            return;
        }

        this.board.grid.setOriginPosition(this.x, this.y);
        return this;
    }
}

var methods = {
    addChess: AddChess,
    removeChess: RemoveChess,
    removeAllChess: RemoveAllChess,
}
Object.assign(
    MiniBoard.prototype,
    methods
);

export default MiniBoard;