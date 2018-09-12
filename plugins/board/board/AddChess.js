var AddChess = function (gameObject, tileX, tileY, tileZ, align) {
    if (tileZ === undefined) {
        tileZ = 0;
    }

    if (!this.contains(tileX, tileY)) {
        return this;
    }

    this.removeChess(gameObject);
    this.removeChess(false, tileX, tileY, tileZ);
    this.boardData.addUID(this.getChessUID(gameObject), tileX, tileY, tileZ);
    this.getChessData(gameObject).setBoard(this);

    if (align) {
        this.gridAlign(gameObject);
    }

    return this;
};

export default AddChess;