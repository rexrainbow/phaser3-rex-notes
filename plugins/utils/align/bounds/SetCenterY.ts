import { GetDisplayHeight } from '../../size/GetDisplaySize';

var SetCenterY = function(gameObject?: any, y?: any) {
    var height = GetDisplayHeight(gameObject);
    var offsetY = height * gameObject.originY;
    gameObject.y = (y + offsetY) - (height * 0.5);

    return gameObject;
};

export default SetCenterY;