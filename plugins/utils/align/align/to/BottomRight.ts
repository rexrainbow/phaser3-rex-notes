import GetBottom from '../../bounds/GetBottom';
import GetRight from '../../bounds/GetRight';
import SetRight from '../../bounds/SetRight';
import SetTop from '../../bounds/SetTop';

var BottomRight = function(gameObject?: any, alignTo?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetRight(alignTo) + offsetX);
    SetTop(gameObject, GetBottom(alignTo) + offsetY);

    return gameObject;
};

export default BottomRight;