import ChessBank from './ChessBank.js';

const uidKey = ChessBank.uidKey;
class Chess {
    constructor(parent, uid) {
        this.parent = parent;
        ChessBank.add(this, uid); // uid is stored in `this.$uid`
        this.board = null;
        this.boot();
    }

    boot() {
        var type = typeof (this.parent);
        if ((type !== 'number') && (type !== 'string') && this.parent.on) {
            this.parent.on('destroy', this.destroy, this);
        }
    }

    destroy() {
        if (this.board) {
            this.board.removeChess(this[uidKey]);
        }
        ChessBank.remove(this[uidKey]);

        this.parent = undefined;
        this.board = null;
    }

    setBoard(board) {
        this.board = board;
        return this;
    }

    get tileXYZ() {
        if (this.board == null) {
            return null;
        }
        return this.board.chessToTileXYZ(this[uidKey]);
    }

    get tileX() {
        var tileXYZ = this.tileXYZ;
        if (tileXYZ) {
            return tileXYZ.x;
        }
        return null;
    }

    get tileY() {
        var tileXYZ = this.tileXYZ;
        if (tileXYZ) {
            return tileXYZ.y;
        }
        return null;
    }

    get tileZ() {
        var tileXYZ = this.tileXYZ;
        if (tileXYZ) {
            return tileXYZ.z;
        }
        return null;
    }
}

export default Chess;