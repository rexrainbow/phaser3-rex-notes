import { Geom as PhaserGeom } from 'phaser';
var Rectangle = PhaserGeom.Rectangle;
var GetBoardBounds = function (out) {
    if (out === undefined) {
        out = new Rectangle();
    }

    var board = this.board;
    var grid = board.grid;

    var worldTL = board.tileXYToWorldXY(1, 1);
    var x = worldTL.x - (grid.width / 2);
    var y = worldTL.y - (grid.height / 2);
    var width = this.activateBoardWidth * grid.width;
    var height = this.activateBoardHeight * grid.height;
    out.setTo(x, y, width, height);

    return out;
}

export default GetBoardBounds;