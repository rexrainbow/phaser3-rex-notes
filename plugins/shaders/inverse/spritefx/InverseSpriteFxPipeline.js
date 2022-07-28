import FragSrc from '../inverse-postfxfrag.js';

const SpriteFXPipeline = Phaser.Renderer.WebGL.Pipelines.SpriteFXPipeline;

class InverseSpriteFxPipeline extends SpriteFXPipeline {
    constructor(game) {
        super({
            name: 'rexInverseSpriteFx',
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

export default InverseSpriteFxPipeline;