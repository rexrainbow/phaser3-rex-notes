import frag from './inverse-frag.js';

const TextureTintPipeline = Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class InversePipeline extends TextureTintPipeline {
    constructor(scene, key, config) {
        var game = scene.game;
        super({
            game: game,
            renderer: game.renderer,
            fragShader: frag // GLSL shader
        });
        this._intensity = 0;

        game.renderer.addPipeline(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setIntensity(GetValue(o, 'intensity', 0));
        return this;
    }

    // intensity
    get intensity() {
        return this._intensity;
    }

    set intensity(value) {
        value = Clamp(value, 0, 1);
        if (this._intensity === value) {
            return;
        }

        this._intensity = value;
        this.setFloat1('intensity', value);
    }

    setIntensity(value) {
        this.intensity = value;
        return this;
    }
}

export default InversePipeline;