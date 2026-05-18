import Wrap from '../../math/Wrap';

var Rotate = function(src?: any, dir?: any, out?: any) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globTileXY;
    }

    dir = Wrap(dir, 0, 3);
    var newTileX;
    var newTileY;
    switch (dir?: any) {
        case 1:
            newTileX = -src.y;
            newTileY = src.x;
            break;
        case 2:
            newTileX = -src.x;
            newTileY = -src.y;
            break;
        case 3:
            newTileX = src.y;
            newTileY = -src.x;
            break;
        default:
            newTileX = src.x;
            newTileY = src.y;
            break;
    }
    // TODO: staggered?
    out.x = newTileX;
    out.y = newTileY;
    return out;
}

var globTileXY = {};
export default Rotate;