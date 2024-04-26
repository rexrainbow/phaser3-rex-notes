import LogicBoard from './LogicBoard.js';
import SetInteractive from './input/SetInteractive.js';
import ForEachCullTileXY from './camera/ForEachCullTileXY.js';

class Board extends LogicBoard {
    boot() {
        super.boot();

        if (this.scene && this.isBoard) {
            this.scene.sys.events.once('shutdown', this.destroy, this);
        }
    }

    shutdown(fromScene) {
        if (this.isShutdown) {
            return;
        }

        if (this.scene && this.isBoard) {
            this.scene.sys.events.off('shutdown', this.destroy, this);
        }

        super.shutdown(fromScene);

        return this;
    }

    get touchZone() {
        if (this.input) {
            return this.input.touchZone;
        } else {
            return null;
        }
    }

    getTouchZone() {
        return this.touchZone;
    }
}

var methods = {
    setInteractive: SetInteractive,
    forEachCullTileXY: ForEachCullTileXY,
}
Object.assign(
    Board.prototype,
    methods
);

export default Board;