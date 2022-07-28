import FragSrc from '../hslAdjust-postfxfrag.js';

const SpriteFXPipeline = Phaser.Renderer.WebGL.Pipelines.SpriteFXPipeline;

class HslAdjustSpriteFxPipeline extends SpriteFXPipeline {
    constructor(game) {
        super({
            name: 'rexHslAdjustSpriteFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.hueRotate = 0;
        this.satAdjust = 1;
        this.lumAdjust = 0.5;
    }

    onDraw(target) {
        this.set1f('hueRotate', (this.hueRotate) % 1);
        this.set1f('satAdjust', this.satAdjust);
        this.set1f('lumAdjust', this.lumAdjust);
        this.drawToGame(target);
    }
}

export default HslAdjustSpriteFxPipeline;