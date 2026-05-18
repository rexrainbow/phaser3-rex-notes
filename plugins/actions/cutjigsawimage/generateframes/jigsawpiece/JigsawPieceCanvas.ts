/* 
Sample JigsawPiece, draw to FrameManager
*/

import JigsawPieceBase from './JigsawPieceBase';
import Canvas from '../../../../gameobjects/canvas/canvasbase/Canvas';
import DefaultDrawShapeCallback from './DefaultDrawShapeCallback';
import ConvertEdgeMode from './ConvertEdgeMode';
import NOOP from '../../../../utils/object/NOOP';

class JigsawPieceCanvas extends JigsawPieceBase(Canvas) {
    clear: any;
    context: any;
    drawFrame: any;
    drawShapeCallback: any;
    edgeHeight: any;
    edgeWidth: any;
    height: any;
    ignoreDestroy: any;
    init: any;
    scene: any;
    sourceKey: any;
    width: any;

    constructor(scene?: any, config?: any) {
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

    destroy(fromScene?: any) {
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