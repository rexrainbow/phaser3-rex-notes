import { GetDisplayWidth } from '../../size/GetDisplaySize';

var SetLeft = function(gameObject?: any, value?: any) {
    var width = GetDisplayWidth(gameObject);
    gameObject.x = value + (width * gameObject.originX);
    return gameObject;
};

export default SetLeft;