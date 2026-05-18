import { GetDisplayHeight } from '../../size/GetDisplaySize';

var GetCenterY = function(gameObject?: any) {
    var height = GetDisplayHeight(gameObject);
    return gameObject.y - (height * gameObject.originY) + (height * 0.5);
};

export default GetCenterY;