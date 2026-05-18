import { GetDisplayWidth } from '../../size/GetDisplaySize';

var GetLeft = function(gameObject?: any) {
    var width = GetDisplayWidth(gameObject);
    return gameObject.x - (width * gameObject.originX);
};

export default GetLeft;