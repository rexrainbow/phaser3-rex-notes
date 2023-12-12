/* 
Sample JigsawPiece, draw to FrameManager
*/

import JigsawPieceBase from './JigsawPieceBase.js';
import Canvas from '../../../../gameobjects/canvas/canvasbase/Canvas.js';
import DefaultDrawShapeCallback from './DefaultDrawShapeCallback.js';
import ConvertEdgeMode from './ConvertEdgeMode.js';
import NOOP from '../../../../utils/object/NOOP.js';

class JigsawPieceCanvas extends JigsawPieceBase(Canvas) {
    constructor(scene, config) {
        if (!config.drawShapeCallback) {
            config.drawShapeCallback = DefaultDrawShapeCallback;
        }

        super(scene, 0, 0, config.width, config.height);

        this.init(config);

        // context does not have clear, fillPath method
        var context = this.context;
        context.clear = NOOP;
        context.fillPath = NOOP;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        var context = this.context;
        delete context.clear;
        delete context.fillPath;

        super.destroy(fromScene);
    }

    drawPiece({
        scrollX, scrollY,
        edgeMode,
    }) {
        edgeMode = ConvertEdgeMode(edgeMode);

        var canvasWidth = this.width,
            canvasHeight = this.height;

        this.clear();

        this.context.save();

        this.drawShapeCallback(
            this.context,
            canvasWidth, canvasHeight,
            this.edgeWidth, this.edgeHeight,
            edgeMode
        );

        this.context.clip();

        this.drawFrame(
            this.sourceKey, undefined,
            0, 0, canvasWidth, canvasHeight,
            scrollX, scrollY, canvasWidth, canvasHeight
        );

        this.context.restore();

        return this;
    }
}

export default JigsawPieceCanvas;