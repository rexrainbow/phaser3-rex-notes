'use strict'

import Bank from 'rexPlugins/bank.js';

class Chess {
    constructor(parent, uid) {
        this.parent = parent;
        Chess.chessBank.add(this, uid); // uid is stored in `this.$uid`
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
        this.parent = undefined;
        Chess.chessBank.remove(this.uid);
        this.board = undefined;
    }

    get tileXYZ() {
        if (this.board == null) {
            return null;
        }
        return this.board.getChessXYZ(this.$uid);
    }

    get tileX() {
        var tileXYZ = this.tileXYZ;
        if (tileXYZ == null) {
            return null;
        }
        return tileXYZ.x;
    }

    get tileY() {
        var tileXYZ = this.tileXYZ;
        if (tileXYZ == null) {
            return null;
        }
        return tileXYZ.y;
    }

    get tileZ() {
        var tileXYZ = this.tileXYZ;
        if (tileXYZ == null) {
            return null;
        }
        return tileXYZ.z;
    }
}

Chess.chessBank = new Bank();

export default Chess;