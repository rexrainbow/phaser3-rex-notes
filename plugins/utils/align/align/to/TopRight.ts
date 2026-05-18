import GetRight from '../../bounds/GetRight';
import GetTop from '../../bounds/GetTop';
import SetBottom from '../../bounds/SetBottom';
import SetRight from '../../bounds/SetRight';

var TopRight = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetRight(alignTo) + offsetX);
    SetBottom(gameObject, GetTop(alignTo) - offsetY);

    return gameObject;
};

export default TopRight;