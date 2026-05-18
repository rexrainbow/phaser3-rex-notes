import CenterOn from '../../bounds/CenterOn';
import GetCenterX from '../../bounds/GetCenterX';
import GetCenterY from '../../bounds/GetCenterY';

var Center = function(gameObject?: any, alignIn?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    CenterOn(gameObject, GetCenterX(alignIn) + offsetX, GetCenterY(alignIn) + offsetY);

    return gameObject;
};

export default Center;