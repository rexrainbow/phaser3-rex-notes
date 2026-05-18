import GetLeft from '../../bounds/GetLeft';
import GetTop from '../../bounds/GetTop';
import SetLeft from '../../bounds/SetLeft';
import SetTop from '../../bounds/SetTop';

var TopLeft = function(gameObject?: any, alignIn?: any, offsetX?: any, offsetY?: any) {
    if (offsetX === undefined) { offsetX = 0; }
    if (offsetY === undefined) { offsetY = 0; }

    SetLeft(gameObject, GetLeft(alignIn) - offsetX);
    SetTop(gameObject, GetTop(alignIn) - offsetY);

    return gameObject;
};

export default TopLeft;