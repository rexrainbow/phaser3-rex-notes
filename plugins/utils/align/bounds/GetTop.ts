import { GetDisplayHeight } from '../../size/GetDisplaySize';

var GetTop = function(gameObject?: any) {
    var height = GetDisplayHeight(gameObject);
    return gameObject.y - (height * gameObject.originY);
};

export default GetTop;