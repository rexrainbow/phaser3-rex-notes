export default {
    setBoardSize(width, height) {
        this.boardWrapper.setBoardWidth(width).setBoardHeight(height);
        return this;
    },

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

    worldXYToChess(worldX, worldY) {
        return this.boardWrapper.worldXYToChess(worldX, worldY);
    },

    tileXYToChess(tileX, tileY) {
        return this.boardWrapper.tileXYToChess(tileX, tileY);
    },

    getNeighborChessAtAngle(chess, angle) {
        return this.boardWrapper.getNeighborChessAtAngle(chess, angle);
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

    // Expose board instance
    getBoard() {
        return this.boardWrapper.board;
    },

    // Expose match instance
    getMatch() {
        return this.boardWrapper.match;
    }
}