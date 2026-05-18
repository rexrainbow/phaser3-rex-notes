import GetCenterY from '../../bounds/GetCenterY';
import GetLeft from '../../bounds/GetLeft';
import SetCenterY from '../../bounds/SetCenterY';
import SetRight from '../../bounds/SetRight';

var LeftCenter = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetLeft(alignTo) - offsetX);
    SetCenterY(gameObject, GetCenterY(alignTo) + offsetY);

    return gameObject;
};

export default LeftCenter;