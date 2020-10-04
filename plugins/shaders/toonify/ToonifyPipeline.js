import FragSrc from './toonify-frag.js';
import FragCodeReplacer from '../utils/FragCodeReplacer';

const MultiPipeline = Phaser.Renderer.WebGL.Pipelines.MultiPipeline;
const GetValue = Phaser.Utils.Objects.GetValue;
const IntegerToRGB = Phaser.Display.Color.IntegerToRGB;
const Color = Phaser.Display.Color;

class ToonifyPipeline extends MultiPipeline {
    constructor(scene, key, config) {
        var game = scene.game;
        var frag = FragCodeReplacer(FragSrc, game.renderer.maxTextures);
        super({
            game: game,
            fragShader: frag, // GLSL shader
            name: 'Toonify',
            uniforms: ['edgeThreshold', 'hStep', 'sStep', 'vStep', 'edgeColor', 'texSize']
        });
        this._width = 0; // width wo resolution
        this._height = 0; // height wo resolution
        this._edgeGain = 0;
        this._edgeThreshold = 0;
        this._hueLevels = 0;
        this._satLevels = 0;
        this._valLevels = 0;
        this._edgeColor = new Color();

        game.renderer.pipelines.add(key, this);
        this.resetFromJSON(config);
    }

    resetFromJSON(o) {
        this.setEdgeThreshold(GetValue(o, 'edgeThreshold', 0.2));
        this.setHueLevels(GetValue(o, 'hueLevels', 0));
        this.setSatLevels(GetValue(o, 'satLevels', 0));
        this.setValLevels(GetValue(o, 'valLevels', 0));
        this.setEdgeColor(GetValue(o, 'edgeColor', 0));
        return this;
    }

    // edgeThreshold
    get edgeThreshold() {
        return this._edgeThreshold;
    }

    set edgeThreshold(value) {
        this._edgeThreshold = value;
        this.renderer.pipelines.set(this);
        this.set1f('edgeThreshold', value);
    }

    setEdgeThreshold(value) {
        this.edgeThreshold = value;
        return this;
    }

    // hueLevels
    get hueLevels() {
        return this._hueLevels;
    }

    set hueLevels(value) {
        this._hueLevels = value;
        value = (value > 0) ? 360 / value : 0;
        this.renderer.pipelines.set(this);
        this.set1f('hStep', value);
    }

    setHueLevels(value) {
        this.hueLevels = value;
        return this;
    }

    // satLevels
    get satLevels() {
        return this._satLevels;
    }

    set satLevels(value) {
        this._satLevels = value;
        value = (value > 0) ? 1 / value : 0;
        this.renderer.pipelines.set(this);
        this.set1f('sStep', value);
    }

    setSatLevels(value) {
        this.satLevels = value;
        return this;
    }

    // valLevels
    get valLevels() {
        return this._valLevels;
    }

    set valLevels(value) {
        this._valLevels = value;
        value = (value > 0) ? 1 / value : 0;
        this.renderer.pipelines.set(this);
        this.set1f('vStep', value);
    }

    setValLevels(value) {
        this.valLevels = value;
        return this;
    }

    // edgeColor
    get edgeColor() {
        return this._edgeColor;
    }

    set edgeColor(value) {
        if (typeof (value) === 'number') {
            value = IntegerToRGB(value);
        }
        // value: {r, g, b}
        var color = this._edgeColor;
        color.setFromRGB(value);
        this.renderer.pipelines.set(this);
        this.set3f('edgeColor', color.redGL, color.greenGL, color.blueGL);
    }

    setEdgeColor(value) {
        this.edgeColor = value;
        return this;
    }

    // size
    resize(width, height, resolution) {
        this._width = width;
        this._height = height;
        super.resize(width, height, resolution);
        this.renderer.pipelines.set(this);
        this.set2f('texSize', width, height);
        return this;
    }
}

export default ToonifyPipeline;