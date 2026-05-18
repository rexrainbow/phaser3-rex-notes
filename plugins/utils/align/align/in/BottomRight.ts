import GetBottom from '../../bounds/GetBottom';
import GetRight from '../../bounds/GetRight';
import SetBottom from '../../bounds/SetBottom';
import SetRight from '../../bounds/SetRight';

var BottomRight = function(gameObject?: any, alignIn?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);

    return gameObject;
};

export default BottomRight;