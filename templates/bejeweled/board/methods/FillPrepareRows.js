var FillPrepareRows = function () {
    var board = this.board;
    var height = board.height;
    var startY = 0;
    var endY = (height / 2) - 1;
    var chessTileZ = this.chessTileZ;
    for (var tileY = startY; tileY <= endY; tileY++) {
        for (var tileX = 0, width = board.width; tileX < width; tileX++) {
            if (board.contains(tileX, tileY, chessTileZ)) { // not empty                
                continue;
            }

            this.createChess(tileX, tileY, this.candidateSymbols);
        }
    }
}
export default FillPrepareRows;