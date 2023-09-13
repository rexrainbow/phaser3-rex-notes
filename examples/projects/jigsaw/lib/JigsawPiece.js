import DrawPieceMask from './DrawPieceMask.js';

class JigsawPiece extends Phaser.GameObjects.RenderTexture {
    constructor(scene, {
        width,
        height,
        indent,
    }) {
        super(scene, 0, 0, width, height);

        if (indent === undefined) {
            indent = Math.min(width, height) / 7;
        }
        this.indent = indent;

        var maskGraphics = scene.make.graphics({ add: false });
        this.setMask(maskGraphics.createGeometryMask());
        this.maskGraphics = maskGraphics;
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        this.maskGraphics.destroy();
        this.maskGraphics = undefined;

        super.destroy();
    }

    drawPiece({
        key,
        scrollX,
        scrollY,
        edgeModes
    }) {
        this.clear().fill(0x333333)

        this.camera.setScroll(scrollX, scrollY);

        this.stamp(key, undefined, 0, 0, {
            originX: 0, originY: 0,
        });

        this.camera.setScroll(0, 0);

        DrawPieceMask(this.maskGraphics, {
            width: this.width,
            height: this.height,
            indent: this.indent,
            edgeModes: edgeModes
        })

        return this;
    }
}

export default JigsawPiece;