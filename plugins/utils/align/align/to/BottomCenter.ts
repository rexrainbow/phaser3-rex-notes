import GetBottom from '../../bounds/GetBottom';
import GetCenterX from '../../bounds/GetCenterX';
import SetCenterX from '../../bounds/SetCenterX';
import SetTop from '../../bounds/SetTop';

var BottomCenter = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetCenterX(gameObject, GetCenterX(alignTo) + offsetX);
    SetTop(gameObject, GetBottom(alignTo) + offsetY);

    return gameObject;
};

export default BottomCenter;