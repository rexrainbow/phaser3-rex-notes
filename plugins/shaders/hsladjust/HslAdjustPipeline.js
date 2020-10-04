import FragSrc from './hslAdjust-frag.js';
import FragCodeReplacer from '../utils/FragCodeReplacer';

const MultiPipeline = Phaser.Renderer.WebGL.Pipelines.MultiPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const Clamp = Phaser.Math.Clamp;

class HslAdjustPipeline extends MultiPipeline {
    constructor(scene, key, config) {
        var game = scene.game;
        var frag = FragCodeReplacer(FragSrc, game.renderer.maxTextures);
        super({
            game: game,
            fragShader: frag, // GLSL shader
            name: 'HslAdjust',
            uniforms: ['hueRotate', 'satAdjust', 'lumAdjust']
        });
        this._hueRotate = 0;
        this._satAdjust = 0;
        this._lumAdjust = 0;

        game.renderer.pipelines.add(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setHueRotate(GetValue(o, 'hueRotate', 0));
        this.setSatAdjust(GetValue(o, 'satAdjust', 1));
        this.setLumAdjust(GetValue(o, 'lumAdjust', 0.5));
        return this;
    }

    // hueRotate
    get hueRotate() {
        return this._hueRotate;
    }

    set hueRotate(value) {
        this._hueRotate = value; // 0: rotate 0 degrees, 0.5: rotate 180 degrees, 1: rotate 360 degrees
        this.game.renderer.pipelines.set(this);
        this.set1f('hueRotate', value % 1);
    }

    setHueRotate(value) {
        this.hueRotate = value;
        return this;
    }

    // satAdjust
    get satAdjust() {
        return this._satAdjust;
    }

    set satAdjust(value) {
        this._satAdjust = value; // 0: gray, 1: original color, > 1: 
        this.game.renderer.pipelines.set(this);
        this.set1f('satAdjust', value);
    }

    setSatAdjust(value) {
        this.satAdjust = value;
        return this;
    }

    // lumAdjust
    get lumAdjust() {
        return this._lumAdjust;
    }

    set lumAdjust(value) {
        this._lumAdjust = value; // 0: dark, 0.5: original color, 1: white
        this.game.renderer.pipelines.set(this);
        this.set1f('lumAdjust', value);
    }

    setLumAdjust(value) {
        this.lumAdjust = value;
        return this;
    }
}

export default HslAdjustPipeline;