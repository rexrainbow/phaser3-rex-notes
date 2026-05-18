/* 
Sample JigsawPiece, draw to FrameManager
*/
import { GameObjects as PhaserGameObjects } from 'phaser';
import JigsawPieceBase from './JigsawPieceBase';
import DefaultDrawShapeCallback from './DefaultDrawShapeCallback';
import ConvertEdgeMode from './ConvertEdgeMode';
import { SetMask } from '../../../../utils/mask/MaskMethods';

const RenderTexture = PhaserGameObjects.RenderTexture;

class JigsawPieceRenderTexurue extends JigsawPieceBase(RenderTexture) {
    clear: any;
    drawShapeCallback: any;
    edgeHeight: any;
    edgeWidth: any;
    height: any;
    ignoreDestroy: any;
    init: any;
    maskGraphics: any;
    render: any;
    scene: any;
    sourceKey: any;
    stamp: any;
    width: any;

    constructor(scene?: any, config?: any) {
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

    destroy(fromScene?: any) {
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