import GetRight from '../../bounds/GetRight';
import GetTop from '../../bounds/GetTop';
import SetRight from '../../bounds/SetRight';
import SetTop from '../../bounds/SetTop';

var TopRight = function(gameObject?: any, alignIn?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetRight(gameObject, GetRight(alignIn) + offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);

    return gameObject;
};

export default TopRight;