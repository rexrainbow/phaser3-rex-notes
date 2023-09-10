import fragShader from './localmask-fragshader.js';

var ControllerKey = 'localMask';

class LocalMaskPreFxPipeline extends Phaser.Renderer.WebGL.Pipelines.PreFXPipeline {
    constructor(game) {
        super({
            game: game,
            fragShader: fragShader
        });
    }

    onDraw(renderTarget) {
        var sprite = this.tempSprite;
        var glTexture = sprite[ControllerKey].maskGLTexture;

        this.set1i('uMainSampler', 0);
        this.set1i('uMaskSampler', 1);
        this.bindTexture(glTexture, 1);

        super.onDraw(renderTarget);
    }

    static setControllerKey(key) {
        ControllerKey = key;
    }
}

export default LocalMaskPreFxPipeline;