import SetCenterX from './SetCenterX';
import SetCenterY from './SetCenterY';

var CenterOn = function(gameObject?: any, x?: any, y?: any) {
    SetCenterX(gameObject, x);
    return SetCenterY(gameObject, y);
};

export default CenterOn;