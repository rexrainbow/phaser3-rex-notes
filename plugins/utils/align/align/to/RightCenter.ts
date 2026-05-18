import GetCenterY from '../../bounds/GetCenterY';
import GetRight from '../../bounds/GetRight';
import SetCenterY from '../../bounds/SetCenterY';
import SetLeft from '../../bounds/SetLeft';

var RightCenter = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetRight(alignTo) + offsetX);
    SetCenterY(gameObject, GetCenterY(alignTo) + offsetY);

    return gameObject;
};

export default RightCenter;