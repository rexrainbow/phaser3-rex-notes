import FragSrc from './grayscale-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const Clamp = Phaser.Math.Clamp;

class GrayScalePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            game: game,
            renderTarget: true,
            fragShader: FragSrc,
            uniforms: [
                'uMainSampler',
                'intensity'
            ]
        });

        this._intensity = 1;
    }

    onPreRender() {
        this.set1f('intensity', this._intensity);
    }

    // intensity
    get intensity() {
        return this._intensity;
    }

    set intensity(value) {
        this._intensity = Clamp(value, 0, 1);
    }

    setIntensity(value) {
        this.intensity = value;
        return this;
    }
}

export default GrayScalePostFxPipeline;