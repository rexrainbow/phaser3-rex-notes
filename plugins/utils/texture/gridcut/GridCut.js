import GetFrameNameCallback from "./GetFrameNameCallback";
import IsFunction from "../../object/IsFunction";

var GridCut = function (scene, key, frame, columns, rows, getFrameNameCallback) {
    if (frame == null) {
        frame = '__BASE';
    }
    if (!IsFunction(getFrameNameCallback)) {
        getFrameNameCallback = GetFrameNameCallback(frame, getFrameNameCallback);
    }

    var texture = scene.textures.get(key);
    var baseFrame = texture.frames[frame];
    var cellWidth = baseFrame.width / columns,
        cellHeight = baseFrame.height / rows;
    var offsetX = 0,
        offsetY = 0;
    var frameName;
    for (var y = 0; y < rows; y++) {
        offsetX = 0;
        for (var x = 0; x < columns; x++) {
            frameName = getFrameNameCallback(x, y);
            texture.add(
                frameName, 0,
                (offsetX + baseFrame.cutX), (offsetY + baseFrame.cutY),
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