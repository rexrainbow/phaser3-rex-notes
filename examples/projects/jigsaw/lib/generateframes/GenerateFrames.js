import FrameManager from '../../../../../plugins/texture/framemanager/FrameManager.js';
import RandomPieceEdges from './RandomPieceEdges.js';
import JigsawPiece from '../jigsawpiece/JigsawPiece.js';

var GenerateFrames = function (scene, {
    baseKey,
    targetKey,
    columns, rows,
    overlap,
    edges,
    drawMaskCallback
}) {
    var textureManager = scene.sys.textures;
    var baseFrame = textureManager.getFrame(baseKey, '__BASE');
    var baseFrameWidth = baseFrame.cutWidth,
        baseFrameHeight = baseFrame.height;

    if (overlap === undefined) {
        overlap = Math.min(baseFrameWidth / columns, baseFrameHeight / rows) / 7;
    }

    if (edges === undefined) {
        edges = RandomPieceEdges(columns, rows);
    }

    var frameWidth = (baseFrameWidth + (columns - 1) * overlap) / columns;
    var frameHeight = (baseFrameHeight + (rows - 1) * overlap) / rows;

    var frameManager = new FrameManager(scene, {
        key: targetKey,
        width: (frameWidth * columns),
        height: (frameHeight * rows),
        cellWidth: frameWidth,
        cellHeight: frameHeight,
        useDynamicTexture: true,
        fillColor: 0x888888,
    })

    var sample = new JigsawPiece(scene, {
        width: frameWidth, height: frameHeight,
        indent: overlap,
        key: baseKey
    });

    var startX = -overlap,
        startY = -overlap;
    var scrollX = startX,
        scrollY = startY;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            sample.drawPiece({
                scrollX,
                scrollY,
                edgeMode: edges[c][r],
                drawMaskCallback
            });

            frameManager.paste(`${c},${r}`, sample);

            scrollX += frameWidth - overlap;
        }

        scrollX = startX;
        scrollY += frameHeight - overlap;
    }

    sample.destroy();
    frameManager.destroy();
}

export default GenerateFrames;