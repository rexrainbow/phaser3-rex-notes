import LogicBoard from './LogicBoard';
import SetInteractive from './input/SetInteractive';
import ForEachCullTileXY from './camera/ForEachCullTileXY';

class Board extends LogicBoard {
    destroy: any;
    input: any;
    isBoard: any;
    isShutdown: any;
    scene: any;

    boot() {
        super.boot();

        if (this.scene && this.isBoard) {
            this.scene.sys.events.once('shutdown', this.destroy, this);
        }
    }

    shutdown(fromScene?: any) {
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