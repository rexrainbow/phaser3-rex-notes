var Rectangle = Phaser.Geom.Rectangle;
var GetBoardBounds = function (out) {
    if (out === undefined) {
        out = new Rectangle();
    }

    var board = this.board;
    var grid = board.grid;

    var worldTL = board.tileXYToWorldXY(0, board.height / 2);
    var x = worldTL.x - (grid.width / 2);
    var y = worldTL.y - (grid.height / 2);
    var width = this.activateBoardWidth * grid.width;
    var height = this.activateBoardHeight * grid.height;
    out.setTo(x, y, width, height);

    return out;
}

export default GetBoardBounds;