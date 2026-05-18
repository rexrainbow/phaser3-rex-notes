import GetCenterX from '../../bounds/GetCenterX';
import GetTop from '../../bounds/GetTop';
import SetCenterX from '../../bounds/SetCenterX';
import SetTop from '../../bounds/SetTop';

var TopCenter = function(gameObject?: any, alignIn?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetCenterX(gameObject, GetCenterX(alignIn) + offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);

    return gameObject;
};

export default TopCenter;