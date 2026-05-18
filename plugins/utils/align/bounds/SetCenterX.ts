import { GetDisplayWidth } from '../../size/GetDisplaySize';

var SetCenterX = function(gameObject?: any, x?: any) {
    var width = GetDisplayWidth(gameObject);
    var offsetX = width * gameObject.originX;
    gameObject.x = (x + offsetX) - (width * 0.5);

    return gameObject;
};

export default SetCenterX;