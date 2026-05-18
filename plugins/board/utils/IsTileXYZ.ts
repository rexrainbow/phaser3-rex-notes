import IsPlainObject from '../../utils/object/IsPlainObject';

var IsTileXYZ = function(obj?: any) {
    return (obj) &&
        (IsPlainObject(obj) || obj.isTileXYZ);
}

export default IsTileXYZ;