import GetRight from '../../bounds/GetRight';
import GetTop from '../../bounds/GetTop';
import SetLeft from '../../bounds/SetLeft';
import SetTop from '../../bounds/SetTop';

var RightTop = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetRight(alignTo) + offsetX);
    SetTop(gameObject, GetTop(alignTo) - offsetY);

    return gameObject;
};

export default RightTop;