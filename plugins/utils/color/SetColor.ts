const MaskR = (~(0xff << 16) & 0xffffff);
const MaskG = (~(0xff << 8) & 0xffffff);
const MaskB = (~(0xff) & 0xffffff);

var SetR = function(colorInt?: any, r?: any) {
    return ((r & 0xff) << 16) | (colorInt & MaskR);
}

var SetG = function(colorInt?: any, g?: any) {
    return ((g & 0xff) << 8) | (colorInt & MaskG);
}

var SetB = function(colorInt?: any, b?: any) {
    return (b & 0xff) | (colorInt & MaskB);
}

var SetRGB = function(colorInt?: any, r?: any, g?: any, b?: any) {
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | ((b & 0xff));
}

export {
    SetR, SetG, SetB, SetRGB
}