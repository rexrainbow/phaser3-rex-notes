import IsPlainObject from '../../utils/object/IsPlainObject.js';

var IsTileXYZ = function (tileXYZ) {
    return IsPlainObject(tileXYZ) &&
        tileXYZ.hasOwnProperty('x') &&
        tileXYZ.hasOwnProperty('y') &&
        tileXYZ.hasOwnProperty('z');
}

export default IsTileXYZ;