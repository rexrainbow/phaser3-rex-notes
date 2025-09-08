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

    getChessArrayWithinTileRadius(tileX, tileY, rangeX, rangeY, out) {
        return this.boardWrapper.getChessArrayWithinTileRadius(tileX, tileY, rangeX, rangeY, out);
    },

    getChessArrayWithSymbol(symbol, out) {
        return this.boardWrapper.getChessArrayWithSymbol(symbol, out);
    },

    // Create chess
    createChess(tileX, tileY, symbols) {
        return this.boardWrapper.createChess(tileX, tileY, symbols);
    },

    // Chess symbol
    getSymbolAt(tileX, tileY) {
        return this.boardWrapper.getSymbolAt(tileX, tileY);
    },

    setSymbolAt(tileX, tileY, newSymbol) {
        this.boardWrapper.setSymbolAt(tileX, tileY, newSymbol);
    },

    // Symbols of activate area
    dumpSymbols() {
        return this.boardWrapper.dumpSymbols();
    },

    loadSymbols(symbols) {
        this.boardWrapper.setInitSymbols(symbols);
        this.mainState.goto('RESET');
        return this;
    },

    // After picking piece
    setEliminatingChess(chessArray) {
        if (!Array.isArray(chessArray)) {
            chessArray = [chessArray];
        }
        this.mainState.setEliminatingChess(chessArray);
        return this;
    },

    // Match accept/ignore list
    setMatchAcceptList(acceptList) {
        this.boardWrapper.setMatchAcceptList(acceptList);
        return this;
    },
    setMatchIgnoreList(ignoreList) {
        this.boardWrapper.setMatchIgnoreList(ignoreList);
        return this;
    },

    // Rectangle of board's bounds
    getBoardBounds(out) {
        return this.boardWrapper.getBoardBounds(out);
    },

    // Expose board instance
    getBoard() {
        return this.boardWrapper.board;
    },

    // Expose match instance
    getMatch() {
        return this.boardWrapper.match;
    },

    // Expose Layer instance
    getLayer() {
        return this.boardWrapper.layer;
    }

}