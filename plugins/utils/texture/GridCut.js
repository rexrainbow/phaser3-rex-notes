const DefaultBaseFrameName = '__BASE';

var GridCut = function (scene, key, frame, columns, rows, getFrameNameCallback) {
    if (frame == null) {
        frame = DefaultBaseFrameName;
    }
    if (getFrameNameCallback === undefined) {
        getFrameNameCallback = DefaultGetFrameNameCallback;
    }
    var texture = scene.textures.get(key);
    var baseFrame = texture.frames[frame];
    var colWidth = baseFrame.width / columns,
        rowHeight = baseFrame.height / rows;
    var offsetX = 0,
        offsetY = 0;
    var frameName;
    for (var y = 0; y < rows; y++) {
        offsetX = 0;
        for (var x = 0; x < columns; x++) {
            frameName = getFrameNameCallback(x, y, frame);
            texture.add(
                frameName, 0,
                (offsetX + baseFrame.cutX), (offsetY + baseFrame.cutY),
                colWidth, rowHeight
            );
            offsetX += colWidth;
        }
        offsetY += rowHeight;
    }
}

var DefaultGetFrameNameCallback = function (colIndex, rowIndex, baseFrameName) {
    if (baseFrameName === DefaultBaseFrameName) {
        return `${colIndex},${rowIndex}`;
    } else {
        return `${baseFrameName}_${colIndex},${rowIndex}`;
    }
}

export default GridCut;