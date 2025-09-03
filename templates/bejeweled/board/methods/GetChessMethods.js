export default {
    getChessArray(out) {
        if (out === undefined) {
            out = [];
        }

        var board = this.board;
        var startX = 0;
        var endX = board.width - 1;
        var startY = board.height / 2;
        var endY = board.height - 1;

        var tileZ = this.chessTileZ;
        for (var tileY = startY; tileY <= endY; tileY++) {
            for (var tileX = startX; tileX <= endX; tileX++) {
                var chess = board.tileXYZToChess(tileX, tileY, tileZ);
                if (chess === null) {
                    continue;
                }
                out.push(chess);
            }
        }

        return out;
    },

    getChessArrayAtTileX(tileOX, out) {
        if (out === undefined) {
            out = [];
        }

        var board = this.board;
        var startX = 0;
        var endX = board.width - 1;
        if ((tileOX < startX) || (tileOX > endX)) {
            return out;
        }

        var startY = board.height / 2;
        var endY = board.height - 1;

        var tileZ = this.chessTileZ;
        for (var tileY = startY; tileY <= endY; tileY++) {
            var chess = board.tileXYZToChess(tileOX, tileY, tileZ);
            if (chess === null) {
                continue;
            }
            out.push(chess);
        }

        return out;
    },

    getChessArrayAtTileY(tileOY, out) {
        if (out === undefined) {
            out = [];
        }

        var board = this.board;
        var startY = board.height / 2;
        var endY = board.height - 1;
        if ((tileOY < startY) || (tileOY > endY)) {
            return out;
        }

        var startX = 0;
        var endX = board.width - 1;

        var tileZ = this.chessTileZ;
        for (var tileX = startX; tileX <= endX; tileX++) {
            var chess = board.tileXYZToChess(tileX, tileOY, tileZ);
            if (chess === null) {
                continue;
            }
            out.push(chess);
        }

        return out;
    },

    getChessArrayWithinTileRadius(tileOX, tileOY, rangeX, rangeY, out) {
        if (out === undefined) {
            out = [];
        }

        var board = this.board;
        var startX = 0;
        var endX = board.width - 1;
        var startY = board.height / 2;
        var endY = board.height - 1;

        var tileZ = this.chessTileZ;
        for (var tileY = startY; tileY <= endY; tileY++) {
            for (var tileX = startX; tileX <= endX; tileX++) {
                if ((Math.abs(tileX - tileOX) > rangeX) || (Math.abs(tileY - tileOY) > rangeY)) {
                    continue;
                }

                var chess = board.tileXYZToChess(tileX, tileY, tileZ);
                if (chess === null) {
                    continue;
                }

                out.push(chess);
            }
        }

        return out;
    },

    getChessArrayWithSymbol(symbol, out) {
        if (out === undefined) {
            out = [];
        }

        var board = this.board;
        var startX = 0;
        var endX = board.width - 1;
        var startY = board.height / 2;
        var endY = board.height - 1;

        var tileZ = this.chessTileZ;
        for (var tileY = startY; tileY <= endY; tileY++) {
            for (var tileX = startX; tileX <= endX; tileX++) {
                var chess = board.tileXYZToChess(tileX, tileY, tileZ);
                if (chess === null) {
                    continue;
                }

                if (chess.getData('symbol') !== symbol) {
                    continue;
                }

                out.push(chess);
            }
        }

        return out;
    },

    getNeighborChessAtAngle(chess, angle) {
        var direction = this.board.angleSnapToDirection(chess, angle);
        return this.getNeighborChessAtDirection(chess, direction);
    },

    getNeighborChessAtDirection(chess, direction) {
        var neighborTileXY = this.board.getNeighborTileXY(chess, direction);
        var neighborChess = (neighborTileXY) ?
            this.board.tileXYZToChess(neighborTileXY.x, neighborTileXY.y, this.chessTileZ) :
            null;
        return neighborChess;
    },
}