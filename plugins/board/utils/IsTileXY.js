import IsPlainObject from '../../utils/object/IsPlainObject.js';

var IsTileXYZ = function (tileXY) {
    return IsPlainObject(tileXY) &&
        tileXY.hasOwnProperty('x') &&
        tileXY.hasOwnProperty('y');
}

export default IsTileXYZ;