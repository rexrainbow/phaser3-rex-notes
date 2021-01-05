import FragSrc from './grayscale-postfxfrag.js';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class GrayScalePostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            name: 'rexGrayScalePostFx',
            game: game,
            renderTarget: true,
            fragShader: FragSrc
        });

        this._intensity = 1;
    }

    resetFromJSON(o) {
        this.setIntensity(GetValue(o, 'intensity', 1));
        return this;
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