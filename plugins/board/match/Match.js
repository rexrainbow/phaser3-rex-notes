import IsFunction from 'rexPlugins/utils/object/IsFunction.js';
import MatchHexagon from './MatchHexagon.js';
import MatchQuad from './MatchQuad.js';
import MatchAt from './MatchAt.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Match {
    constructor(config) {
        this.symbols = []; // tileX+(tileY*board.width)
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setBoard(GetValue(o, 'board', undefined));
        this.setWildcard(GetValue(o, 'wildcard', undefined));
        this.clearSymbols();
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

    match(pattern, getFirst, callback, scope) {
        var directions = this.board.grid.directions;
        switch (directions) {
            case 4:
            case 8:
                this.matchQuad(pattern, getFirst, callback, scope);
                break;
            case 6:
                this.matchHexagon(pattern, getFirst, callback, scope);
                break;
        }
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
    matchHexagon: MatchHexagon,
    matchQuad: MatchQuad,
    matchAt: MatchAt,
}
Object.assign(
    Match.prototype,
    methods
);


export default Match;