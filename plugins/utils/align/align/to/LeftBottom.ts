import GetBottom from '../../bounds/GetBottom';
import GetLeft from '../../bounds/GetLeft';
import SetBottom from '../../bounds/SetBottom';
import SetRight from '../../bounds/SetRight';

var LeftBottom = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetLeft(alignTo) - offsetX);
    SetBottom(gameObject, GetBottom(alignTo) + offsetY);

    return gameObject;
};

export default LeftBottom;