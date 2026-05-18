export default {
    // Board size
    setActivateBoardSize(width?: any, height?: any) {
        this.boardWrapper.setActivateWidth(width).setActivateHeight(height);
        return this;
    },

    // Chess properties
    getChessMoveTo(chess?: any) {
        return (chess) ? chess.rexMoveTo : undefined;
    },

    getChessTileZ() {
        return this.boardWrapper.chessTileZ;
    },

    chessToTileXY(chess?: any) {
        return this.boardWrapper.chessToTileXYZ(chess);
    },

    worldXYToChess(worldX?: any, worldY?: any) {
        return this.boardWrapper.worldXYToChess(worldX, worldY);
    },

    tileXYToChess(tileX?: any, tileY?: any) {
        return this.boardWrapper.tileXYToChess(tileX, tileY);
    },

    // Get chess
    getNeighborChessAtAngle(chess?: any, angle?: any) {
        return this.boardWrapper.getNeighborChessAtAngle(chess, angle);
    },

    getNeighborChessAtDirection(chess?: any, direction?: any) {
        return this.boardWrapper.getNeighborChessAtDirection(chess, direction);
    },

    getChessArray(out?: any) {
        return this.boardWrapper.getChessArray(out);
    },

    getChessArrayAtTileX(tileX?: any, out?: any) {
        return this.boardWrapper.getChessArrayAtTileX(tileX, out);
    },

    getChessArrayAtTileY(tileY?: any, out?: any) {
        return this.boardWrapper.getChessArrayAtTileY(tileY, out);
    },

    getChessArrayAtTileXYInRange(tileX?: any, tileY?: any, rangeX?: any, rangeY?: any, out?: any) {
        return this.boardWrapper.getChessArrayAtTileXYInRange(tileX, tileY, rangeX, rangeY, out);
    },

    getNeighborChessAtDirection(chess?: any, direction?: any) {
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

    loadSymbols(symbols?: any) {
        this.boardWrapper.setInitSymbols(symbols);
        this.mainState.goto('RESET');
        return this;
    },

    // Moving 
    setMovingDirection(direction?: any) {
        this.boardWrapper.setMovingDirection(direction);
        return this;
    },

    getMovingDirection() {
        return this.boardWrapper.movingDirection;
    },

    // After picking piece
    setEliminatingChess(chessArray?: any) {
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