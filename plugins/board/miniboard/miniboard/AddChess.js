var AddChess = function (gameObject, tileX, tileY, tileZ) {
    this.board.addChess(gameObject, tileX, tileY, tileZ, true);
    this.add(gameObject);
    return this;
}

export default AddChess;