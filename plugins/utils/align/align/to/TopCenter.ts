import GetCenterX from '../../bounds/GetCenterX';
import GetTop from '../../bounds/GetTop';
import SetBottom from '../../bounds/SetBottom';
import SetCenterX from '../../bounds/SetCenterX';

var TopCenter = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetCenterX(gameObject, GetCenterX(alignTo) + offsetX);
    SetBottom(gameObject, GetTop(alignTo) - offsetY);

    return gameObject;
};

export default TopCenter;