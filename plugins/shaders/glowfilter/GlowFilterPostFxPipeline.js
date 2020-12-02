import FragSrc from './glowfilter-postfxfrag';

const PostFXPipeline = Phaser.Renderer.WebGL.Pipelines.PostFXPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;
const Uniforms = [
    'uMainSampler',
    'intensity'
];

class GlowFilterPostFxPipeline extends PostFXPipeline {
    constructor(game) {
        super({
            game: game,
            renderTarget: true,
            fragShader: FragSrc,
            uniforms: Uniforms
        });

        this._intensity = 0;
    }

    resetFromJSON(o) {
        this.setIntensity(GetValue(o, 'intensity', 0));
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

export default GlowFilterPostFxPipeline;