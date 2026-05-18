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

    getChessArrayWithinTileRadius(tileX?: any, tileY?: any, rangeX?: any, rangeY?: any, out?: any) {
        return this.boardWrapper.getChessArrayWithinTileRadius(tileX, tileY, rangeX, rangeY, out);
    },

    getChessArrayWithSymbol(symbol?: any, out?: any) {
        return this.boardWrapper.getChessArrayWithSymbol(symbol, out);
    },

    // Create chess
    createChess(tileX?: any, tileY?: any, symbols?: any) {
        return this.boardWrapper.createChess(tileX, tileY, symbols);
    },

    // Chess symbol
    getSymbolAt(tileX?: any, tileY?: any) {
        return this.boardWrapper.getSymbolAt(tileX, tileY);
    },

    setSymbolAt(tileX?: any, tileY?: any, newSymbol?: any) {
        this.boardWrapper.setSymbolAt(tileX, tileY, newSymbol);
    },

    // Symbols of activate area
    dumpSymbols() {
        return this.boardWrapper.dumpSymbols();
    },

    loadSymbols(symbols?: any) {
        this.boardWrapper.setInitSymbols(symbols);
        this.mainState.goto('RESET');
        return this;
    },

    // After picking piece
    setEliminatingChess(chessArray?: any) {
        if (!Array.isArray(chessArray)) {
            chessArray = [chessArray];
        }
        this.mainState.setEliminatingChess(chessArray);
        return this;
    },

    // Match accept/ignore list
    setMatchAcceptList(acceptList?: any) {
        this.boardWrapper.setMatchAcceptList(acceptList);
        return this;
    },
    setMatchIgnoreList(ignoreList?: any) {
        this.boardWrapper.setMatchIgnoreList(ignoreList);
        return this;
    },

    // Rectangle of board's bounds
    getBoardBounds(out?: any) {
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