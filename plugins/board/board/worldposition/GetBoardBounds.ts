import Rectangle from '../../../utils/geom/rectangle/Rectangle';
import Union from '../../../utils/geom/rectangle/Union';

var GetBoardBounds = function(out?: any) {
    if (out === undefined) {
        out = new Rectangle();
    } else if (out === true) {
        out = globalBounds;
    }

    var isFirstTile = true;
    this.forEachTileXY(function(tileXY?: any, board?: any) {
        var tileBounds = board.getGridBounds(tileXY.x, tileXY.y, true);
        if (isFirstTile?: any) {
            out.setTo(tileBounds.x, tileBounds.y, tileBounds.width, tileBounds.height);
            isFirstTile = false;
        } else {
            out = Union(out, tileBounds, out);
        }
    });

    return out;
}

var globalBounds = new Rectangle();

export default GetBoardBounds;