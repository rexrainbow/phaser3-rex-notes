import FrameManager from '../../../texture/framemanager/FrameManager.js';
import GenerateEdges from './GenerateEdges.js';
import DefaultDrawShapeCallback from './jigsawpiece/DefaultDrawShapeCallback.js';
import JigsawPieceRenderTexurue from './jigsawpiece/JigsawPieceRenderTexurue.js';
import DrawCanvasPieceCallback from './jigsawpiece/DrawCanvasPieceCallback.js';
import NOOP from '../../../utils/object/NOOP.js';

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
    drawShapeCallback = DefaultDrawShapeCallback,
    useDynamicTexture = true,
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

    if (Array.isArray(edges)) {
        // Do nothinh
    } else {
        edges = GenerateEdges(columns, rows, edges);
    }

    if (destinationKey === undefined) {
        destinationKey = `${sourceKey}_pieces`;
    }

    if (textureManager.exists(destinationKey)) {
        textureManager.remove(destinationKey);
    }

    var frameWidth = (sourceFrameWidth / columns) + (2 * edgeWidth);
    var frameHeight = (sourceFrameHeight / rows) + (2 * edgeHeight);

    frameWidth = Math.ceil(frameWidth);
    frameHeight = Math.ceil(frameHeight);

    var frameManager = new FrameManager(scene, {
        key: destinationKey,
        cellWidth: frameWidth,
        cellHeight: frameHeight,
        cellPadding: framePadding,
        columns: columns,
        rows: rows,
        useDynamicTexture: useDynamicTexture,
        fillColor: 0x888888,
    });

    var sample, sourceImage;

    if (useDynamicTexture) {
        // Use dynamic-texture
        sample = new JigsawPieceRenderTexurue(scene, {
            width: frameWidth, height: frameHeight,
            edgeWidth: edgeWidth, edgeHeight: edgeHeight,
            key: sourceKey,
            drawShapeCallback
        });
    } else {
        // Use canvas-texture
        sourceImage = sourceFrame.source.image;
        // Align interface of canvas-context with graphics
        frameManager.context.clear = NOOP;
        frameManager.context.fillPath = NOOP;
    }

    var startX = -edgeWidth,
        startY = -edgeHeight;
    var scrollX = startX,
        scrollY = startY;
    var frameName, edgeMode;
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            frameName = getFrameNameCallback(c, r);
            edgeMode = edges[c][r];

            if (useDynamicTexture) {
                // Use dynamic-texture
                sample.drawPiece({ scrollX, scrollY, edgeMode });
                frameManager.paste(frameName, sample);

            } else {
                // Use canvas-texture
                frameManager.draw(frameName, function (canvas, context, frameSize) {
                    DrawCanvasPieceCallback(
                        sourceImage,
                        context,

                        scrollX, scrollY,
                        frameWidth, frameHeight,
                        sourceFrameWidth, sourceFrameHeight,

                        edgeWidth, edgeHeight,
                        edgeMode,

                        drawShapeCallback
                    );
                });
            }

            scrollX += frameWidth - (edgeWidth * 2);
        }

        scrollX = startX;
        scrollY += frameHeight - (edgeHeight * 2);
    }

    frameManager.updateTexture();

    if (useDynamicTexture) {
        // Use dynamic-texture
        sample.destroy();
    } else {
        // Use canvas-texture
        sourceImage = null;
        delete frameManager.context.clear;
        delete frameManager.context.fillPath;
    }

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