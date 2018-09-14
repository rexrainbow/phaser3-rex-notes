import IsFunction from 'rexPlugins/utils/object/IsFunction.js';
import MatchBoard from './MatchBoard.js';
import MatchAt from './MatchAt.js';
import MatchAtDir from './MatchAtDir.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Match {
    constructor(config) {
        this.symbols = []; // tileX+(tileY*board.width)
        this.dirMask = {};
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setBoard(GetValue(o, 'board', undefined));
        this.setWildcard(GetValue(o, 'wildcard', undefined));
        this.clearSymbols();

        var dirMask = GetValue(o, 'dirMask', undefined);
        if (dirMask !== undefined) {
            this.setDirMask(dirMask);
        }
        return this;
    }

    shutdown() {
        this.board = undefined;
        this.symbols = undefined;
        return this;
    }

    destroy() {
        this.shutdown();
        return this;
    }

    setBoard(board) {
        this.board = board;
    }

    setDirMask(dirMask) {
        var maskValue;
        for (var dir in dirMask) {
            maskValue = dirMask[dir];
            if (DIRMASKMODE.hasOwnProperty(dir)) {
                dir = DIRMASKMODE[dir];
            }

            this.dirMask[dir] = maskValue;
        }
        return this;
    }

    setDirectionMode(mode) {
        this.board.grid.setDirectionMode(mode);
        return this;
    }

    clearSymbols() {
        this.refreshSymbols(null);
        return this;
    }

    setSymbol(tileX, tileY, callback, scope) {
        var board = this.board;
        var symbol;
        if (IsFunction(callback)) {
            tmp.x = tileX;
            tmp.y = tileY;
            if (scope) {
                symbol = callback.call(scope, tmp, board);
            } else {
                symbol = callback(tmp, board);
            }
        } else {
            symbol = callback;
        }

        this.symbols[this.tileXYToKey(tileX, tileY)] = symbol;
        return this;
    }

    getSymbol(tileX, tileY) {
        return this.symbols[this.tileXYToKey(tileX, tileY)];
    }

    getSymobls(callback, scope) {
        var board = this.board;
        var tileXY, symbol
        var width = board.width,
            height = board.height;
        for (var i = 0, cnt = this.symbols.length; i < cnt; i++) {
            symbol = this.symbols[i];
            tileXY = this.keyToTileXY(i);
            if (scope) {
                callback.call(scope, tileXY, symbol, board);
            } else {
                callback(tileXY, symbol, board);
            }
        }
        return this;
    }

    refreshSymbols(callback, scope) {
        var board = this.board;
        var width = board.width,
            height = board.height;
        this.symbols.length = width * height;
        var tileXY;
        for (var i = 0, cnt = this.symbols.length; i < cnt; i++) {
            tileXY = this.keyToTileXY(i);
            this.setSymbol(tileXY.x, tileXY.y, callback, scope);
        }
        return this;
    }

    setWildcard(symbol) {
        this.wildcard = symbol;
        return this;
    }

    tileXYToKey(tileX, tileY) {
        return tileX + (tileY * this.board.width);
    }

    keyToTileXY(key, out) {
        if (out === undefined) {
            out = tmp;
        }
        var width = this.board.width;
        out.x = key % width;
        out.y = Math.floor(key / width);
        return out;
    }
}

var tmp = {
    x: 0,
    y: 0
};

var methods = {
    match: MatchBoard,
    matchAt: MatchAt,
    matchAtDir: MatchAtDir,
};
Object.assign(
    Match.prototype,
    methods
);

const DIRMASKMODE = {
    'x': 0,
    'y': 1
}


export default Match;