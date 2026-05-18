import GetBottom from '../../bounds/GetBottom';
import GetLeft from '../../bounds/GetLeft';
import SetLeft from '../../bounds/SetLeft';
import SetTop from '../../bounds/SetTop';

var BottomLeft = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetLeft(alignTo) - offsetX);
    SetTop(gameObject, GetBottom(alignTo) + offsetY);

    return gameObject;
};

export default BottomLeft;