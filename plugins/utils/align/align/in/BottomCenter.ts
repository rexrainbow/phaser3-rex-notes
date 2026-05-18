import GetBottom from '../../bounds/GetBottom';
import GetCenterX from '../../bounds/GetCenterX';
import SetBottom from '../../bounds/SetBottom';
import SetCenterX from '../../bounds/SetCenterX';

var BottomCenter = function(gameObject?: any, alignIn?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);

    return gameObject;
};

export default BottomCenter;