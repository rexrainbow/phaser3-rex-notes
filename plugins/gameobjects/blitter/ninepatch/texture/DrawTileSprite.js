import AddImage from '../../blitterbase/utils/AddImage.js';

var DrawTileSprite = function (key, frame, x, y, width, height) {
    var frameObj = this.texture.get(frame);

    var frameWidth = frameObj.width,
        frameHeight = frameObj.height;

    var lastFrameWidth = width % frameWidth,
        lastFrameHeight = height % frameHeight;

    if (lastFrameWidth === 0) {
        lastFrameWidth = frameWidth;
    }
    if (lastFrameHeight === 0) {
        lastFrameHeight = frameHeight;
    }

    var colCount = Math.ceil(width / frameWidth),
        rowCount = Math.ceil(height / frameHeight);
    var lastColCount = colCount - 1,
        lastRowCount = rowCount - 1;

    for (var colIndex = 0; colIndex < colCount; colIndex++) {
        for (var rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            let bob = AddImage(this, {
                frame: frame,
                x: x + (colIndex * frameWidth),
                y: y + (rowIndex * frameHeight),
            })

            var cropWidth = (colIndex === lastColCount) ? lastFrameWidth : frameWidth;
            var cropHeight = (rowIndex === lastRowCount) ? lastFrameHeight : frameHeight;
            if ((cropWidth !== frameWidth) || (cropHeight !== frameHeight)) {
                bob.setCrop(0, 0, cropWidth, cropHeight);
            }
        }
    }

}

export default DrawTileSprite;