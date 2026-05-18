import { GetDisplayHeight } from '../../size/GetDisplaySize';

var SetBottom = function(gameObject?: any, value?: any) {
    var height = GetDisplayHeight(gameObject);
    gameObject.y = (value - height) + (height * gameObject.originY);
    return gameObject;
};

export default SetBottom;