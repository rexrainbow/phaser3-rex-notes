import GetLayout from './GetLayout.js';

const LOGICAL_WIDTH = 2;
const LOGICAL_HEIGHT = 2;

var SetupModelMatrix = function () {    
    var canvasinfo = this._model._model.canvasinfo;
    var originalWidth = canvasinfo.CanvasWidth;
    var originalHeight = canvasinfo.CanvasHeight;

    var layout = GetLayout(this._modelSetting, {
        width: LOGICAL_WIDTH,
        height: LOGICAL_HEIGHT
    });

    var localTransform = this._modelMatrix;
    localTransform.scale(layout.width / LOGICAL_WIDTH, layout.height / LOGICAL_HEIGHT);

    var width = originalWidth * localTransform._tr[0];
    var height = originalHeight * localTransform._tr[5];

    // this calculation differs from Live2D SDK...
    const offsetX = (layout.x !== undefined && layout.x - layout.width / 2)
        || (layout.centerX !== undefined && layout.centerX)
        || (layout.left !== undefined && layout.left - layout.width / 2)
        || (layout.right !== undefined && layout.right + layout.width / 2)
        || 0;

    const offsetY = (layout.y !== undefined && layout.y - layout.height / 2)
        || (layout.centerY !== undefined && layout.centerY)
        || (layout.top !== undefined && layout.top - layout.height / 2)
        || (layout.bottom !== undefined && layout.bottom + layout.height / 2)
        || 0;

    localTransform.translate(width * offsetX, -height * offsetY);

    var pixelsPerUnit = canvasinfo.PixelsPerUnit;
    var pixelTransformMatrix = this.pixelTransformMatrix;
    pixelTransformMatrix.scale(pixelsPerUnit, pixelsPerUnit);
    pixelTransformMatrix.translate(originalWidth / 2, originalHeight / 2);

    this._modelWidth = originalWidth;
    this._modelHeight = originalHeight;
    this._pixelsPerUnit = pixelsPerUnit;
}

export default SetupModelMatrix;