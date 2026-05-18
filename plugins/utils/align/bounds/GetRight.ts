import { GetDisplayWidth } from '../../size/GetDisplaySize';

var GetRight = function(gameObject?: any) {
    var width = GetDisplayWidth(gameObject);
    return (gameObject.x + width) - (width * gameObject.originX);
};

export default GetRight;