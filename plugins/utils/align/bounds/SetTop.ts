import { GetDisplayHeight } from '../../size/GetDisplaySize';

var SetTop = function(gameObject?: any, value?: any) {
    var height = GetDisplayHeight(gameObject);
    gameObject.y = value + (height * gameObject.originY);
    return gameObject;
};

export default SetTop;