import Wrap from '../../../utils/math/Wrap.js';

var GetWrapTileX = function (tileX, tileY) {
    if (this.wrapMode) {
        tileX = Wrap(tileX, 0, this.width);
    } else if ((!this.infinityMode) &&
        ((tileX < 0) || (tileX >= this.width))) {
        tileX = null;
    }
    return tileX;
}
export default GetWrapTileX;