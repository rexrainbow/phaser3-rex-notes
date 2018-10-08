var AddChess = function (gameObject, tileX, tileY, tileZ) {
    var gird = this.board.grid;
    gird.saveOrigin();
    gird.setOriginPosition(this.x, this.y);

    this.board.addChess(gameObject, tileX, tileY, tileZ, true);
    this.add(gameObject);

    gird.restoreOrigin();
    return this;
}

export default AddChess;