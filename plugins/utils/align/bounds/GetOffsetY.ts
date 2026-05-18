import { GetDisplayHeight } from '../../size/GetDisplaySize';

var GetOffsetY = function(gameObject?: any) {
    var height = GetDisplayHeight(gameObject);
    return height * gameObject.originY;
};

export default GetOffsetY;