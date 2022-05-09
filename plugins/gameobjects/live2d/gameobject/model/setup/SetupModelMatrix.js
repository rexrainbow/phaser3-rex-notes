import GetLayoutSetting from './GetLayoutSetting.js';

const LOGICAL_WIDTH = 2;
const LOGICAL_HEIGHT = 2;

var SetupModelMatrix = function () {
    var canvasinfo = this._model._model.canvasinfo;
    var originalWidth = canvasinfo.CanvasWidth;
    var originalHeight = canvasinfo.CanvasHeight;
    var pixelsPerUnit = canvasinfo.PixelsPerUnit;

    this.originalWidth = originalWidth;
    this.originalHeight = originalHeight;
    this._pixelsPerUnit = pixelsPerUnit;

    var layout = GetLayoutSetting(this._modelSetting, {
        width: LOGICAL_WIDTH,
        height: LOGICAL_HEIGHT
    });

    var localTransform = this._modelMatrix;
    localTransform.scale(layout.width / LOGICAL_WIDTH, layout.height / LOGICAL_HEIGHT);

    var width = originalWidth * localTransform._tr[0];
    var height = originalHeight * localTransform._tr[5];

    var offsetX;
    if (layout.x !== undefined) {
        offsetX = layout.x - (layout.width / 2);
    } else if (layout.centerX !== undefined) {
        offsetX = layout.centerX;
    } else if (layout.left !== undefined) {
        offsetX = layout.left - (layout.width / 2);
    } else if (layout.right !== undefined) {
        offsetX = layout.right + (layout.width / 2);
    } else {
        offsetX = 0;
    }

    var offsetY;
    if (layout.y !== undefined) {
        offsetY = layout.y - (layout.height / 2);
    } else if (layout.centerY !== undefined) {
        offsetY = layout.centerY;
    } else if (layout.top !== undefined) {
        offsetY = layout.top - (layout.height / 2);
    } else if (layout.bottom !== undefined) {
        offsetY = layout.bottom + (layout.height / 2);
    } else {
        offsetY = 0;
    }

    localTransform.translate(width * offsetX, -height * offsetY);

    var pixelTransformMatrix = this.pixelTransformMatrix;
    pixelTransformMatrix.scale(pixelsPerUnit, pixelsPerUnit);
    pixelTransformMatrix.translate(originalWidth / 2, originalHeight / 2);

}

export default SetupModelMatrix;