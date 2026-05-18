import GetCenterY from '../../bounds/GetCenterY';
import GetLeft from '../../bounds/GetLeft';
import SetCenterY from '../../bounds/SetCenterY';
import SetLeft from '../../bounds/SetLeft';

var LeftCenter = function(gameObject?: any, alignIn?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetCenterY(gameObject, GetCenterY(alignIn) + offsetY);

    return gameObject;
};

export default LeftCenter;