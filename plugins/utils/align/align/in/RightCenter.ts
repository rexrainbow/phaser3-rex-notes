import GetCenterY from '../../bounds/GetCenterY';
import GetRight from '../../bounds/GetRight';
import SetCenterY from '../../bounds/SetCenterY';
import SetRight from '../../bounds/SetRight';

var RightCenter = function(gameObject?: any, alignIn?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);

    return gameObject;
};

export default RightCenter;