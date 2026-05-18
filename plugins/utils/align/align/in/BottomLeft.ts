import GetBottom from '../../bounds/GetBottom';
import GetLeft from '../../bounds/GetLeft';
import SetBottom from '../../bounds/SetBottom';
import SetLeft from '../../bounds/SetLeft';

var BottomLeft = function(gameObject?: any, alignIn?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetBottom(gameObject, GetBottom(alignIn) + offsetY);

    return gameObject;
};

export default BottomLeft;