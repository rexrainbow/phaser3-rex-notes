import AddImage from '../../blitterbase/utils/AddImage.js';

var DrawTileSprite = function (key, frame, x, y, width, height) {
    var frameObj = this.texture.get(frame);
    var frameWidth = frameObj.width,
        frameHeight = frameObj.height;
    var cropLastWidth = width % frameWidth,
        cropLastHeight = height % frameHeight;
    var cropLastCol = (cropLastWidth !== 0),
        cropLastRow = (cropLastHeight !== 0);
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

            var cropWidth = (cropLastCol && (colIndex === lastColCount)) ? cropLastWidth : frameWidth;
            var cropHeight = (cropLastRow && (rowIndex === lastRowCount)) ? cropLastHeight : frameHeight;
            if ((cropWidth !== frameWidth) || (cropHeight !== frameHeight)) {
                bob.setCrop(0, 0, cropWidth, cropHeight);
            }
        }
    }

}

export default DrawTileSprite;