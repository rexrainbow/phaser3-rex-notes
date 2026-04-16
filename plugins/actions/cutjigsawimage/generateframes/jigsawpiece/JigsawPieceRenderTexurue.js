/* 
Sample JigsawPiece, draw to FrameManager
*/
import JigsawPieceBase from './JigsawPieceBase.js';
import DefaultDrawShapeCallback from './DefaultDrawShapeCallback.js';
import ConvertEdgeMode from './ConvertEdgeMode.js';
import { SetMask } from '../../../../utils/mask/MaskMethods.js';

const RenderTexture = Phaser.GameObjects.RenderTexture;

class JigsawPieceRenderTexurue extends JigsawPieceBase(RenderTexture) {
    constructor(scene, config) {
        if (!config.drawShapeCallback) {
            config.drawShapeCallback = DefaultDrawShapeCallback;
        }

        super(scene, 0, 0, config.width, config.height);

        this.init(config);

        var maskGraphics = scene.make.graphics({
            fillStyle: { color: 0xffffff, alpha: 1 },
            add: false
        });
        SetMask(this, maskGraphics, undefined, 'local');
        this.maskGraphics = maskGraphics;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        super.destroy(fromScene);

        this.maskGraphics.destroy();
        this.maskGraphics = undefined;
    }

    drawPiece({
        scrollX, scrollY,
        edgeMode,
    }) {
        // Convert string to plain object
        edgeMode = ConvertEdgeMode(edgeMode);

        this.clear();

        this.stamp(
            this.sourceKey, undefined,
            -scrollX, -scrollY,
            {
                originX: 0, originY: 0,
            }
        );

        this.maskGraphics.clear();

        this.drawShapeCallback(
            this.maskGraphics,
            this.width, this.height,
            this.edgeWidth, this.edgeHeight,
            edgeMode
        );

        this.render();

        return this;
    }
}

export default JigsawPieceRenderTexurue;