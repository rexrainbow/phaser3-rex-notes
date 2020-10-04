import FragSrc from './grayscale-frag.js';
import FragCodeReplacer from '../utils/FragCodeReplacer';

const MultiPipeline = Phaser.Renderer.WebGL.Pipelines.MultiPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class GrayScalePipeline extends MultiPipeline {
    constructor(scene, key, config) {
        var game = scene.game;
        var frag = FragCodeReplacer(FragSrc, game.renderer.maxTextures);
        super({
            game: game,
            fragShader: frag, // GLSL shader
            name: 'GrayScale',
            uniforms: ['intensity']
        });
        this._intensity = 0;

        game.renderer.pipelines.add(key, this);
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
        this.renderer.pipelines.set(this);
        this.set1f('intensity', value);
    }

    setIntensity(value) {
        this.intensity = value;
        return this;
    }
}

export default GrayScalePipeline;