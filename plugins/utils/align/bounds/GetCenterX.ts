import { GetDisplayWidth } from '../../size/GetDisplaySize';

var GetCenterX = function(gameObject?: any) {
    var width = GetDisplayWidth(gameObject);
    return gameObject.x - (width * gameObject.originX) + (width * 0.5);
};

export default GetCenterX;