var PutBack = function () {
    var mainboard = this.lastMainBoardRef.mainboard;
    var tileX = this.lastMainBoardRef.tileX;
    var tileY = this.lastMainBoardRef.tileY;
    this.putOnMainBoard(mainboard, tileX, tileY);
    return this;
}
export default PutBack;