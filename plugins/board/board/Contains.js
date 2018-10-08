var Contains = function (tileX, tileY, tileZ) {
    var result = this.isInside(tileX, tileY);
    if (result && (tileZ != null)) {
        result = this.boardData.contains(tileX, tileY, tileZ);
    }
    return result;
};

export default Contains;