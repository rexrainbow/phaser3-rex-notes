import FrameManager from '../../../plugins/texture/framemanager/FrameManager.js';
import RandomPieceEdges from './RandomPieceEdges.js';
import JigsawPiece from './jigsawpiece/JigsawPiece.js';


var DefaultGetFrameNameCallback = function (c, r) {
    return `${c},${r}`;
}

var GenerateFrames = function (scene, {
    sourceKey,
    destinationKey,
    columns, rows,
    framePadding = 1,
    edgeWidth, edgeHeight,
    edges,
    drawShapeCallback,
    getFrameNameCallback = DefaultGetFrameNameCallback
}) {

    var textureManager = scene.sys.textures;
    var sourceFrame = textureManager.getFrame(sourceKey, '__BASE');
    var sourceFrameWidth = sourceFrame.cutWidth,
        sourceFrameHeight = sourceFrame.height;

    if (edgeWidth === undefined) {
        edgeWidth = Math.floor((sourceFrameWidth / columns) / 7);
    }
    if (edgeHeight === undefined) {
        edgeHeight = Math.floor((sourceFrameHeight / rows) / 7);
    }

    if (edges === undefined) {
        edges = RandomPieceEdges(columns, rows);
    }

    var frameWidth = ((sourceFrameWidth - (edgeWidth * (columns - 1))) / columns) + (2 * edgeWidth);
    var frameHeight = ((sourceFrameHeight - (edgeHeight * (rows - 1))) / rows) + (2 * edgeHeight);

    var frameManager = new FrameManager(scene, {
        key: destinationKey,
        cellWidth: frameWidth,
        cellHeight: frameHeight,
        cellPadding: framePadding,
        columns: columns,
        rows: rows,
        useDynamicTexture: true,
        fillColor: 0x888888,
    })

    var sample = new JigsawPiece(scene, {
        width: frameWidth, height: frameHeight,
        indentX: edgeWidth, indentY: edgeHeight,
        key: sourceKey,
        drawShapeCallback
    });

    var startX = -edgeWidth,
        startY = -edgeHeight;
    var scrollX = startX,
        scrollY = startY;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            sample.drawPiece({
                scrollX, scrollY,
                edgeMode: edges[c][r]
            });

            frameManager.paste(getFrameNameCallback(c, r), sample);

            scrollX += frameWidth - edgeWidth;
        }

        scrollX = startX;
        scrollY += frameHeight - edgeHeight;
    }

    sample.destroy();
    frameManager.destroy();

    return {
        sourceKey,
        destinationKey,
        columns, rows,

        sourceFrameWidth, sourceFrameHeight,
        frameWidth, frameHeight,
        edgeWidth, edgeHeight,
        getFrameNameCallback,
    }
}

export default GenerateFrames;