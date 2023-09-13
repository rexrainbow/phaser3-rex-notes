import GetWhiteFrame from './GetWhiteFrame.js';

var DynamicTextureClearRectangle = function (texture, x, y, width, height) {
    if (WhiteFrameWidth === undefined) {
        var whiteFrame = GetWhiteFrame(texture.manager.game);
        WhiteFrameWidth = whiteFrame.cutWidth;
        WhiteFrameHeight = whiteFrame.cutHeight;
    }

    texture.stamp('__WHITE', undefined, x, y, {
        scaleX: width / WhiteFrameWidth,
        scaleY: height / WhiteFrameHeight,
        originX: 0,
        originY: 0,
        erase: true,
    })

    return texture;
}

var WhiteFrameWidth;
var WhiteFrameHeight;

export default DynamicTextureClearRectangle;