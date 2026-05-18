import GetBottom from '../../bounds/GetBottom';
import GetRight from '../../bounds/GetRight';
import SetBottom from '../../bounds/SetBottom';
import SetLeft from '../../bounds/SetLeft';

var RightBottom = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetRight(alignTo) + offsetX);
    SetBottom(gameObject, GetBottom(alignTo) + offsetY);

    return gameObject;
};

export default RightBottom;