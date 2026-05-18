import GetLeft from '../../bounds/GetLeft';
import GetTop from '../../bounds/GetTop';
import SetRight from '../../bounds/SetRight';
import SetTop from '../../bounds/SetTop';

var LeftTop = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetLeft(alignTo) - offsetX);
    SetTop(gameObject, GetTop(alignTo) - offsetY);

    return gameObject;
};

export default LeftTop;