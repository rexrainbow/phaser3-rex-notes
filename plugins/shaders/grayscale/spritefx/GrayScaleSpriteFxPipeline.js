import FragSrc from '../grayscale-postfxfrag.js';

const SpriteFXPipeline = Phaser.Renderer.WebGL.Pipelines.SpriteFXPipeline;

class GrayScaleSpriteFxPipeline extends SpriteFXPipeline {
    constructor(game) {
        super({
            name: 'rexGrayScaleSpriteFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this.intensity = 1;
    }

    onDraw(target) {
        this.set1f('intensity', this.intensity);
        this.drawToGame(target);
    }
}

export default GrayScaleSpriteFxPipeline;