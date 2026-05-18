import GetLeft from '../../bounds/GetLeft';
import GetTop from '../../bounds/GetTop';
import SetBottom from '../../bounds/SetBottom';
import SetLeft from '../../bounds/SetLeft';

var TopLeft = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetLeft(alignTo) - offsetX);
    SetBottom(gameObject, GetTop(alignTo) - offsetY);

    return gameObject;
};

export default TopLeft;