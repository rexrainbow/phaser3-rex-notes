import { GetDisplayWidth } from '../../size/GetDisplaySize';

var SetRight = function(gameObject?: any, value?: any) {
    var width = GetDisplayWidth(gameObject);
    gameObject.x = (value - width) + (width * gameObject.originX);

    return gameObject;
};

export default SetRight;