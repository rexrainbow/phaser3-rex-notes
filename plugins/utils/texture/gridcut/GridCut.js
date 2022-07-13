import GetFrameNameCallback from "./GetFrameNameCallback";
import IsFunction from "../../object/IsFunction";

var GridCut = function (scene, key, frame, columns, rows, getFrameNameCallback) {
    if (frame == null) {
        frame = '__BASE';
    }
    if (!IsFunction(getFrameNameCallback)) {
        getFrameNameCallback = GetFrameNameCallback(frame, getFrameNameCallback);
    }

    var texture = scene.sys.textures.get(key);
    var isRenderTexture = texture.source[0].isRenderTexture;
    var baseFrame = texture.frames[frame];
    var baseWidth = baseFrame.width,
        baseHeight = baseFrame.height;
    var cellX, cellY;
    var cellWidth = baseWidth / columns,
        cellHeight = baseHeight / rows;
    var offsetX = 0,
        offsetY = 0;
    var frameName;
    for (var y = 0; y < rows; y++) {
        offsetX = 0;
        for (var x = 0; x < columns; x++) {
            frameName = getFrameNameCallback(x, y);

            cellX = offsetX + baseFrame.cutX;

            if (!isRenderTexture) {
                cellY = offsetY + baseFrame.cutY;
            } else {
                cellY = (baseHeight - offsetY - cellHeight) + baseFrame.cutY;
            }

            texture.add(
                frameName, 0,
                cellX, cellY,
                cellWidth, cellHeight
            );

            offsetX += cellWidth;
        }
        offsetY += cellHeight;
    }

    return {
        getFrameNameCallback: getFrameNameCallback,
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        columns: columns,
        rows: rows
    }
}

export default GridCut;