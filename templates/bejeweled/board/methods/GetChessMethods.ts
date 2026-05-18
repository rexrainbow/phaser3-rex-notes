export default {
    getChessArray(out?: any) {
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

    getChessArrayAtTileX(tileOX?: any, out?: any) {
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

    getChessArrayAtTileY(tileOY?: any, out?: any) {
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

    getChessArrayWithinTileRadius(tileOX?: any, tileOY?: any, rangeX?: any, rangeY?: any, out?: any) {
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

    getChessArrayWithSymbol(symbol?: any, out?: any) {
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

    getNeighborChessAtAngle(chess?: any, angle?: any) {
        var direction = this.board.angleSnapToDirection(chess, angle);
        return this.getNeighborChessAtDirection(chess, direction);
    },

    getNeighborChessAtDirection(chess?: any, direction?: any) {
        var neighborTileXY = this.board.getNeighborTileXY(chess, direction);
        var neighborChess = (neighborTileXY) ?
            this.board.tileXYZToChess(neighborTileXY.x, neighborTileXY.y, this.chessTileZ) :
            null;
        return neighborChess;
    },
}