import Wrap from '../../../utils/math/Wrap.js';

var GetWrapTileY = function (tileX, tileY) {
    if (this.wrapMode) {
        tileY = Wrap(tileY, 0, this.height);
    } else if ((!this.infinityMode) &&
        ((tileY < 0) || (tileY >= this.height))) {
        tileY = null;
    }
    return tileY;
}
export default GetWrapTileY;