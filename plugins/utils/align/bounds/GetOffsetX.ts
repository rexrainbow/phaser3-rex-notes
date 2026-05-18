import { GetDisplayWidth } from '../../size/GetDisplaySize';

var GetOffsetX = function(gameObject?: any) {
    var width = GetDisplayWidth(gameObject);
    return width * gameObject.originX;
};

export default GetOffsetX;