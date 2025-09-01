export default {
    // Board size
    setActivateBoardSize(width, height) {
        this.boardWrapper.setActivateWidth(width).setActivateHeight(height);
        return this;
    },

    // Chess properties
    getChessMoveTo(chess) {
        return (chess) ? chess.rexMoveTo : undefined;
    },

    getChessTileZ() {
        return this.boardWrapper.chessTileZ;
    },

    chessToTileXY(chess) {
        return this.boardWrapper.chessToTileXYZ(chess);
    },

    worldXYToChess(worldX, worldY) {
        return this.boardWrapper.worldXYToChess(worldX, worldY);
    },

    tileXYToChess(tileX, tileY) {
        return this.boardWrapper.tileXYToChess(tileX, tileY);
    },

    // Get chess
    getNeighborChessAtAngle(chess, angle) {
        return this.boardWrapper.getNeighborChessAtAngle(chess, angle);
    },

    getNeighborChessAtDirection(chess, direction) {
        return this.boardWrapper.getNeighborChessAtDirection(chess, direction);
    },

    getChessArray(out) {
        return this.boardWrapper.getChessArray(out);
    },

    getChessArrayAtTileX(tileX, out) {
        return this.boardWrapper.getChessArrayAtTileX(tileX, out);
    },

    getChessArrayAtTileY(tileY, out) {
        return this.boardWrapper.getChessArrayAtTileY(tileY, out);
    },

    getChessArrayAtTileXYInRange(tileX, tileY, rangeX, rangeY, out) {
        return this.boardWrapper.getChessArrayAtTileXYInRange(tileX, tileY, rangeX, rangeY, out);
    },

    getNeighborChessAtDirection(chess, direction) {
        return this.boardWrapper.getNeighborChessAtDirection(chess, direction);
    },

    // State
    isAwaitingInput() {
        return this.mainState.state === 'SELECT1START';
    },

    // Symbols
    dumpSymbols() {
        return this.boardWrapper.dumpSymbols();
    },

    loadSymbols(symbols) {
        this.boardWrapper.setInitSymbols(symbols);
        this.mainState.goto('RESET');
        return this;
    },

    // Moving 
    setMovingDirection(direction) {
        this.boardWrapper.setMovingDirection(direction);
        return this;
    },

    getMovingDirection() {
        return this.boardWrapper.movingDirection;
    },

    // After picking piece
    setEliminatingChess(chessArray) {
        if (!Array.isArray(chessArray)) {
            chessArray = [chessArray];
        }
        this.mainState.setEliminatingChess(chessArray);
        return this;
    },

    // Expose board instance
    getBoard() {
        return this.boardWrapper.board;
    },

    // Expose match instance
    getMatch() {
        return this.boardWrapper.match;
    }
}