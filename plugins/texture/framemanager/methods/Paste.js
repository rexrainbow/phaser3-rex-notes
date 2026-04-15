import { GetDisplayWidth, GetDisplayHeight } from '../../../utils/size/GetDisplaySize.js';

var PI2 = Math.PI * 2;
var RIGHT_ANGLE_EPSILON = 0.000001;

var NormalizeRotation = function (rotation) {
    if (rotation === undefined) {
        rotation = 0;
    }

    rotation = rotation % PI2;
    if (rotation < 0) {
        rotation += PI2;
    }

    return rotation;
}

var NeedRotatedBounds = function (rotation) {
    rotation = NormalizeRotation(rotation);

    return (
        (Math.abs(Math.sin(rotation)) > RIGHT_ANGLE_EPSILON) &&
        (Math.abs(Math.cos(rotation)) > RIGHT_ANGLE_EPSILON)
    );
}

var GetAxisAlignedBounds = function (width, height, originX, originY, rotation, out) {
    if (out === undefined) {
        out = {};
    }

    rotation = NormalizeRotation(rotation);

    var sin = Math.sin(rotation);
    var cos = Math.cos(rotation);

    if (Math.abs(sin) <= RIGHT_ANGLE_EPSILON) {
        out.width = width;
        out.height = height;

        if (cos >= 0) {
            out.x = originX * width;
            out.y = originY * height;
        } else {
            out.x = (1 - originX) * width;
            out.y = (1 - originY) * height;
        }
    } else {
        out.width = height;
        out.height = width;

        if (sin > 0) {
            out.x = (1 - originY) * height;
            out.y = originX * width;
        } else {
            out.x = originY * height;
            out.y = (1 - originX) * width;
        }
    }

    return out;
}

var GetRotatedBounds = function (width, height, originX, originY, rotation, out) {
    if (out === undefined) {
        out = {};
    }

    var left = -originX * width;
    var right = left + width;
    var top = -originY * height;
    var bottom = top + height;

    var cos = Math.cos(rotation);
    var sin = Math.sin(rotation);

    var x0 = (left * cos) - (top * sin);
    var y0 = (left * sin) + (top * cos);
    var x1 = (right * cos) - (top * sin);
    var y1 = (right * sin) + (top * cos);
    var x2 = (right * cos) - (bottom * sin);
    var y2 = (right * sin) + (bottom * cos);
    var x3 = (left * cos) - (bottom * sin);
    var y3 = (left * sin) + (bottom * cos);

    var minX = Math.min(x0, x1, x2, x3);
    var minY = Math.min(y0, y1, y2, y3);
    var maxX = Math.max(x0, x1, x2, x3);
    var maxY = Math.max(y0, y1, y2, y3);

    out.x = -minX;
    out.y = -minY;
    out.width = maxX - minX;
    out.height = maxY - minY;

    return out;
}

var Paste = function (frameName, gameObject) {
    var srcWidth = Math.abs(GetDisplayWidth(gameObject)),
        srcHeight = Math.abs(GetDisplayHeight(gameObject));
    var rotation = (gameObject.rotation !== undefined) ? gameObject.rotation : 0;
    var originX = (gameObject.originX !== undefined) ? gameObject.originX : 0;
    var originY = (gameObject.originY !== undefined) ? gameObject.originY : 0;
    var alpha = (gameObject.alpha !== undefined) ? gameObject.alpha : 1;
    var flipX = !!gameObject.flipX;
    var flipY = !!gameObject.flipY;
    var needRotatedBounds = NeedRotatedBounds(rotation);

    var bounds = {};
    if (needRotatedBounds) {
        GetRotatedBounds(srcWidth, srcHeight, originX, originY, rotation, bounds);
    } else {
        GetAxisAlignedBounds(srcWidth, srcHeight, originX, originY, rotation, bounds);
    }

    var fitScale = Math.max((bounds.width / this.cellWidth), (bounds.height / this.cellHeight), 1);
    var drawWidth = srcWidth / fitScale;
    var drawHeight = srcHeight / fitScale;

    if (needRotatedBounds) {
        GetRotatedBounds(drawWidth, drawHeight, originX, originY, rotation, bounds);
    } else {
        GetAxisAlignedBounds(drawWidth, drawHeight, originX, originY, rotation, bounds);
    }

    var drawCallback;
    if (this.useDynamicTexture) {
        var scaleX = ((gameObject.scaleX !== undefined) ? gameObject.scaleX : 1) / fitScale;
        var scaleY = ((gameObject.scaleY !== undefined) ? gameObject.scaleY : 1) / fitScale;
        if (flipX) {
            scaleX *= -1;
        }
        if (flipY) {
            scaleY *= -1;
        }

        drawCallback = function (texture, frameSize) {
            frameSize.width = bounds.width;
            frameSize.height = bounds.height;

            texture.capture(gameObject, {
                x: bounds.x,
                y: bounds.y,
                rotation: rotation,
                originX: originX,
                originY: originY,
                scaleX: scaleX,
                scaleY: scaleY
            });
        }

    } else {
        var drawX = bounds.x;
        var drawY = bounds.y;
        var left = -originX * drawWidth;
        var top = -originY * drawHeight;
        var flipScaleX = (((gameObject.scaleX !== undefined) && (gameObject.scaleX < 0)) !== flipX) ? -1 : 1;
        var flipScaleY = (((gameObject.scaleY !== undefined) && (gameObject.scaleY < 0)) !== flipY) ? -1 : 1;

        var srcCanvas = gameObject.canvas;
        var srcFrame = gameObject.frame;
        if (srcCanvas || srcFrame) {
            drawCallback = function (canvas, context, frameSize) {
                frameSize.width = bounds.width;
                frameSize.height = bounds.height;

                context.save();
                context.globalAlpha = alpha;
                context.translate(drawX, drawY);
                context.rotate(rotation);
                context.scale(flipScaleX, flipScaleY);

                if (srcCanvas) {
                    context.drawImage(srcCanvas, left, top, drawWidth, drawHeight);
                } else {
                    context.drawImage(
                        srcFrame.source.image,
                        srcFrame.cutX, srcFrame.cutY, srcFrame.cutWidth, srcFrame.cutHeight,
                        left, top, drawWidth, drawHeight
                    );
                }

                context.restore();
            }

        } else {
            console.warn(`Can't get content from game object.`);
            return this;
        }

    }

    this.draw(frameName, drawCallback);

    return this;
}

export default Paste;
