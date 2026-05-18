import { GetDisplayHeight } from '../../size/GetDisplaySize';

var GetBottom = function(gameObject?: any) {
    var height = GetDisplayHeight(gameObject);
    return (gameObject.y + height) - (height * gameObject.originY);
};

export default GetBottom;