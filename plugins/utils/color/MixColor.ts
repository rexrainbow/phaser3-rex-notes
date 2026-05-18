import Linear from '../math/Linear';
import { GetR, GetG, GetB } from './GetRGB';

var MixColor = function(color0?: any, color1?: any, t?: any) {
    var r = Linear(GetR(color0), GetR(color1), t);
    var g = Linear(GetG(color0), GetG(color1), t);
    var b = Linear(GetB(color0), GetB(color1), t);
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff));
}

export default MixColor;